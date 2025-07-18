const express =require("express")
const router = express.Router()
const authHR = require("../Auth/authHR");
const Job = require("../Models/Jobs");
const {sendEmployeeMailReg} = require("../Helpers/Email");
const path = require("path");
const { PDFDocument: PDFLibDocument } = require("pdf-lib");
const GenerateDoc = require("../Helpers/Document")
const fs = require("fs");
const multer = require("multer")
require("dotenv").config();



//Hr only add job details
router.post("/jobs-add",authHR, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all jobs
router.get("/jobs-get",authHR, async (req, res) => {
  const jobs = await Job.find().sort({ postedAt: -1 });
  res.json(jobs);
});



const uploadPath = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const base = file.originalname.replace(ext, "").replace(/\s+/g, "-").toLowerCase();
      cb(null, `${base}-${Date.now()}${ext}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed."), false);
    }
    cb(null, true);
  };
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.email || !data.firstName || !data.position) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate resume file
    if (!req.file || path.extname(req.file.originalname).toLowerCase() !== ".pdf") {
      return res.status(400).json({ error: "Only PDF resumes are accepted." });
    }

    // Ensure upload directory exists
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate base application PDF
    const timestamp = Date.now();
    const basePdfPath = path.join(uploadDir, `application_${data.firstName}_${timestamp}.pdf`);
    const mergedPdfPath = path.join(uploadDir, `merged_application_${data.firstName}_${timestamp}.pdf`);

    console.log("📄 Generating application PDF...");
    try {
      await GenerateDoc(data, basePdfPath);
      console.log("✅ Application PDF created.");
    } catch (err) {
      console.error("❌ PDF generation failed:", err);
      return res.status(500).json({ error: "PDF generation failed." });
    }

    // Merge resume into application PDF
    try {
      const appPdfBytes = fs.readFileSync(basePdfPath);
      const resumePdfBytes = fs.readFileSync(req.file.path);
      const appPdfDoc = await PDFLibDocument.load(appPdfBytes);
      const resumePdfDoc = await PDFLibDocument.load(resumePdfBytes);

      const resumePages = await appPdfDoc.copyPages(resumePdfDoc, resumePdfDoc.getPageIndices());
      resumePages.forEach((page) => appPdfDoc.addPage(page));

      const mergedPdfBytes = await appPdfDoc.save();
      fs.writeFileSync(mergedPdfPath, mergedPdfBytes);
      console.log(`✅ Merged PDF saved: ${mergedPdfPath}`);
    } catch (err) {
      console.error("❌ PDF merge failed:", err);
      return res.status(500).json({ error: "Merging resume failed." });
    }

    await sendEmployeeMailReg({data,mergedPdfPath})
   
    fs.unlinkSync(basePdfPath);
    fs.unlinkSync(req.file.path);
  
    res.status(200).json({ message: "Application submitted successfully." });
  } catch (err) {
    console.error("❌ Application error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});


module.exports =router;