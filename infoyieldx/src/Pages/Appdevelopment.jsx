import React from "react";
import Lottie from "lottie-react";
import mobile from "../assets/Mobile.json";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { Smartphone, Brush, Layers } from "lucide-react"; // Import icons

const features = [
  {
    title: "Cross-Platform Support",
    description:
      "We build mobile apps that run seamlessly on both iOS and Android platforms using React Native and Flutter.",
    icon: <Smartphone className="w-8 h-8 text-blue-600 mb-3" />,
  },
  {
    title: "User-Centered Design",
    description:
      "Our UX experts craft interfaces that are intuitive, elegant, and aligned with your business goals.",
    icon: <Brush className="w-8 h-8 text-blue-600 mb-3" />,
  },
  {
    title: "Scalable Architecture",
    description:
      "Whether you’re building an MVP or a complex enterprise solution, we design scalable and maintainable codebases.",
    icon: <Layers className="w-8 h-8 text-blue-600 mb-3" />,
  },
];

const AppDevelopment = () => {
  return (
    <div className="bg-[#F4ecfe]/20">
      <div className="max-w-6xl mx-auto py-10">
        {/* Hero */}
        <motion.section
          className="text-center py-16 text-black"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        ><section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center bg-clip-text text-transparent">
  <h1 className="text-5xl font-bold mb-4">Mobile App Development</h1>
  <p className="text-lg max-w-2xl mx-auto text-black">
    Build stunning mobile applications with excellent performance and usability.
  </p>
</section>

        </motion.section>

        {/* Features */}
        <motion.h2
          className="text-2xl font-semibold text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          What We Offer
        </motion.h2>
        <section className="py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="flex flex-wrap gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
               <div className="flex justify-center animate-bounce">{feature.icon}</div> 
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Parallax Lottie */}
          <Parallax speed={-10}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Lottie animationData={mobile} />
            </motion.div>
          </Parallax>
        </section>

        {/* CTA */}
        <motion.section
          className="py-10 text-center bg-black text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">Ready to Build Your App?</h2>
          <p className="mb-6">
            Let’s turn your idea into a high-performing mobile application.
          </p>
          <a href="contact">
            <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Get a Free Consultation
          </button>
          </a>
        </motion.section>
      </div>
    </div>
  );
};

export default AppDevelopment;
