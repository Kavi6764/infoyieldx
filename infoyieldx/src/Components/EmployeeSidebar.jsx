import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, UserCircle, Clock, FileText, CalendarDays, Menu, X
} from 'lucide-react';
import { GoSignOut } from 'react-icons/go';
import { Appcontext } from '../Context/Context';

const employeeMenu = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '' },
  { label: 'My Profile', icon: UserCircle, path: '/employee/profile' },
  { label: 'Attendance', icon: Clock, path: '/employee/attendance' },
  { label: 'My Tasks', icon: FileText, path: '/employee/tasks' },
  { label: 'Leave Management', icon: CalendarDays, path: '/employee/leave' },
];

export default function EmployeeSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setShowLayout } = useContext(Appcontext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    if (window.innerWidth < 768) setMobileOpen(!mobileOpen);
    else setCollapsed(!collapsed);
  };

  const handleSignOut = () => {
    localStorage.removeItem("empToken")
    setShowLayout(true);
    navigate('/');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-white bg-slate-800 p-2 rounded">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0  bg-slate-900 text-white flex flex-col justify-between transition-all duration-300
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          {!collapsed && <h1 className="text-xl font-bold text-blue-400">Employee</h1>}
          <button onClick={toggleSidebar} className="p-1 hidden md:block hover:bg-slate-800 rounded">
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-2 overflow-y-auto">
          <ul className="space-y-2">
            {employeeMenu.map(({ label, icon: Icon, path }) => (
              <li key={label}>
                <NavLink
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
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

        {/* Sign Out */}
        <div className="p-2">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 hover:bg-red-600 bg-red-500 rounded-lg p-3 w-full text-white"
          >
            <GoSignOut />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </>
  );
}
