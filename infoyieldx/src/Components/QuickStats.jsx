// components/Employee/QuickStats.tsx
import React from "react";
import { Clock, CheckCircle, Calendar, Award, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Hours This Week",
    value: "38.5",
    subText: "+2h from last week",
    subIcon: <TrendingUp className="h-3 w-3 mr-1" />,
    subColor: "text-green-600",
    icon: <Clock className="h-6 w-6 text-blue-600" />,
    iconBg: "bg-blue-100",
  },
  {
    label: "Tasks Completed",
    value: "12",
    subText: "This week",
    subIcon: <CheckCircle className="h-3 w-3 mr-1" />,
    subColor: "text-green-600",
    icon: <CheckCircle className="h-6 w-6 text-green-600" />,
    iconBg: "bg-green-100",
  },
  {
    label: "PTO Balance",
    value: "18.5",
    subText: "Days remaining",
    subIcon: <Calendar className="h-3 w-3 mr-1" />,
    subColor: "text-gray-600",
    icon: <Calendar className="h-6 w-6 text-purple-600" />,
    iconBg: "bg-purple-100",
  },
  {
    label: "Performance",
    value: "92%",
    subText: "Above average",
    subIcon: <Award className="h-3 w-3 mr-1" />,
    subColor: "text-green-600",
    icon: <Award className="h-6 w-6 text-yellow-600" />,
    iconBg: "bg-yellow-100",
  },
];

const QuickStats = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`${stat.subColor} text-sm flex items-center mt-1`}>
                  {stat.subIcon}
                  {stat.subText}
                </p>
              </div>
              <div className={`${stat.iconBg} p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;
