const express = require("express")
const router = express.Router();
const EmployeeModel = require("../Models/EmployeeModel");
const jwt =  require("jsonwebtoken");
const authHR = require("../Auth/authHR");


router.post("/login",async (req,res)=>{
  const {email,password} = req.body

  try {
    const user = await EmployeeModel.findOne({email})
     if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
     if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
     const token = jwt.sign({id:user._id }, "mySecretKey123", {
      expiresIn: '1h',
    });
      res.status(200).json({ message: "Login successful", token ,id:user._id});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
})

router.get("/get", authHR, async (req, res) => {
  try {
    const { id } = req.user; // Assuming authHR adds `id` to req.user
    const userDetails = await EmployeeModel.findById(id); // ✅ Use findById for _id
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to get user details", error: error.message });
  }
});



module.exports = router;