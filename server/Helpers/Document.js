const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const GenerateDoc = (data, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("🛠️ Starting PDF generation...");

      if (!outputPath) throw new Error("Missing output path");
      if (!data) throw new Error("No data passed to GenerateDoc");

      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(outputPath);

      stream.on("finish", () => {
        console.log("✅ PDF write complete:", outputPath);
        resolve(outputPath);
      });

      stream.on("error", (err) => {
        console.error("❌ Stream error while writing PDF:", err);
        reject(err);
      });

      doc.pipe(stream);

     doc.fontSize(18).text(`Job Application: ${data.position}`, { underline: true });
      doc.moveDown();
      doc.fontSize(12).text(`Name: ${data.firstName} ${data.lastName || ""}`);
      doc.text(`Email: ${data.email}`);
      doc.text(`Phone: ${data.phone || "N/A"}`);
      doc.text(`DOB: ${data.dob || "N/A"}`);
      doc.text(`Gender: ${data.gender || "N/A"}`);
      doc.text(`Degree: ${data.degree || "N/A"}`);
      doc.text(`University: ${data.university || "N/A"}`);
      doc.text(`Graduation Year: ${data.graduationYear || "N/A"}`);
      doc.text(`Current Salary: ${data.currentSalary || "N/A"}`);
      doc.text(`Expected Salary: ${data.expectedSalary || "N/A"}`);
      doc.text(`Availability: ${data.availability || "N/A"}`);
      doc.text(`Experience: ${data.experience || "N/A"}`);
      doc.text(
        `Skills: ${Array.isArray(data.skills) ? data.skills.join(", ") : data.skills || "N/A"}`
      );
      doc.moveDown();
      doc.text(`Cover Letter:`);
      doc.moveDown();
      doc.fontSize(10).text(data.coverLetter || "N/A", { align: "justify" });
 
      doc.end();
      stream.on("finish", resolve);
    } catch (err) {
      console.error("❌ Outer error in GenerateDoc:", err);
      reject(err);
    }
  });
};


module.exports = GenerateDoc;
