import React from "react";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="flex flex-row min-h-screen h-full">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
