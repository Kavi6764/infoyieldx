import React, { useContext, useState } from "react";
import axios from "axios";
import { Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../Context/Context";

const HrLogin = () => {
  const { setHRUID ,setHrtoken} = useContext(Appcontext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/HR/login", formData);
      setHRUID(res.data.id);
      setHrtoken(res.data.token)
      toast.success("Login Successful");
    
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-6 text-center">HR Login</h2>

      <div className="relative mb-4">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="pl-10 border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative mb-2">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          className="pl-10 border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="text-right mb-4">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
      >
        Login
      </button>
    </div>
  );
};

export default HrLogin;
