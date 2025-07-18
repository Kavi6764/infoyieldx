import React, { useContext, useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Appcontext } from "../Context/Context";

const EmployeeLogin = () => {
  const {setEmptoken,setEmpId} = useContext(Appcontext)
  const [formData, setFormData] = useState({ employeeId: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/employee/login", formData);
      setEmptoken(res.data.token)
      setEmpId(res.data.id)
      navigate("/employee");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-6 text-center">Employee Login</h2>

      <div className="relative mb-4">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          placeholder="Employee ID"
          className="pl-10 border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative mb-2">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="pl-10 border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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

export default EmployeeLogin;

