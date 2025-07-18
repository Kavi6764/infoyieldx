import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

// const projectData = [
//   {
//     id: 1,
//     name: "SmartDesk",
//     category: "Web App Development",
//     description: "Task management for remote teams with real-time dashboards.",
//     tech: "React, Node.js, MongoDB",
//     image: "/images/smartdesk.png",
//   },
//   {
//     id: 2,
//     name: "EcomEase",
//     category: "Web App Development",
//     description: "eCommerce platform with CRM and inventory control.",
//     tech: "Next.js, Express, MySQL",
//     image: "/images/ecomease.png",
//   },
//   {
//     id: 3,
//     name: "MedSync",
//     category: "Mobile App Development",
//     description: "Health appointment and virtual consultation app.",
//     tech: "Flutter, Firebase",
//     image: "/images/medsync.png",
//   },
//   {
//     id: 4,
//     name: "EduTrack",
//     category: "Mobile App Development",
//     description: "App for students and tutors with class and attendance tracking.",
//     tech: "React Native, Supabase",
//     image: "/images/edutrack.png",
//   },
//   {
//     id: 5,
//     name: "FinLedger",
//     category: "Accounting Services",
//     description: "Cloud-based accounting portal with invoicing and reports.",
//     tech: "Laravel, PostgreSQL",
//     image: "/images/finledger.png",
//   },
//   {
//     id: 6,
//     name: "TaxMate",
//     category: "Accounting Services",
//     description: "Tax filing and compliance dashboard with real-time sync.",
//     tech: "Vue.js, Django",
//     image: "/images/taxmate.png",
//   },
//   {
//     id: 7,
//     name: "ERP Customization",
//     category: "Oracle EBS",
//     description: "Customized EBS for procurement and inventory workflows.",
//     tech: "Oracle EBS R12, PL/SQL",
//     image: "/images/erp-custom.png",
//   },
//   {
//     id: 8,
//     name: "HRMS Integration",
//     category: "Oracle EBS",
//     description: "Integrated Oracle HRMS with external payroll systems.",
//     tech: "Oracle HRMS, APIs",
//     image: "/images/hrms.png",
//   },
//   {
//     id: 9,
//     name: "DBGuard",
//     category: "Oracle Database",
//     description: "HA Oracle DB setup with automated backups and recovery.",
//     tech: "Oracle 19c, RMAN",
//     image: "/images/dbguard.png",
//   },
//   {
//     id: 10,
//     name: "Retail DB Optimization",
//     category: "Oracle Database",
//     description: "Performance tuning with indexing and query optimization.",
//     tech: "Oracle 12c, PL/SQL",
//     image: "/images/retail-db.png",
//   },
// ];

const categories = [
  "All",
  "Web Development",
  "App Development",
  "Accounts",
  "Digital-Marketing",
  "Oracle Database",
];

const OurProjects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [Project,setProjects] = useState([])
  
const filteredProjects = Project.filter((project) => {
  const matchCategory =
    activeCategory === "All" || project.department === activeCategory;
  const matchStatus = project.status === "Completed"; // or use a variable if needed

  return matchCategory && matchStatus;
});


  const GetData = async ()=>{
    const res =await axios.get("http://localhost:5000/api/HR/get-portfolio")
    console.log("res",res.data.portfolio)
    setProjects(res.data.portfolio)
  }    

  useEffect(()=>{
               GetData();
  },[])    

  return (
    <section className="py-16 px-6  bg-[#E5E4E2]/10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:text-5xl text-3xl  font-bold mb-10 text-[#4b0082] "
      >
        Our Projects
      </motion.h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold text-sm shadow-xl scale-95 transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 ${
              activeCategory === cat
                ? "bg-[#4b0082] text-[#e5e4e2]"
                : "text-black bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group"
            initial={{ opacity: 0, y: 30 }}
         
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={`http://${project.imageUrl}`}
              alt={project.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-700 mb-3">{project.description}</p>
              <span className="text-xs inline-block bg-[#e5e4e2] text-[#4b0082] px-3 py-1 rounded-full">
                {project.technologies}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurProjects;
