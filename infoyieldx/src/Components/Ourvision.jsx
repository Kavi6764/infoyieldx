import Lottie from "lottie-react";
import React from "react";
import { Target, Eye } from "lucide-react"; // Icon imports
import stand from "../assets/Stand.json";

const Ourvision = () => {
  return (
    <div>
      <section className="py-16 px-6 text-center container mx-auto">
        <h2 className="text-4xl font-bold text-center max-md:text-2xl">
          Our Commitments
        </h2>
        <div className="flex flex-col md:flex-row justify-around gap-8 mx-auto items-center mt-8">
          <Lottie
            animationData={stand}
            loop={true}
            autoplay={true}
            className="h-[500px] "
          />
          <div className="flex flex-col gap-10 md:gap-20">
            <div className="lg:w-[25vw] border p-8 rounded-xl bg-white/100 shadow-lg duration-200 hover:-translate-y-2 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2 text-blue-600">
                <Target className="w-6 h-6 animate-bounce" />
                <h3 className="md:text-2xl text-xl font-semibold">Our Mission</h3>
              </div>
              <p className="font-semibold text-slate-600">
                To deliver scalable and efficient tech solutions that drive
                business success through innovation, quality, and collaboration.
              </p>
            </div>
            <div className="lg:w-[25vw] border p-8 rounded-xl bg-white/100 shadow-lg duration-200 hover:-translate-y-2 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2 text-green-600">
                <Eye className="w-6 h-6 animate-bounce" />
                <h3 className="md:text-2xl text-xl font-semibold">Our Vision</h3>
              </div>
              <p className="font-semibold text-slate-600">
                To become a globally trusted partner for digital transformation
                by blending smart technology with business insight.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ourvision;
