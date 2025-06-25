import React from "react";
import { Code, Globe, MonitorSmartphone, Rocket } from "lucide-react";
import Lottie from "lottie-react";
import Webdevelopment from "../assets/webDevelopement.json";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

const WebDevelopment = () => {
  const features = [
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-blue-600" />,
      title: "Responsive Design",
      description:
        "Web apps that look great on all devices—from phones to desktops.",
    },
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: "Modern Tech Stack",
      description:
        "Using React, Node.js, MongoDB, and more for fast, reliable web apps.",
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "SEO Optimized",
      description:
        "Improve visibility with search engine friendly development.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      title: "Performance Focused",
      description: "Optimized code for fast loading and smooth experiences.",
    },
  ];

  return (
    <div className="bg-slate-50 text-gray-800 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        {/* <motion.section
          className="text-center py-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Web App Development
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 px-3">
            We craft high-performance, scalable, and secure web applications
            that drive business success.
          </p>
        </motion.section> */}
        <motion.section
  className="text-center py-16"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }}
>
  <motion.h1
    className="text-4xl md:text-5xl font-bold mb-4 animate-pulse bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ type: "spring", stiffness: 60 }}
  >
    Web App Development
  </motion.h1>

  <motion.p
    className="text-lg max-w-2xl mx-auto text-gray-600 px-3"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    We craft high-performance, scalable, and secure web applications that drive business success.
  </motion.p>
</motion.section>

        {/* Features Section */}
        <section className="pb-16 px-4 max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-16 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-slate-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className="flex justify-center mb-4 animate-bounce">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <Parallax speed={-10}>
            <div className="w-full">
              <Lottie animationData={Webdevelopment} loop />
            </div>
          </Parallax>
        </section>

        {/* Call to Action */}
        <motion.section
          className="text-center py-10 bg-black text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            Ready to Build Your Web App?
          </h2>
          <p className="mb-6 text-lg">
            Let our expert team bring your idea to life.
          </p>
          <a href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition"
            >
              Get in Touch
            </motion.button>
          </a>
        </motion.section>
      </div>
    </div>
  );
};

export default WebDevelopment;
