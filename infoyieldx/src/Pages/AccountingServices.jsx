import React from "react";
import accounts from "../assets/accounts.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import {
  FileText,
  Wallet,
  Landmark,
  BarChart2,
} from "lucide-react"; // Lucide icons

const services = [
  {
    title: "Bookkeeping & Ledger Maintenance",
    description:
      "Track daily financial transactions accurately with our expert bookkeeping services.",
    icon: <Wallet className="w-8 h-8 text-green-600 mb-3" />,
  },
  {
    title: "Payroll Management",
    description:
      "Timely and accurate payroll processing, including payslip generation and compliance.",
    icon: <FileText className="w-8 h-8 text-green-600 mb-3" />,
  },
  {
    title: "Tax Planning & Filing",
    description:
      "Ensure compliance with GST, TDS, and income tax regulations with smart filing and advisory.",
    icon: <Landmark className="w-8 h-8 text-green-600 mb-3" />,
  },
  {
    title: "Financial Statements & Reporting",
    description:
      "Get monthly, quarterly, and annual reports to monitor the health of your business.",
    icon: <BarChart2 className="w-8 h-8 text-green-600 mb-3" />,
  },
];

const AccountingServices = () => {
  return (
    <div className=" animate-gradient-x">
      <div className="text-gray-800 max-w-6xl mx-auto py-10">
        {/* Hero Section */}
        <motion.section
          className="py-16 text-center text-black"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
       
          <motion.h1
  className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-emerald-500 to-lime-400 bg-clip-text text-transparent"
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }}
  transition={{ duration: 0.6 }}
>
  Accounting Services
</motion.h1>

<motion.p
  className="text-lg max-w-2xl mx-auto text-gray-600 "
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  Professional accounting solutions tailored to streamline your
  financial processes and ensure compliance.
</motion.p>
        </motion.section>

        {/* Services Header */}
        <motion.h2
          className="text-2xl font-semibold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Our Core Offerings
        </motion.h2>

        <section className="py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Lottie Animation with Parallax */}
          <Parallax speed={-10}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Lottie animationData={accounts} loop />
            </motion.div>
          </Parallax>

          {/* Services List */}
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-200 p-6 rounded-xl shadow hover:shadow-md transition text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
               <div className="flex justify-center animate-bounce">{service.icon}</div> 
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="py-10 text-center bg-black text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">
            Need Reliable Accounting Support?
          </h2>
          <p className="mb-6">
            Let our experts handle your numbers so you can focus on growing your
            business.
          </p>
<a href="contact"><button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Request a Free Consultation
          </button></a>
        </motion.section>
      </div>
    </div>
  );
};

export default AccountingServices;
