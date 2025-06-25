import { createContext, useEffect, useState } from "react";

export const Appcontext = createContext();

const AppContextProvider = (props) => {
  const [showLayout, setShowLayout] = useState(true);
   const [selectedRole, setSelectedRole] = useState(null);
   const [hrUID,setHRUID] = useState("")
   const [hrtoken,setHrtoken] = useState("")
  const value = {
    showLayout,
    setShowLayout,
    selectedRole,
    setSelectedRole,
    hrUID,
    setHRUID,
    hrtoken,
    setHrtoken
  };

useEffect(() => {
     localStorage.setItem("hrtoken",hrtoken)
}, [hrUID]);

  return (
    <Appcontext.Provider value={value}>{props.children}</Appcontext.Provider>
  );
};
export default AppContextProvider;
