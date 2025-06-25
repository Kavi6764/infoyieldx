// components/Employee/Header.tsx
import React from "react";
import { ArrowLeft, Bell, Settings } from "lucide-react";

const EmployeeHeader = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Kaviarasu S!
            </h1>
            <p className="text-sm text-gray-600">
              Here's your personal dashboard
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Settings className="h-5 w-5 text-gray-700" />
          </button>

          <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">KS</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EmployeeHeader;
