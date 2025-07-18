import React, { useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { BsPhone } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    subject: '',
    service: '',
    timeline: '',
    source: '',
    message: ''
  });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/contact/post", formData);
      toast.success("📩 Thank you! We'll respond soon.");
      setFormData({
        name: '',
        email: '',
        industry: '',
        subject: '',
        service: '',
        timeline: '',
        source: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to send message.");
    }
  };

  return (
    <div className="py-16 bg-[#F4ecfe]/20">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto flex flex-col space-y-8 pb-10">
          <h1 className="text-center bg-clip-text text-transparent text-2xl md:text-5xl font-bold bg-gradient-to-br from-pink-900 to-blue-800">
            Get in Touch
          </h1>
          <p className="text-center text-md md:text-2xl px-2 text-blue-900">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-10 px-2">
          {/* Form Section */}
          <div className="flex flex-col space-y-6 w-full rounded-lg py-10 px-8 shadow-xl border hover:shadow-2xl transition duration-500">
            <div className="flex flex-col md:gap-4 gap-2">
              <h1 className="md:text-3xl text-xl font-semibold text-blue-900">
                Have any questions or <span className="text-red-700">ideas in mind?</span>
              </h1>
              <p className="text-gray-600 md:text-sm text-xs">
                We’re excited to connect! Share your queries, ideas, or project needs. Let’s transform your business with AI-driven solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border p-2 rounded-md shadow-md hover:scale-105 transition"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border p-2 rounded-md shadow-md hover:scale-105 transition"
              />
              <input
                type="text"
                placeholder="Industry Name"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="border p-2 rounded-md shadow-md hover:scale-105 transition md:col-span-2"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="border p-2 rounded-md shadow-md hover:scale-105 transition"
            />

            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="border p-2 rounded-md shadow-md hover:scale-105 transition"
            >
              <option value="">Select a Service</option>
              <option value="web">Web App Development</option>
              <option value="mobile">Mobile App Development</option>
              <option value="accounting">Accounting</option>
              <option value="digital-marketing">Digital Marketinf</option>
              <option value="oracle-db">Oracle DB Management</option>
            </select>

            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="border p-2 rounded-md shadow-md hover:scale-105 transition"
            >
              <option value="">Select Project Timeline</option>
              <option value="1-2 weeks">1–2 weeks</option>
              <option value="1 month">1 month</option>
              <option value="2 months">2 months</option>
              <option value="3+ months">3+ months</option>
            </select>

            <select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="border p-2 rounded-md shadow-md hover:scale-105 transition"
            >
              <option value="">How did you hear about us?</option>
              <option value="google">Google Search</option>
              <option value="linkedin">LinkedIn</option>
              <option value="referral">Referral</option>
              <option value="event">Event or Meetup</option>
              <option value="other">Other</option>
            </select>

            <textarea
              placeholder="Message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border p-2 rounded-md shadow-md hover:scale-105 transition"
            ></textarea>

            <button
              className="border p-2 bg-blue-900 rounded-md text-white hover:bg-blue-800 transition"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>

          {/* Info Section */}
          <div className="py-10 px-8 flex flex-col gap-8">
            <h1 className="md:text-3xl text-xl font-semibold">
              Ready to embrace innovation?
            </h1>
            <p className="text-sm md:text-lg font-medium text-blue-950">
              Connect with us now and start your journey toward smarter solutions.
            </p>
            <div className="flex gap-2">
              <IoLocation className="text-blue-600 font-bold md:text-xl text-md" />
              <div>
                <p className="text-md">India</p>
                <p className="text-sm font-medium text-gray-700 leading-tight">
                  Infoyieldx
                  <br />
                  MGK Complex, No:267,
                  <br />
                  VIP Garden, Solar,
                  <br />
                  Erode, Tamil Nadu - 638002
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 border w-full max-w-xs p-3 rounded-xl shadow-xl hover:scale-105 transition">
              <MdEmail className="w-6 h-6" />
              <div className="text-sm font-medium text-blue-950">
                <h1>Email</h1>
                <p>hr@Infoyieldx.in</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border w-full max-w-xs p-3 rounded-xl shadow-xl hover:scale-105 transition">
              <BsPhone className="w-6 h-6" />
              <div className="text-sm font-medium text-blue-950">
                <h1>Mobile No</h1>
                <p>7904495635</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
