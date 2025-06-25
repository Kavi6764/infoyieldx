// components/Employee/ProfileCard.tsx
import React from "react";
import { Mail, Phone, MapPin, User } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 w-full">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Profile Information</h2>
        <p className="text-sm text-gray-500">Your current profile details</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white text-xl font-bold">SJ</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sarah Johnson</h3>
          <p className="text-sm text-gray-600">Senior Software Developer</p>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
            Engineering
          </span>
        </div>
      </div>

      <div className="pt-4 border-t space-y-3">
        <div className="flex items-center space-x-3 text-gray-600 text-sm">
          <Mail className="h-4 w-4" />
          <span>sarah.johnson@company.com</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600 text-sm">
          <Phone className="h-4 w-4" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600 text-sm">
          <MapPin className="h-4 w-4" />
          <span>New York, NY</span>
        </div>
      </div>

      <button className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition">
        <User className="h-4 w-4 mr-2" />
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
