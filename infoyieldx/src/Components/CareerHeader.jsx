import { ArrowDown } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const CareerHeader = () => {
  const scrollToJobs = () => {
    document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className=''>
      <div className='container mx-auto text-center my-auto'>
        <motion.h1
          className='md:text-6xl text-3xl font-bold p-10 text-[#051c36]'
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Build the Future <br /><span className='text-[#34617F]'>With Us</span>
        </motion.h1>

        <motion.p
          className='max-w-xl mx-auto text-md px-3 text-slate-800 md:text-xl'
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Join a team of passionate innovators working on cutting-edge technology that shapes tomorrow. We're looking for talented individuals who share our vision of making the world better through technology
        </motion.p>

        <motion.button
          onClick={scrollToJobs}
          className='py-4 px-8 border text-xs md:text-lg bg-[#051c36] text-white rounded-lg my-8'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Open position
        </motion.button>

        <motion.div
          className='w-full'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <ArrowDown className='mx-auto animate-bounce' />
        </motion.div>
      </div>
    </div>
  );
};

export default CareerHeader;
