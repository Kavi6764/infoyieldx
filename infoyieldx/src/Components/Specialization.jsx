import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Specialization = () => {
  const categories = [
    {
      title: "Enterprise Solutions",
      description: "Comprehensive Oracle-based enterprise solutions designed to streamline your business operations and maximize efficiency across all departments.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      features: [
        "Oracle EBS implementation & customization",
        "Database performance optimization",
        "System integration & migration",
        "24/7 technical support"
      ]
    },
    {
      title: "Digital Transformation",
      description: "Transform your business with modern web and mobile applications that enhance customer experience and operational efficiency.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
      features: [
        "Custom web application development",
        "Mobile app development",
        "Cloud-based solutions",
        "Digital workflow automation"
      ],
      reversed: true
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Specialized Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Advanced services tailored to meet your specific business needs and challenges in today's competitive market.
          </motion.p>
        </div>

        <div className="flex flex-col gap-16">
          {categories.map((category, index) => {
            const isReversed = category.reversed;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row justify-evenly items-center gap-10  ${
    isReversed ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className='md:w-[40vw] '> 
                  <h3 className="text-3xl font-bold mb-4">{category.title}</h3>
                  <p className="text-lg text-muted-foreground font-medium mb-6">{category.description}</p>
                  <ul className="space-y-2 list-disc list-inside text-base text-gray-700">
                    {category.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <motion.img
                  src={category.image}
                  alt={category.title}
                  className="w-[450px] h-auto rounded-lg shadow-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    
    </section>
  );
};

export default Specialization;
