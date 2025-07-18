import React from "react";
import { MdStarRate } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const OurservieHeader = () => {
  const onScrollTap = () =>{
    document.getElementById("core-service")?.scrollIntoView({behavior:"smooth"})
  }
  return (
    <div className="py-10">
      <div className="mx-auto container">
        <motion.div
          className="flex text-yellow-400 px-4 py-2 items-center gap-2 justify-center font-semibold md:text-xl text-md"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex">
            <MdStarRate />
            <MdStarRate />
            <MdStarRate />
            <MdStarRate />
            <MdStarRate />
          </div>
          <p className="text-slate-700 text-center">
            Trusted by 150+ clients
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="md:text-7xl text-5xl font-bold text-center mt-10">
            <span className="bg-gradient-to-r from-black via-slate-600 to-white bg-clip-text text-transparent">
              Premium Services
            </span>
            <br />
            That Drive Results
          </h1>
          <p className="text-center md:text-2xl text-lg max-w-3xl mx-auto font-light text-slate-700 mt-10 max-md:px-2">
            Transform your business with our comprehensive suite of professional
            services designed to accelerate growth and maximize success in the
            digital age.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-around items-center max-w-xl mx-auto gap-10 py-10 max-md:flex-col max-md:px-3"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div onClick={onScrollTap} className="flex gap-3 justify-center items-center border p-3 bg-black w-full text-white rounded-lg">
            <button>Explore More</button>
            <FaArrowRightLong />
          </div>
          <div className="border bg-slate-300 p-3 rounded-lg w-full text-center">
            <a href="contact"><button >Schedule Consulation</button></a>
          </div>

        </motion.div>
      </div>

      <motion.div
        className="flex mx-auto justify-between md:w-[30vw] px-4 items-center pb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold">500+</h2>
          <p className="text-slate-500 text-xs md:text-xl">Projects Delivered</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold">99 %</h2>
          <p className="text-slate-500 text-xs md:text-xl">Uptime Guarantee</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold">24/7</h2>
          <p className="text-slate-500 text-xs md:text-xl">Support</p>
        </div>
      </motion.div>
    </div>
  );
};

export default OurservieHeader;
