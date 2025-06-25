const nodemailer = require("nodemailer");
const { file, path } = require("pdfkit");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = async (formData) => {
  const {
    name,
    email,
    subject,
    industry,
    service,
    timeline,
    source,
    message,
  } = formData;

  // Email to Admin
  const adminMailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.MAIL_TO,
    subject: `New Contact Submission: ${subject || "No Subject"}`,
    html: `
      <h3>New Contact Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Industry:</strong> ${industry}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Deadline:</strong> ${timeline}</p>
      <p><strong>Referral:</strong> ${source}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  // Email to Client
  const clientMailOptions = {
    from: `"InfoyieldX Team" <${process.env.MAIL_USER}>`,
    to: email,
    subject: `Thanks for contacting InfoyieldX`,
    html: `
      <h3>Hi ${name},</h3>
      <p>Thanks for reaching out! We've received your inquiry and will get back to you shortly.</p>
      <p><strong>Your message:</strong><br>${message}</p>
      <hr />
      <p>– InfoyieldX Team</p>
    `,
  };

  // Send both emails
  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
const sendCredentialsEmail = async ({ firstname, email, password }) => {
  const mailOptions = {
    from: `"InfoyieldX HR" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Your Employee Portal Login Details",
    html: `
      <h3>Welcome ${firstname},</h3>
      <p>You’ve been added to the InfoyieldX Employee Portal.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Please log in and change your password after first login.</p>
      <hr/>
      <p>– InfoyieldX HR Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Failed to send credentials:", err);
  }
};
const sendEmployeeMailReg = async ({ firstName, email, position, lastName, invoicePath }) => {
  const mailOptions = {
    from: `"InfoyieldX Team" <${process.env.MAIL_TO}>`,
    to: email,
    subject: "Application Received",
    html: `<p>Dear ${firstName},</p>
      <p>Thank you for applying for the <strong>${position}</strong> position. Our team will review your application and get back to you soon.</p>
      <p>Regards,<br>HR Team</p>`,
  };

  const sendtoHR = {
    from: `${firstName} <${email}>`,
    to: process.env.MAIL_TO,
    subject: `New Application: ${firstName} ${lastName}`,
    text: "Please find the application invoice attached.",
    attachments: [
      {
        filename: "Application-Invoice.pdf",
        path: invoicePath,
        contentType: "application/pdf"
      }
    ]
  };

  try {
    await transporter.sendMail(sendtoHR);
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Failed to send emails:", err);
  }
};


module.exports = {
  sendMail,
  sendCredentialsEmail,
  sendEmployeeMailReg,
};

