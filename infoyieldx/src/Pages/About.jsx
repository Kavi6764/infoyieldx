import React from "react";
import Aboutus from "../Components/Aboutus";
import Ourvision from "../Components/Ourvision";
import OurJourney from "../Components/Ourjourney";
import PeopleBehindUs from "../Components/PeopleBindus";
import ClientFeedback from "../Components/ClientFeedback";
import CompanyCulture from "../Components/CompanyCulture";

const About = () => {
  return (
    <div className="bg-[#F4ecfe]/20">
      <Aboutus />
      <OurJourney />
      <CompanyCulture/>
      <Ourvision />
      <PeopleBehindUs />
      <ClientFeedback />
    </div>
  );
};

export default About;
