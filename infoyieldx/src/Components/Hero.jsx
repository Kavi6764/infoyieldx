import React from "react";
import anime from "../assets/Ai.json";
import Lottie from "lottie-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import Desgin from "./Desgin";
import Heroimg from "../assets/Hero2.png";
const Hero = () => {
  return (
    <div className=" py-10  px-2  ">
      <div className="flex md:flex-row flex-col-reverse justify-around md:h-[80vh] items-center max-md:gap-10  max-w-7xl mx-auto">
        <div className="font-bold flex flex-col gap-5  ">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:text-6xl text-2xl max-md:text-center text-indigo-700  drop-shadow-md"
          >
            Transform Your
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="md:text-6xl text-2xl max-md:text-center drop-shadow-md"
          >
            Business with Digital
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="md:text-6xl text-2xl max-md:text-center drop-shadow-md"
          >
            Innovation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="max-md:text-center md:w-[40vw]   text-gray-600 "
          >
            We deliver cutting-edge IT solutions that drive growth, enhance
            security, and streamline operations for businesses of all sizes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex max-md:flex-col gap-9 p-2"
          >
            <div className="flex gap-3 justify-center items-center border p-3 bg-indigo-950  text-white rounded-lg">
              <button>
                <a href="contact">Get Start</a>
              </button>
              <FaArrowRightLong />
            </div>
            <a href="ourservice">
              <button className="border p-3 rounded- w-full rounded-lg border-indigo-950">
                Learn More
              </button>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8 }}
            className="flex justify-between md:w-[30vw] p-2 items-center "
          >
            <div className="flex flex-col items-center">
              <h2>500+</h2>
              <p className="text-slate-500 text-xs md:text-md">
                Projects Delivered
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h2>99 %</h2>
              <p className="text-slate-500 text-xs">Uptime Gurantee</p>
            </div>
            <div className="flex flex-col items-center">
              <h2>24/7</h2>
              <p className="text-slate-500 text-xs">Support</p>
            </div>
          </motion.div>
        </div>
        <div>
          {/* <Lottie
            animationData={anime}
            loop={true}
            autoplay={true}
            className="md:w-[700px] w-full h-full "
          /> */}
          <img src={Heroimg} alt="" className="bg-transparent md:w-[470px] md:h-[470px] " />
        </div>
      </div>
    </div>
  );
};

export default Hero;
