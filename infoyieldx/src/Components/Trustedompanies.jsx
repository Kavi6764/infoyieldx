import React from "react";
import { motion } from "framer-motion";
import google from '../assets/Google.png'
import Amazon from '../assets/amazon.png'
import Microsoft from '../assets/Microsoft.png'
import Netflix from '../assets/Netflix.png'
import Arbnb from '../assets/Arbnb.png'
const logos = [
  { name: "Google", src: google },
  { name: "Amazon", src: Amazon },
  { name: "Microsoft", src: Microsoft},
  { name: "Netflix", src: Netflix },
  { name: "Airbnb", src: Arbnb },
];


const TrustedCompanies = () => {
  const companies = [...logos,...logos]
  console.log(companies)
  return (
    <section className="py-20">
      <div className="container mx-auto text-center max-w-5xl ">
        <h2 className="text-3xl font-bold mb-7 ">
          Trusted by Leading Companies
        </h2>
        <p className="text-gray-600 mb-4">
          From fast-growing startups to global giants, companies around the world rely on our platform to streamline operations, drive innovation, and deliver exceptional results.
        </p>
        <p className="text-gray-600 mb-12">
          Join the hundreds of forward-thinking organizations that have transformed their businesses with our solutions. Our commitment to reliability, scalability, and customer success makes us the partner of choice across industries.
        </p>
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-12 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {companies.map((company, index) => (
              <div key={index} className="flex items-center justify-center min-w-[150px]">
                <img
                  src={company.src }
                  alt={company.name}
                  className="h-10  hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
