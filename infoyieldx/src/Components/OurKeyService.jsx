import React from 'react';
import { Link } from 'react-router-dom';
import { LuSmartphone, LuDatabase, LuDatabaseZap, LuCode, LuNewspaper } from 'react-icons/lu';
import { motion } from 'framer-motion';

const OurKeyService = () => {
  const services = [
    {
      id: 1,
      icon: LuNewspaper,
      title: "Accounting Services",
      description: "Streamline financial operations with modern, automated accounting solutions tailored for growth.",
      link: "accounts",
    },
    {
      id: 2,
      icon: LuCode,
      title: "Web Development",
      description: "Build fast, scalable, and secure web platforms that drive user engagement and business success.",
      link: "web-development",
    },
    {
      id: 3,
      icon: LuSmartphone,
      title: "Mobile App Development",
      description: "Launch responsive and intuitive mobile apps that delight users and support your digital goals.",
      link: "app-development",
    },
    {
      id: 4,
      icon: LuDatabaseZap,
      title: "Oracle E-Business Suite (EBS)",
      description: "Implement and optimize Oracle EBS for enterprise-wide process automation and integration.",
      link: "oracle-ebs",
    },
    {
      id: 5,
      icon: LuDatabase,
      title: "Oracle Database Management",
      description: "Ensure high performance, security, and reliability of Oracle databases across environments.",
      link: "oracle-database",
    },
  ];

  return (
    <div className=" relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <section className="py-12 px-6 text-center relative">
          <motion.h2
            className="text-4xl font-bold mb-8 max-md:text-2xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Key Services
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[90vw] mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-xl relative hover:shadow-blue-200 transition-all duration-300 group custom-glow"
                whileHover={{ scale: 1.05 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="text-blue-600 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <service.icon className="w-6 h-6 animate-bounce" />
                </motion.div>
                <h3 className="md:text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
                <Link to={service.link}>
                  <button className="mt-4 border border-blue-500 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition">
                    Know More
                  </button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default OurKeyService;
