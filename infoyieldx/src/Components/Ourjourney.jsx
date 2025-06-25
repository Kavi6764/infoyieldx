import React from "react";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "2018",
    title: "Founded",
    description: "We started as a small team with a shared passion for solving real-world business challenges.",
  },
  {
    year: "2020",
    title: "First Milestone",
    description: "Launched our first full-scale enterprise solution, transforming operations for a key client.",
  },
  {
    year: "2022",
    title: "Expanding Horizons",
    description: "Expanded into mobile and cloud-based solutions, serving clients across multiple industries.",
  },
  {
    year: "2024",
    title: "Innovation Ahead",
    description: "Pioneering in AI, automation, and advanced digital transformation services.",
  },
];

const OurJourney = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
        <div className="relative border-l-4 border-gray-300 pl-6 space-y-12">
          {timeline.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="absolute -left-7 top-1 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow" />
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm text-blue-500 font-semibold">{event.year}</p>
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="mt-2 text-gray-600">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
