import React from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import Lottie from "lottie-react";
import EBS from "../assets/Ebs.json";
import { Settings, Puzzle, UploadCloud, ShieldCheck } from "lucide-react";

const ebsServices = [
  {
    title: "Implementation & Deployment",
    description:
      "End-to-end Oracle EBS implementation tailored to your business processes, including system configuration and data migration.",
    icon: <Settings className="w-8 h-8 text-purple-700" />,
  },
  {
    title: "Customization & Integration",
    description:
      "Enhance EBS capabilities with custom modules and seamless integration with third-party systems like SAP, Salesforce, or in-house apps.",
    icon: <Puzzle className="w-8 h-8 text-purple-700" />,
  },
  {
    title: "Upgrade & Migration",
    description:
      "Smooth upgrade paths from earlier Oracle EBS versions to the latest release, with minimal downtime and full data integrity.",
    icon: <UploadCloud className="w-8 h-8 text-purple-700" />,
  },
  {
    title: "Managed Support Services",
    description:
      "24/7 monitoring, troubleshooting, and user support to ensure your Oracle EBS environment remains stable and optimized.",
    icon: <ShieldCheck className="w-8 h-8 text-purple-700" />,
  },
];

const OracleEBS = () => {
  return (
    <div className="bg-[#F4ecfe]/20">
      <div className="max-w-7xl mx-auto py-10">
        {/* Hero Section */}
        <motion.section
          className="py-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <motion.h1
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Oracle E-Business Suite Services
          </motion.h1>

          <motion.p
            className="text-lg max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Unlock enterprise productivity with our Oracle EBS solutions—from implementation to support.
          </motion.p>
        </motion.section>

        {/* Services */}
        <motion.h2
          className="text-2xl font-semibold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our EBS Expertise
        </motion.h2>

        <section className="py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {ebsServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-200 p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="flex justify-center mb-3 animate-bounce">{service.icon}</div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <Parallax speed={-10}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ rotate: 2, scale: 1.05 }}
            >
              <Lottie animationData={EBS} />
            </motion.div>
          </Parallax>
        </section>

        {/* Call to Action */}
        <motion.section
          className="py-10 text-center bg-black text-white rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="text-xl font-semibold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Need Help With Oracle EBS?
          </motion.h2>
          <motion.p
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Let our certified Oracle consultants modernize and support your EBS environment.
          </motion.p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-6 py-3 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors duration-300">
              Schedule a Consultation
            </button>
          </motion.a>
        </motion.section>
      </div>
    </div>
  );
};

export default OracleEBS;