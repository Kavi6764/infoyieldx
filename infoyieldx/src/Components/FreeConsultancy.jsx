import { ArrowRight } from "lucide-react";
import React from "react";

const FreeConsultancy = () => {
  return (
    <div className="my-16 text-center max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-black via-gray-950 to-slate-900 rounded-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Get Started </h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Transform your business today with our premium services. Contact us
          for a free consultation and discover how we can help you achieve your
          goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="contact" className="flex items-center">
                 <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Get to Free Consulation
          </button>
      
            </a>
         
          <a href="portfolio">
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View portfolio
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FreeConsultancy;
