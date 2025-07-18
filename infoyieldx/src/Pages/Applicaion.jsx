import React, { useState } from "react";
import axios from "axios";
 
const Application = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    position: "",
    degree: "",
    university: "",
    graduationYear: "",
    coverLetter: "",
    skills: [],
    currentSalary: "",
    expectedSalary: "",
    availability: "",
    experience: "",
    resume: null,
  });
 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
 
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "skills") {
        data.append(key, JSON.stringify(value));
      } else if (key === "resume" && value) {
        data.append(key, value);
      } else {
        data.append(key, value);
      }
    });
 
    try {
     const response = await axios.post("http://localhost:5000/api/carrer-portal/apply", data, {
  headers: { "Content-Type": "multipart/form-data" },
}
 
      );
      setSuccess(response.data.message || "Application submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        position: "",
        degree: "",
        university: "",
        graduationYear: "",
        coverLetter: "",
        skills: [],
        currentSalary: "",
        expectedSalary: "",
        availability: "",
        experience: "",
        resume: null,
      });
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.response?.data?.error || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Application</h1>
        <p className="text-lg text-gray-600">Join our team and make a difference</p>
      </div>
 
      {/* Personal Information */}
      <div>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">First Name *</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateFormData("firstName", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Last Name *</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormData("lastName", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => updateFormData("dob", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => updateFormData("gender", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
 
      {/* Education Section */}
      <div>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Highest Degree</label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => updateFormData("degree", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              placeholder="e.g., B.Tech, M.Sc"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">University</label>
            <input
              type="text"
              value={formData.university}
              onChange={(e) => updateFormData("university", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              placeholder="e.g., Anna University"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Graduation Year</label>
            <input
              type="number"
              value={formData.graduationYear}
              onChange={(e) => updateFormData("graduationYear", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              placeholder="e.g., 2023"
            />
          </div>
        </div>
      </div>
 
      {/* Professional Information */}
      <div>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Professional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Position Applied For *</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => updateFormData("position", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              placeholder="e.g., Software Engineer"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Years of Experience *</label>
            <select
              value={formData.experience}
              onChange={(e) => updateFormData("experience", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select Experience</option>
              <option value="0-1">0–1 years</option>
              <option value="2-3">2–3 years</option>
              <option value="4-5">4–5 years</option>
              <option value="6-10">6–10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Current Salary</label>
            <input
              type="text"
              value={formData.currentSalary}
              onChange={(e) => updateFormData("currentSalary", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              placeholder="e.g., ₹500,000"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Expected Salary *</label>
            <input
              type="text"
              value={formData.expectedSalary}
              onChange={(e) => updateFormData("expectedSalary", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              placeholder="e.g., ₹600,000"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Availability *</label>
            <select
              value={formData.availability}
              onChange={(e) => updateFormData("availability", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select Availability</option>
              <option value="immediately">Immediately</option>
              <option value="2-weeks">2 weeks</option>
              <option value="1-month">1 month</option>
              <option value="2-months">2 months</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
 
      {/* Application Details */}
      <div>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Application Details</h2>
        <div>
          <h3 className="text-gray-800 mb-4">Skills</h3>
          <input
            type="text"
            placeholder="Enter a skill and press Enter"
            className="w-full border border-gray-300 rounded p-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                e.preventDefault();
                if (!formData.skills.includes(e.target.value.trim())) {
                  updateFormData("skills", [...formData.skills, e.target.value.trim()]);
                }
                e.target.value = "";
              }
            }}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.skills.map((skill, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {skill}
                <button
                  type="button"
                  className="ml-2 text-red-500 font-bold"
                  onClick={() =>
                    updateFormData("skills", formData.skills.filter((s) => s !== skill))
                  }
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <h3 className="text-gray-800 mb-4 mt-4">Cover Letter</h3>
          <textarea
            value={formData.coverLetter}
            onChange={(e) => updateFormData("coverLetter", e.target.value)}
            rows="6"
            className="w-full border border-gray-300 rounded p-3"
            placeholder="Write a brief cover letter about your interest and qualifications..."
          />
        </div>
      </div>
 
      {/* Resume Upload */}
      <div>
        <h3 className="text-gray-800 mb-4">Resume</h3>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => updateFormData("resume", e.target.files[0])}
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
        {formData.resume && (
          <p className="text-sm text-green-600 mt-2">Uploaded: {formData.resume.name}</p>
        )}
      </div>
 
      {/* Submit */}
      <div className="mt-10 text-center">
        {loading && <p className="text-blue-600 mb-4">Submitting...</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
};
 
export default Application;