import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Lock } from 'lucide-react';
import axios from 'axios';

const Myprofile = () => {
  const [profileData, setProfileData] = useState({
    // firstName: 'John',
    // lastName: 'Doe',
    // username: 'johndoe_92',
    // role: 'Frontend Developer',
    // email: 'john.doe@example.com',
    // phone: '+1 (555) 123-4567',
    // location: 'San Francisco, CA',
    // address: '123 Main St, San Francisco, CA 94101',
    // bio: 'Passionate developer and designer creating amazing user experiences.',
    // profileImage: 'https://github.com/shadcn.png',
  });
  
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("empToken")
      const res = await axios.get('http://localhost:5000/api/employee/get',{
          headers: {
    Authorization: `Bearer ${token}`,
      },
      }); 
        console.log("Profile",res.data)
        setProfileData(res.data)
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };
  fetchProfile();
}, []);


  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
    
  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, profileImage: imgUrl }));
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed successfully (mock)");
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          {/* Profile Picture and Basic Info */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={profileData.profileImage}
                className="w-20 h-20 rounded-full object-cover"
                alt="Profile"
              />
              <label className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full cursor-pointer shadow-md">
                <Camera className="w-4 h-4" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <p className="text-sm text-gray-600">Update your personal details and profile picture</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Verified Account</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First & Last Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <User className="w-4 h-4" /> First Name
              </label>
              <input
                type="text"
                value={profileData.firstname}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full border rounded px-3 py-2"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={profileData.lastname}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full border rounded px-3 py-2"
                disabled
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={profileData.employeeId}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full border rounded px-3 py-2"
                disabled
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={profileData.type}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full border rounded px-3 py-2"
                disabled
              />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full border rounded px-3 py-2"
              disabled
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Phone className="w-4 h-4" /> Phone
            </label>
            <input
              type="text"
              value={profileData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full border rounded px-3 py-2"
              disabled
            />
          </div>
{/* 
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-4 h-4" /> Location
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div> */}

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={profileData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Bio */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="w-full border rounded px-3 py-2 h-24"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div> */}
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Change Password
          </h2>
          <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => handlePasswordChange('current', e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => handlePasswordChange('new', e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
