import React from 'react';
import { LuUser, LuAward, LuTarget, LuZap } from "react-icons/lu";
import { motion } from "framer-motion";

const Aboutus = () => {
  const values = [
    {
      icon: LuUser,
      title: "Expert Team",
      description: "Our certified professionals bring years of experience in cutting-edge technologies."
    },
    {
      icon: LuAward,
      title: "Proven Excellence",
      description: "Award-winning solutions with a track record of successful project deliveries."
    },
    {
      icon: LuTarget,
      title: "Client-Focused",
      description: "We prioritize your business goals and deliver solutions that drive real results."
    },
    {
      icon: LuZap,
      title: "Innovation First",
      description: "Stay ahead with the latest technologies and innovative approaches to problem-solving."
    }
  ];

  return (
    <div className='max-w-7xl mx-auto px-4 '>
  <motion.h2 
  initial={{ opacity: 0, y: 40, scale: 0.95 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ type: "spring", stiffness: 80, damping: 12 }}
  viewport={{ once: true }}
  className="text-4xl font-bold py-16 text-center text-[#18442a] max-md:text-2xl"
>
  Get to Know Us
</motion.h2>

      <div className='grid lg:grid-cols-2 gap-12 items-center'>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl lg:text-4xl font-semibold">
            Why Choose Infoyieldx?
          </h2>
          <p className="font-medium text-slate-600">
            For over a decade, we've been at the forefront of digital transformation, 
            helping businesses leverage technology to achieve their goals. Our team of 
            experts combines technical excellence with business acumen to deliver 
            solutions that make a real impact.
          </p>
          <p className="font-medium text-slate-600">
            From startups to enterprise organizations, we've successfully delivered 
            hundreds of projects across various industries, earning trust through 
            transparency, quality, and results.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {values.map((value, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="group relative text-center p-6 bg-white rounded-lg border shadow-xl transition-all duration-300 scale-95 hover:scale-105 overflow-hidden custom-glow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-14 w-16 bg-[#18442a] text-white animate-bounce p-3 rounded-xl" />
              </div>
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <p className="text-sm font-semibold text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Aboutus;
