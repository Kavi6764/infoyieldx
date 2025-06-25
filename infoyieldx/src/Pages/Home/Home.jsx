import React from "react";
import Hero from "../../Components/Hero";
import Aboutus from "../../Components/Aboutus";
import OurKeyService from "../../Components/OurKeyService";
import Ourvision from "../../Components/Ourvision";
import GetinTouch from "../../Components/GetinTouch";
import TrustedCompanies from "../../Components/Trustedompanies";
import "./Home.css";
import Desgin from "../../Components/Desgin";

const Home = () => {
  return (
    <div className="bg-[#F4ecfe]/20">
     
      <Hero />
      <Aboutus />
      <OurKeyService />
      <GetinTouch />
      <TrustedCompanies />
    </div>
  );
};

export default Home;
