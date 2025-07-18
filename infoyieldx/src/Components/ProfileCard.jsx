// components/Employee/ProfileCard.tsx
import React, { useEffect } from "react";
import { Mail, Phone, MapPin, User } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const ProfileCard = () => {
  const [profile,setprofile] = useState([])
  const token =localStorage.getItem("empToken")
  const fetchProfile = async()=>{
    try{
    const res =await axios.get("http://localhost:5000/api/employee/get",{
    headers: {
    Authorization: `Bearer ${token}`,
    }})
 const prof = res.data;

    const profileData = {
      address:prof.address,
      avatar: prof.avatar,
      firstname: prof.firstname,
      lastname: prof.lastname,
      email: prof.email,
      phone: prof.phone,
      position: prof.position,
      dep: prof.department,
    };
     setprofile(profileData)
     console.log("Profile:",prof)
  
  }catch (error) {
    console.error("Error fetching profile:", error);
  }
  }
  useEffect(()=>{
    fetchProfile()
  },[])
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 w-full">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Profile Information</h2>
        <p className="text-sm text-gray-500">Your current profile details</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full  flex items-center justify-center">
          {/* <span className="text-white text-xl font-bold">SJ</span> */}
          <img src={`http://${profile.avatar}`} alt={profile.firstname} className="rounded-full" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{`${profile.firstname} ${profile.lastname}`}</h3>
          <p className="text-sm text-gray-600">{profile.position}</p>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
            {profile.dep}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t space-y-3">
        <div className="flex items-center space-x-3 text-gray-600 text-sm">
          <Mail className="h-4 w-4" />
          <span>{profile.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600 text-sm">
          <Phone className="h-4 w-4" />
          <span>{profile.phone}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{profile.address}</span>
        </div>
      </div>

      <a href="/employee/profile">
        <button  className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition">
        <User className="h-4 w-4 mr-2" />
        Edit Profile
      </button>
      </a>
    </div>
  );
};

export default ProfileCard;
