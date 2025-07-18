const mongoose = require("mongoose")

const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  technologies: String,
  imageUrl: String,
  projectUrl: String,
  department: {
    type: String,
    enum: [
      "Web Development",
      "App Development",
      "Accounts",
      "Digital-Marketing",
      "Oracle Database"
    ],
    required: true
  },
  status: {
    type: String,
    enum: ["In Progress", "Completed"],
    default: "In Progress"
  },
  createdAt: { type: Date, default: Date.now }
});

const PortfolioModel = mongoose.model("portfolio",PortfolioSchema);

module.exports= PortfolioModel;