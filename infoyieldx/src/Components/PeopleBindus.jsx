import React, { useState } from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Kaviarasu S",
    role: "Founder & CEO",
    bio: "Visionary leader with 10+ years of experience in full-stack development and digital innovation.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ananya Rao",
    role: "CTO",
    bio: "Heads tech strategy, specializing in cloud architecture and system scalability.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Arjun Mehta",
    role: "Product Manager",
    bio: "Drives product vision and ensures timely delivery aligned with user needs.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Kapoor",
    role: "UI/UX Designer",
    bio: "Designs intuitive interfaces with a focus on accessibility and user delight.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Sneha Kapoor",
    role: "UI/UX Designer",
    bio: "Designs intuitive interfaces with a focus on accessibility and user delight.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const PeopleBehindUs = () => {
      const [showAll ,setShowAll] = useState(false)
      const ShowTeam = showAll ? team : team.slice(0,4)

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">People Behind Us</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {ShowTeam.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group bg-white rounded-xl shadow-md p-6 text-center"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{person.name}</h3>
              <p className="text-gray-500">{person.role}</p>

              {/* Hover Bio Popup */}
              <div className="absolute z-10 bottom-[100%] left-1/2 transform -translate-x-1/2 w-64 p-4 bg-white text-sm text-gray-700 shadow-xl border rounded-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
                {person.bio}
              </div>
            </motion.div>
          ))}
        </div>
        <div onClick={()=>setShowAll(!showAll)} className="flex justify-center py-8  transition-all duration-300 ">
          <button className="border px-4 py-2 bg-black text-white rounded-lg">{showAll ? "View Less" :"View More"}</button>
        </div>
      </div>
    </section>
  );
};

export default PeopleBehindUs;
