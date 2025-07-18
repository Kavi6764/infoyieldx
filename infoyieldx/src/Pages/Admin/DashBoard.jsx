import {
  BarChart3,
  Users,
  Clock,
  Calendar,
  TrendingUp,
  Settings,
  UserCircle,
} from "lucide-react";
import MyProjectsCart from "../../Components/MyProjectsCart";

const cards = [
  {
    title: "Total Employees",
    value: 120,
    icon: Users,
    iconColor: "bg-blue-100 text-blue-600",
  },
  {
    title: "Today's Attendance",
    value: 110,
    icon: Clock,
    iconColor: "bg-green-100 text-green-600",
  },
  {
    title: "Leave Requests",
    value: 5,
    icon: Calendar,
    iconColor: "bg-yellow-100 text-yellow-600",
  },

];

const recentProjects = [
  {
    id: 1,
    title: "HR Management System",
    description:
      "Built a full-stack HR portal for tracking leaves, payroll, and attendance.",
    technologies: ["React", "Node.js", "MongoDB"],
    status: "Completed",
  },
  {
    id: 2,
    title: "Mobile App for Sales",
    description:
      "A cross-platform app to manage leads and sales activity on the go.",
    technologies: ["React Native", "Firebase"],
    status: "In Progress",
  },
  {
    id: 3,
    title: "E-commerce Dashboard",
    description: "Admin dashboard to monitor product sales, orders, and users.",
    technologies: ["Next.js", "PostgreSQL"],
    status: "Completed",
  },
];



const DashBoard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto py-5 md:w-full w-screen min-h-screen">
      <div className="flex items-center justify-between p-2">
        <div>
          <h1 className="text-3xl  py-2 font-bold text-slate-800">
            Admin Dashboard
          </h1>
          <p>Welcome back! Here's what's happening at Infoyieldx today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <UserCircle className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {cards.map(({ title, value, icon: Icon, iconColor }, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <h2 className="text-gray-600 text-sm">{title}</h2>
              <p className="text-2xl font-semibold">{value}</p>
            </div>
            <div className={`p-2 rounded-full ${iconColor}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid  grid-cols-1 gap-6 mx-auto">
        {/* Recent Projects */}
        <MyProjectsCart data={recentProjects} />

        {/* Recent Activity
        <div className="bg-white border mx-auto md:w-full rounded-lg shadow-sm p-5 ">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <p className="text-sm text-gray-500 mb-4">
            Latest employee updates and actions
          </p>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.name}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border mx-auto rounded-lg shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          <button className="text-left px-4 py-3 border rounded hover:bg-gray-50 flex items-center gap-3">
            <Users className="w-4 h-4 text-gray-600" />
            Add New Employee
          </button>
          <button className="text-left px-4 py-3 border rounded hover:bg-gray-50 flex items-center gap-3">
            <Clock className="w-4 h-4 text-gray-600" />
            Leave
          </button>
          <button className="text-left px-4 py-3 border rounded hover:bg-gray-50 flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-gray-600" />
             Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
