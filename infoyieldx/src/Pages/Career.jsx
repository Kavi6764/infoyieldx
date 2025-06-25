import React from 'react'
import CareerHeader from '../Components/CareerHeader'
import JobListings from '../Components/JobListing'
import Benefits from '../Components/Benefits'

const Career = () => {
  return (
    <div className='bg-bg-[#F4ecfe]/20'>
        <CareerHeader/>
        <JobListings/>
        <Benefits/>
    </div>
  )
}

export default Career