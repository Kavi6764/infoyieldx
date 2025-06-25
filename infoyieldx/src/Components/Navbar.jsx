import React, { useContext, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { BiMenu, BiMobileAlt, BiPhone } from "react-icons/bi";
import { GrMenu } from "react-icons/gr";
import { FcCancel, FcCellPhone } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import logo from "../assets/logo.png";
import { FaUser, FaUserShield } from "react-icons/fa";
import {
  CalculatorIcon,
  Code2,
  Database,
  Server,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../Context/Context";

const Navbar = () => {
  const{setShowLayout,showLayout,selectedRole,setSelectedRole} = useContext(Appcontext)
  const [mobView, setMobview] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowRoles(!showRoles);
  };

  const handleRoleSelect = (role) => {
        navigate("login")    
      setSelectedRole(role)
      setShowLayout(false)
    
  };

  const toggle = () => {
    setMobview(!mobView);
  };
  if (!showLayout) return null;

  return (
   
    <div className=" bg-white z-20 shadow-md backdrop-blur-sm sticky top-0">
      <div className="  relative ">
        <div className=" flex justify-around items-center text-xl font-medium text-slate-600 ">
          <div className="md:hidden " onClick={toggle}>
            <GrMenu className="text-2xl" />
          </div>
          <div>
            <img
              src={logo}
              alt="Logo"
              className="w-[100px] md:w-[130px] object-cover"
            />
          </div>
          <div className="flex gap-10 max-md:hidden">
            <a href="/" className="hover:text-black">
              Home
            </a>
            <a href="about" className="hover:text-black">
              About
            </a>
            <a href="portfolio" className="hover:text-black">
              Portfolio
            </a>
            <div className="relative group z-50">
              <a href="ourservice" className="hover:text-black">
                Our Services
              </a>
              <ul className="absolute -z-0 shadow-2xl w-[240px] hidden group-hover:flex bg-white scale-75 text-sm  flex-col gap-5 transform translate-x-2 transition-all text-black py-5 group-hover:scale-110 duration-300 top-[50px] px-5 rounded-lg items-start pointer-events-auto ">
                <li className="flex gap-3 items-center">
                  <a href="web-development" className="flex gap-3 items-center">
                    <Code2 />
                    <p>Web Development</p>
                  </a>
                </li>

                <li className="flex gap-3 items-center">
                  <a href="accounts" className="flex gap-3 items-center">
                    <CalculatorIcon />
                    <p>Accounting Services</p>
                  </a>
                </li>

                <li className="flex gap-3 items-center">
                  <a href="App-development" className="flex gap-3 items-center">
                    <Smartphone />
                    <p>Mobile App Development</p>
                  </a>
                </li>

                <li className="flex gap-3 items-center">
                  <a href="oracle-ebs" className="flex gap-3 items-center">
                    <Server />
                    <p>Oracle E-Business Suite (EBS)</p>
                  </a>
                </li>

                <li className="flex gap-3 items-center">
                  <a href="oracle-database" className="flex gap-3 items-center">
                    <Database />
                    <p>Oracle Database Management</p>
                  </a>
                </li>
              </ul>
            </div>

            <a href="blogs" className="hover:text-black">
              Blogs
            </a>
            <a href="Career" className="hover:text-black">
              Career
            </a>
          </div>
          <div className="flex md:gap-10 gap-4  items-center relative">
            <a href="contact" className="hover:text-black">
              <div className="flex gap-3 items-center">
                <BiPhone className="md:text-3xl text-2xl" />
                {/* <p className="max-md:hidden">Contact</p> */}
              </div>
            </a>
            <div className="flex gap-3   items-center hover:text-black cursor-pointer ">
              <button onClick={handleClick} className="">
                Login
              </button>

              {showRoles && (
                <div className="left-0 bg-white border text-xs md:text-lg rounded-md shadow-md absolute top-10">
                  <ul className="divide-y divide-gray-200">
                    <li
                      onClick={() => handleRoleSelect("HR")}
                      className="md:px-6 px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                      <FaUserShield />
                      Admin
                    </li>
                    <li
                      onClick={() => handleRoleSelect("Employee")}
                      className="md:px-6 px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                    >
                      <FaUser />
                      Employee
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {/** Mobile View */}
        <div
          className={`${
            mobView ? "translate-x-0" : "-translate-x-full"
          } absolute z-0 bg-white top-0 w-[75vw] p-5 shadow-lg h-screen text-lg font-medium transform transition-transform duration-400 ease-in-out`}
        >
          <div className="flex justify-between items-center text-xl my-5">
            <h1 className=" font-bold">Infoyieldx</h1>
            <RxCross2 onClick={toggle} />
          </div>
          <div className="flex flex-col gap-6 mt-10 text-slate-500">
            <a href="/" className="hover:text-black">
              Home
            </a>

            <a href="about" className="hover:text-black">
              About
            </a>

            <a href="portfolio" className="hover:text-black">
              Portfolio
            </a>

            <a href="ourservice" className="hover:text-black">
              Our Services
            </a>

            <a href="blogs" className="hover:text-black">
              Blogs
            </a>
            <a href="career" className="hover:text-black">
              Career
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
