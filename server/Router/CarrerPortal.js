const express =require("express")
const router = express.Router()
const authHR = require("../Auth/authHR");
const Job = require("../Models/Jobs");
const sendEmployeeMailReg = require("../Helpers/Email");
const path = require("path")
const GenerateDoc = require("../Helpers/Document")
const fs = require("fs");

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


// Employee apply the Detail 

router.post("/employee-apply", async (req, res) => {
  try {
    const data = req.body;

    // Basic validation
    if (!data.email || !data.firstName || !data.position) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure uploads folder exists
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const invoicePath = path.join(uploadDir, `invoice-${Date.now()}.pdf`);

    // Generate PDF and send email
   try {
  console.log("Starting PDF generation...");
  await GenerateDoc(data, invoicePath);
  console.log("✅ PDF created.");
} catch (pdfErr) {
  console.error("❌ PDF generation failed:", pdfErr);
  return res.status(500).json({ error: "PDF generation failed" });
}

    await sendEmployeeMailReg(data, invoicePath);

    // Optionally delete PDF after sending
    // fs.unlinkSync(invoicePath);

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports =router;