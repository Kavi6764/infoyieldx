import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Users, BarChart3, Clock, Calendar, FileText, Settings, Building, Menu, X
} from 'lucide-react';
import { GoSignOut } from 'react-icons/go';
import { Appcontext } from '../Context/Context';
import { toast } from 'react-toastify';

const menuItems = [
  { label: 'Dashboard', icon: BarChart3, path: '' },
  { label: 'Employees', icon: Users, path: '/admin/employees' },
//   { label: 'Attendance', icon: Clock, path: '/admin/attendance' },
  { label: 'Leave', icon: Calendar, path: '/admin/leave' },
  { label: 'Projects', icon: Building, path: '/admin/projects' },
   { label: 'Blogs', icon: Settings, path: '/admin/add-blogs' },
  { label: 'Reports', icon: FileText, path: '/admin/reports' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
  
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const {setShowLayout} = useContext(Appcontext)
   const navigate = useNavigate();
  const toggleSidebar = () => {
    if (window.innerWidth < 768) setMobileOpen(!mobileOpen);
    else setCollapsed(!collapsed);
  };

  const HandleSignOut =async () =>{
    try {
    localStorage.removeItem("hrtoken")
    setShowLayout(true); 
    navigate("/")
    toast("Signed out successfully");
  } catch (error) {
    console.error("Sign out error:", error.message);
  }

}

  return (
    <>
      {/* Toggle Button on Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-white bg-slate-800 p-2 rounded">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0  bg-slate-900 text-white flex flex-col justify-evenly transition-all duration-300
          ${collapsed ? "w-16" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="p-4 border-b border-slate-700 flex justify-between items-center ">
          {!collapsed && <h1 className="text-xl font-bold text-blue-400">Infoyieldx</h1>}
          <button onClick={toggleSidebar} className="p-1 rounded hover:bg-slate-800 hidden md:block">
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-2 ">
          <ul className="space-y-2">
            {menuItems.map(({ label, icon: Icon, path }) => (
              <li key={label}>
                <NavLink
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 text-slate-300"
                    }`
                  }
                >
                  <Icon size={20} />
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className='p-2'>
             <button className='flex items-center  gap-3 bg-blue-600 rounded-lg p-3 w-full' onClick={HandleSignOut} >
            <GoSignOut/>
             {!collapsed && <p>Sign out</p>}
        </button>
        </div>
       
       
      </div>
    </>
  );
}
