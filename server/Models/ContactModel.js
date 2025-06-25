const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  industry: { type: String },           // From "Industry Name" input
  subject: { type: String },
  service: {
    type: String,
    enum: [
      'web',
      'mobile',
      'accounting',
      'oracle-ebs',
      'oracle-db'
    ]
  },
  timeline: {
    type: String,
    enum: ['1-2 weeks', '1 month', '2 months', '3+ months']
  },
   source: {
    type: String,
    enum: ['google', 'linkedin', 'referral', 'event', 'other']
  },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;
