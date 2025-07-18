import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Project Manager, TechNova",
    feedback: "Their team delivered a seamless product...",
    image: "/clients/priya.jpg",
  },
  {
    name: "Ravi Kumar",
    role: "CTO, FinEdge",
    feedback: "Professional, responsive, and highly skilled...",
    image: "/clients/ravi.jpg",
  },
  {
    name: "Anjali Mehta",
    role: "Founder, Craftsy",
    feedback: "They turned our vision into a fully functional app...",
    image: "/clients/anjali.jpg",
  },
  {
    name: "Suresh Nair",
    role: "Head of Ops, BizGrowth",
    feedback: "Exceptional delivery and solid technical foundation.",
    image: "/clients/suresh.jpg",
  },
];

const ITEMS_PER_PAGE = 3;

const ClientFeedback = () => {
  const [page, setPage] = useState(0);

  const startIndex = page * ITEMS_PER_PAGE;
  const visibleClients = testimonials.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const hasNext = startIndex + ITEMS_PER_PAGE < testimonials.length;
  const hasPrev = page > 0;

  const next = () => {
    if (hasNext) setPage(page + 1);
    else setPage(0); 
  };

  const prev = () => {
    if (hasPrev) setPage(page - 1);
    else setPage(Math.floor((testimonials.length - 1) / ITEMS_PER_PAGE)); 
  };

  return (
    <section className=" pb-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold">What Our Clients Say</h2>
        <p className="text-xl py-6">
          Here's what industry leaders are saying about our work.
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {visibleClients.map((client, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md border transform transition duration-300 hover:scale-105 hover:-translate-y-3"
              >
                {/* <img
                  src={client.image}
                  alt={client.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                /> */}
                <p className="text-sm text-gray-700 italic mb-4">"{client.feedback}"</p>
                <h4 className="font-semibold">{client.name}</h4>
                {/* <p className="text-xs text-gray-500">{client.role}</p> */}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={prev}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            ❮
          </button>
          <button
            onClick={next}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientFeedback;
