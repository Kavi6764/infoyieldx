import React from "react";
import { IoCalculatorOutline } from "react-icons/io5";
import { MdOutlineCode } from "react-icons/md";
import { CiMobile3 } from "react-icons/ci";
import { FaServer, FaDatabase ,FaBullhorn} from "react-icons/fa";
import { BsCheck2Circle } from "react-icons/bs";
import { motion } from "framer-motion";

const OurCoreService = () => {
  const services = [
    {
      title: "Accounting Services",
      description:
        "Complete financial and accounting solutions for your business",
      features: [
        "Bookkeeping & financial records",
        "Tax preparation & filing",
        "Financial reporting & analysis",
        "Payroll management",
        "Compliance & audit support",
      ],

      icon: <IoCalculatorOutline className="w-8 h-8 text-primary" />,
    },
    {
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies",
      features: [
        "Responsive design",
        "Fast loading times",
        "SEO optimized",
        "Modern frameworks",
        "Security focused",
      ],
   
      icon: <MdOutlineCode className="w-8 h-8 text-primary" />,
    },
    {
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android",
      features: [
        "iOS & Android development",
        "Cross-platform solutions",
        "UI/UX design",
        "App store optimization",
        "Maintenance & updates",
      ],
     
      icon: <CiMobile3 className="w-8 h-8 text-primary" />,
    },
    {
    title: "Digital Marketing",
    description:
      "Boost your online presence with tailored digital marketing strategies",
    features: [
      "Search engine optimization (SEO)",
      "Social media marketing",
      "Content marketing",
      "Google Ads",
      "Email marketing campaigns",
    ],
    icon: <FaBullhorn className="w-8 h-8 text-primary" />,
  },
    {
      title: "Oracle Database Development",
      description:
        "Oracle database design, development, and optimization services",
      features: [
        "Database design",
        "Performance tuning",
        "MYSQL development",
        "Data migration",
        "Backup & recovery solutions",
        "Data Upgration"
      ],
 
      icon: <FaDatabase className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <div className="bg-slate-50 py-16" id='core-service'>
      <div className="mx-auto max-w-7xl">
        <h1 className="md:text-4xl text-3xl font-bold text-center pb-10">Our Key Cores</h1>
        <div className="grid md:grid-cols-3 grid-cols-1 items-start gap-6 p-3 ">
          {services.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col gap-8 p-6 md:p-10 border rounded-xl shadow bg-white hover:translate-y-2 transition-all duration-200 ease-in"
              key={index}
            >
              <div className="text-center flex flex-col gap-8 md:h-[25vh]">
                <div className="mx-auto  w-16 h-16 box-content md:p-4 p-1 rounded-lg bg-slate-200 flex items-center justify-center">
                  {service.icon}
                </div>
                <h2 className="font-semibold text-xl">{service.title}</h2>
                <p className="font-medium text-slate-700">
                  {service.description}
                </p>
              
              </div>

              <div className="space-y-2">
                {service.features.map((feature, i) => (
                  <div className="flex items-center gap-3" key={i}>
                    <BsCheck2Circle className="text-green-700 w-5 h-5" />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>

             <a href="Contact">  
              <div className="mt-4 p-3 border rounded-md text-center bg-black text-white hover:bg-gray-800 transition-all duration-300">
               Lets Talk
              </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurCoreService;
