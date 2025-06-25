import React from "react";
import Lottie from "lottie-react";
import care from "../assets/Sit.json";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";

const GetinTouch = () => {
  return (
    <div className="">
      <motion.div 
      initial={{opacity:0,y:30}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:0.6,delay:0.3}}

       className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 items-center gap-10">
          {/* Parallax Lottie Animation */}
          <Parallax translateY={[-20, 20]}>
            <Lottie animationData={care} className="h-[65vh]" />
          </Parallax>

          {/* Text Content */}
          <div className="flex flex-col gap-8 items-start">
            <div className="text-4xl md:text-5xl font-semibold leading-tight">
              <h1>We're Here to Help</h1>
              <h1>Our Team is Committed</h1>
              <h1>to Your Success</h1>
            </div>

            <p className="font-medium text-slate-600 text-lg">
              Every success story starts with a simple first step. Let’s take that journey together!
              We’re dedicated to crafting personalized solutions that simplify your operations and break
              down the complexities of automation into clear, actionable steps. From planning to
              execution, we’re here for you.
            </p>

            <a href="/contact">
              <button className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition">
                Contact Now
              </button>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GetinTouch;
