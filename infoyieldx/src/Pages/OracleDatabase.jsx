import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { TbDatabaseCog } from "react-icons/tb";
import database from "../assets/database.json";
import { Gauge, ShieldCheck, UploadCloud } from "lucide-react";


// Services data with JSX icon elements
const databaseServices = [
  {
    icon: <TbDatabaseCog className="text-4xl text-red-600 mx-auto mb-4 animate-bounce" />,
    title: "Database Installation & Configuration",
    description:
      "Deploy Oracle Database with best practices for performance, scalability, and security across cloud or on-prem environments.",
  },
  {
    icon: <Gauge className="text-4xl text-red-600 mx-auto mb-4 animate-bounce" />,
    title: "Performance Tuning",
    description:
      "Boost query and application speed through expert-level tuning of SQL, indexing, and memory parameters.",
  },
  {
    icon: <ShieldCheck className="text-4xl text-red-600 mx-auto mb-4 animate-bounce" />,
    title: "Backup & Disaster Recovery",
    description:
      "Design and implement robust backup strategies and failover systems to ensure data availability and integrity.",
  },
  {
    icon: <UploadCloud className="text-4xl text-red-600 mx-auto mb-4 animate-bounce" />,
    title: "Database Migration",
    description:
      "Seamlessly migrate from legacy systems or other RDBMS platforms (SQL Server, MySQL) to Oracle with zero data loss.",
  },
];

// Motion variants
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const OracleDatabase = () => {
  return (
    <div className="bg-[#F4ecfe]/20 text-gray-800 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
       <motion.section
  className="py-16 text-center text-black"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <motion.h1
    className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 bg-clip-text text-transparent"
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.6 }}
  >
    Oracle Database Services
  </motion.h1>

  <motion.p
    className="text-lg max-w-2xl mx-auto text-gray-600"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    Enterprise-grade Oracle database solutions—from deployment to proactive support and optimization.
  </motion.p>
</motion.section>


        {/* Services Section */}
        <motion.h2
          className="text-2xl font-semibold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Our Core Offerings
        </motion.h2>

        <section className="pb-10 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Lottie Animation */}
        
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Lottie animationData={database} loop={true} />
          </motion.div>

          {/* Services List */}
          <motion.div
            className="grid md:grid-cols-2 grid-cols-1 gap-6"
            variants={container}
            initial="hidden"
            whileInView="visible"
          >
            {databaseServices.map((service, idx) => (
              <motion.div
                key={idx}
                className="bg-slate-200 p-6 rounded-xl shadow hover:shadow-lg transition text-center"
                variants={item}
              >
                {service.icon}
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
    
        <motion.section
          className="py-10 text-center bg-black text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">Need Oracle DBA Expertise?</h2>
          <p className="mb-6">
            Our certified DBAs are ready to support and scale your critical Oracle infrastructure.
          </p>
         <a href="contact">
           <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-red-700 text-white rounded hover:bg-red-800 transition"
          >
            Get a Free Assessment
          </motion.button>
         </a>
        </motion.section>
      </div>
    </div>
  );
};

export default OracleDatabase;
