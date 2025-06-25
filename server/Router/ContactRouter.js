const ContactModel = require("../Models/ContactModel")
const express = require("express");
const router =express.Router();
const {sendMail} = require("../Helpers/Email")
//post method

router.post("/post", async (req, res) => {
  try {
    const contact = new ContactModel(req.body);
    const contactdata = await contact.save();
    await sendMail(contactdata);
    res.status(200).send({ message: "Contact form submitted and emails sent!", contactdata });
  } catch (error) {
    console.error("❌ Error in contact POST:", error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});


router.get("/get",async(req,res)=>{
    try {
         const contact = await ContactModel.find({})
         res.status(200).send({ message: "Contact Details",contact})
    } catch (error) {
         res.status(500).json({ error: "Failed to getting Data" });
    }
})

module.exports =router;