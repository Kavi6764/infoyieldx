import React from 'react'
import OurservieHeader from '../Components/OurservieHeader'
import OurCoreService from '../Components/OurCoreService'
import Specialization from '../Components/Specialization'
import FreeConsultancy from '../Components/FreeConsultancy'
import { Outlet } from 'react-router-dom'


const Ourservices = () => {
  return(
    <div className='bg-[#F4ecfe]/20'>
      <OurservieHeader/>
      <OurCoreService/>
      <Specialization/>
      <FreeConsultancy/>
      
    </div>
  )}

export default Ourservices