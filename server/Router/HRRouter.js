const express = require("express");
const router = express.Router();
const HRModel = require("../Models/HRModel");
const { hashedPassword, ComparePassword } = require("../Auth/PasswordHashed.js");
const jwt = require("jsonwebtoken");
const Blog = require("../Models/BlogModel.js")
const Portfolio = require("../Models/PorfolioModel.js")
const Employee = require("../Models/EmployeeModel.js")
const getMulterUploader = require("../Helpers/Image.js");
const authHR = require("../Auth/authHR.js");
const BlogModel = require("../Models/BlogModel.js");
const PortfolioModel = require("../Models/PorfolioModel.js");
const EmployeeModel = require("../Models/EmployeeModel.js");
const {sendCredentialsEmail} = require("../Helpers/Email.js");
const Job = require("../Models/Jobs.js")

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingHR = await HRModel.findOne({ email });
    if (existingHR) {
      return res.status(400).json({ error: "HR already registered" });
    }
    const hashedPwd = await hashedPassword(password);

    const newHR = new HRModel({ name, email, password: hashedPwd });
    await newHR.save();
  
    const token = jwt.sign({ id: newHR._id }, "mySecretKey123", { expiresIn: "1h" });
 

    res.status(201).json({ message: "Signup successful", token });
  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
   try {
    const hr = await HRModel.findOne({ email });
    if (!hr) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isMatch = await ComparePassword(password, hr.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: hr._id }, "mySecretKey123", {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token ,id:hr._id
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

const ProfileImage = getMulterUploader("profile")

router.post( "/add-employee", ProfileImage.single("image"),async (req, res) => {
    const {
      firstname,
      lastname,
      email,
      phone,
      position,
      department,
      type,
      password,
      dateOfBirth,
      address,
      salary,
      emergencyContact,
      startDate, // also known as joiningDate
    } = req.body;

    try {
      // Check for duplicate email
      const exists = await Employee.findOne({ email });
      if (exists) {
        return res
          .status(400)
          .json({ error: "Employee already exists with this email" });
      }

      // Generate unique employeeId
      const count = await Employee.countDocuments();
      const employeeId = `EMP${(count + 1).toString().padStart(3, "0")}`;

      // Handle avatar upload
      const avatar = req.file ? `/uploads/profile/${req.file.filename}` : "";

      // Create new employee
      const newEmp = new Employee({
employeeId,
       firstname,        
        lastname,
        email,
        phone, 
        position,
        department,
        type,
        password,
        dateOfBirth,
        address,
        salary,
        emergencyContact,
        joiningDate: startDate,
        avatar,
      });

      await newEmp.save();
      await sendCredentialsEmail({ firstname, email, password });

      res
        .status(201)
        .json({ message: "Employee added successfully", employeeId });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to add employee", details: err.message });
    }
  }
);


router.get("/get-employee",async(req,res)=>{
     try {
      const Employee =await EmployeeModel.find({})
      res.status(200).json({message:"Getting Data from Employee",Employee})

     } catch (error) {
       res.status(500).json({ error: "Failed to getting Data" });
     }
})
router.delete("/delete-employee/:id",  async (req, res) => {
  try {
    const employee = await EmployeeModel.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete employee", details: err.message });
  }
});

router.put("/update-employee/:id", ProfileImage.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      department: req.body.department,
      type: req.body.type,
      password: req.body.password,
      address: req.body.address,
      dateofbirth: req.body.dateofbirth,
      salary: req.body.salary,
      startdate: req.body.startdate,
      emergencycontact: req.body.emergencycontact,
    };

    if (req.file) {
      updatedData.image = req.file.filename; // or req.file.path based on your config
    }

    const updated = await Employee.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updated) return res.status(404).json({ error: "Employee not found" });

    res.json({ message: "Employee updated successfully", employee: updated });
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
});

const Blogupload  = getMulterUploader("blogs")
router.post("/add-blogs", Blogupload.single("image"), async (req, res) => {
  const { title, content, department } = req.body;
  const imageUrl = req.file?.filename;

  try {
    const blog = new Blog({
      title,
      content,
      image: imageUrl ? `/uploads/blogs/${imageUrl}` : "",
      department,
      author: req.user?.id || "admin"
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog", details: err.message });
  }
});

router.get("/get-blogs",async(req,res)=>{
     try {
      const blogs =await BlogModel.find({})
      res.status(200).json({message:"Getting Data from Blogs",blogs})

     } catch (error) {
       res.status(500).json({ error: "Failed to getting Data" });
     }
})

router.delete("/delete-blog/:id", async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog", details: err.message });
  }
});

router.put("/update-blog/:id", Blogupload.single("image"),async (req, res) => {
  const { title, content,department } = req.body;
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      { title, content ,department},
      { new: true }
    );
    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog updated", updatedBlog });
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog", details: err.message });
  }
});



const Portfolioupload = getMulterUploader("portfolio")
router.post("/add-portfolio", Portfolioupload.single("image"),async (req, res) => {
    const { title, description, projectUrl,technologies,status } = req.body;
    const imageUrl = req.file?.filename
  try {
    const portfolio = new Portfolio({
      title,
      description,
      projectUrl,
      imageUrl,
      status,
      technologies
    });
    await portfolio.save();
    res.status(201).json({ message: "Portfolio added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add portfolio", details: err.message });
  }
});


router.get("/get-portfolio",async(req,res)=>{
     try {
      const portfolio =await PortfolioModel.find({})
      res.status(200).json({message:"Getting Data from Portfolio",portfolio})

     } catch (error) {
       res.status(500).json({ error: "Failed to getting Data" });
     }
})

router.delete("/delete-portfolio/:id",  async (req, res) => {
  try {
    const portfolio = await PortfolioModel.findByIdAndDelete(req.params.id);
    if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });
    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete portfolio", details: err.message });
  }
});

router.put("/update-portfolio/:id", Portfolioupload.single("image"),async (req, res) => {
  const { title, description, projectUrl ,technologies,status} = req.body;
  try {
    const updatedPortfolio = await PortfolioModel.findByIdAndUpdate(
      req.params.id,
      { title, description, projectUrl ,technologies,status},
      { new: true }
    );
    if (!updatedPortfolio) return res.status(404).json({ error: "Portfolio not found" });
    res.json({ message: "Portfolio updated", updatedPortfolio });
  } catch (err) {
    res.status(500).json({ error: "Failed to update portfolio", details: err.message });
  }
})
router.get ("/check",authHR ,async (req,res)=>{
  res.status(200).send({ message: "Access granted", userId: req.user.id })
})

module.exports = router;
