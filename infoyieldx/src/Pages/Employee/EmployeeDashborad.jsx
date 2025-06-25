import { useState } from "react";

import ProfileCard from "../../Components/ProfileCard";
import TodaysSchedule from "../../Components/TodaysSchedule";

import EmployeeHeader from "../../Components/EmlpyeeHeader";
import QuickStats from "../../Components/QuickStats";
import ActivityAndGoals from "../../Components/ActivityandGoals";


const EmployeeDashboard = () => {


  return (
    <div className="min-h-screen container mx-auto bg-gray-50">
      <EmployeeHeader/>

      <div className="p-6 space-y-6">
       <QuickStats/>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileCard/>
          <TodaysSchedule />
        </div>
   {/* <ActivityAndGoals/> */}
        
      </div>
    </div>
  );
};

export default EmployeeDashboard;
