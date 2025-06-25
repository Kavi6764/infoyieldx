import React from 'react'
import EmployeeSidebar from './EmployeeSidebar'
import { Outlet } from 'react-router-dom'

const EmployeePanel = () => {
  return (
    <div className='flex min-h-screen h-full overflow-hidden'>
      <EmployeeSidebar/>
      <div className='flex-1'>
          <Outlet/>
      </div>
    </div>
  )
}

export default EmployeePanel