const mongoose = require("mongoose")

const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  technologies:String,
  status:{
    type:String,
    enum:["In Progress","Completed"]
  },
  imageUrl: String,
  liveUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const PortfolioModel = mongoose.model("portfolio",PortfolioSchema);

module.exports= PortfolioModel;