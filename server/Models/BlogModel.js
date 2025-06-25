const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String }, // <-- Add this for main blog image
  author: { type: String, default: 'Admin' },
  department:{type:String,
    enum:["Web","Mobile","Accounts","oracle-dbs","oracle-ebs"]
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports= BlogModel;