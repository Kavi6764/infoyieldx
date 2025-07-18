import { createContext, useEffect, useState } from "react";

export const Appcontext = createContext();

const AppContextProvider = (props) => {
  const [showLayout, setShowLayout] = useState(true);
   const [selectedRole, setSelectedRole] = useState(null);
   const [hrUID,setHRUID] = useState("")
   const [hrtoken,setHrtoken] = useState("")
   const [emptoken,setEmptoken] = useState("");
   const[empId,setEmpId] =useState("");

  const value = {
    showLayout,
    setShowLayout,
    selectedRole,
    setSelectedRole,
    hrUID,
    setHRUID,
    hrtoken,
    setHrtoken,
    setEmptoken,
    emptoken,empId,
    setEmpId
  };

useEffect(() => {
  if(hrtoken){
     localStorage.setItem("hrtoken",hrtoken)}
    if(emptoken){
       localStorage.setItem('empToken',emptoken)
       console.log("EmpID,",empId)
    }
}, [hrtoken,emptoken]);

useEffect(()=>{
           if(empId){
            localStorage.setItem("empId",empId)
            console.log("EmoID",empId)
           }
},[empId])
  return (
    <Appcontext.Provider value={value}>{props.children}</Appcontext.Provider>
  );
};
export default AppContextProvider;
