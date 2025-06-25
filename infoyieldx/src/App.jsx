import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";
import Portfolio from "./Pages/Portfolio";
import Ourservices from "./Pages/Ourservices";
import Blog from "./Pages/Blog";
import Footer from "./Components/Footer";
import Contact from "./Pages/Contact";
import Career from "./Pages/Career";
import WebDevelopment from "./Pages/WebDevelopment";
import AppDevelopment from "./Pages/Appdevelopment";
import AccountingServices from "./Pages/AccountingServices";
import OracleEBS from "./Pages/OracleEbs";
import OracleDatabase from "./Pages/OracleDatabase";
import { Slide, ToastContainer } from "react-toastify";
import AdminPanel from "./Components/AdminPanel";
import Dashboard from "./Pages/Admin/Dashboard";
import EmployeeList from "./Pages/Admin/EmployeeList";
import LeaveManagement from "./Pages/Admin/LeaveManagement";
import MyProjects from "./Pages/Admin/MyProjects";
import Settings from "./Pages/Admin/Settings";
import AdminSettings from "./Pages/Admin/Settings";
import Reports from "./Pages/Admin/Reports";
import EmployeePanel from "./Components/EmployeePanel";
import MyProfile from "./Pages/Employee/Myprofile";
import EmployeeDashboard from "./Pages/Employee/EmployeeDashborad";
import { LeaveManagementEmp } from "./Pages/Employee/LeaveManagementEmp";
import TaskManagement from "./Pages/Employee/TaskManagement";
import Attendance from "./Pages/Employee/Attendance";
import Login from "./Pages/Login";
import { Appcontext } from "./Context/Context";
import Chatbot from "./Components/Chatbot";
import Applicaion from "./Pages/Applicaion";
import AddBlog from "./Pages/Admin/AddBlog";

const App = () => {
  const {selectedRole} =useContext(Appcontext)
  return (
    <div className="h-full ">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="Portfolio" element={<Portfolio />} />
        <Route path="OurService" element={<Ourservices />}/>
        <Route path="Blogs" element={<Blog />} />
        <Route path="career" element={<Career />} />
        <Route path="contact" element={<Contact />} />
        <Route path="Web-Development" element={<WebDevelopment />} />
        <Route path="app-development" element={<AppDevelopment />} />
        <Route path="accounts" element={<AccountingServices />} />
        <Route path="oracle-ebs" element={<OracleEBS />} />
        <Route path="oracle-database" element={<OracleDatabase />} />
             {/* Admin Panel Routing */}
        <Route path="admin" element={<AdminPanel />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="leave" element={<LeaveManagement />} />
          <Route path="projects" element={<MyProjects />} />
            <Route path="add-blogs" element={<AddBlog/>}  />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="Reports" element={<Reports />} />
        
        </Route>

         {/*Employee Panel Routing*/}
         <Route path="employee" element={<EmployeePanel/>}>
          <Route index element={<EmployeeDashboard/>} />
         <Route path="profile" element={<MyProfile/>}/>
         <Route path="attendance" element={<Attendance/>
         } />

         <Route path="leave" element={<LeaveManagementEmp/>} />
         <Route path="tasks" element={<TaskManagement/>} />
         </Route>
         <Route path="login" element={<Login/>} />
         <Route path="Application" element={<Applicaion/>} />
      </Routes>
       <Chatbot/>
      <Footer />
    </div>
  );
};

export default App;
