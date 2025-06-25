import React, { useContext } from 'react'
import HrLogin from '../Components/HRLogin'
import EmployeeLogin from '../Components/EmployeeLogin'
import { Appcontext } from '../Context/Context'

const Login = () => {
    const {selectedRole} = useContext(Appcontext)
  return (
    
 <div className="min-h-screen flex items-center justify-center bg-slate-100">
      {selectedRole === "HR" && <HrLogin />}
      {selectedRole === "Employee" && <EmployeeLogin />}
    </div>
    
  )
}

export default Login