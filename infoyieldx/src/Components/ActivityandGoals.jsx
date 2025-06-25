// components/Employee/ActivityAndGoals.tsx
import React from "react";
import { Award, FileText, GitPullRequest, Settings } from "lucide-react";

const recentActivities = [
  {
    id: 1,
    action: "Submitted project report",
    time: "2 hours ago",
    icon: FileText,
    color: "blue",
  },
  {
    id: 2,
    action: "Merged PR #42",
    time: "Yesterday",
    icon: GitPullRequest,
    color: "green",
  },
  {
    id: 3,
    action: "Updated profile settings",
    time: "2 days ago",
    icon: Settings,
    color: "purple",
  },
];

const ActivityAndGoals = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-500">Your latest actions and updates</p>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className={`p-2 rounded-full bg-${activity.color}-100`}>
                <activity.icon className={`h-4 w-4 text-${activity.color}-600`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Goals */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Performance Goals</h2>
          <p className="text-sm text-gray-500">Track your progress towards annual goals</p>
        </div>

        {[
          { label: "Code Reviews", value: 85, max: 100 },
          { label: "Training Modules", value: 12, max: 15 },
          { label: "Project Deliverables", value: 18, max: 20 },
        ].map((goal, idx) => {
          const percent = Math.round((goal.value / goal.max) * 100);
          return (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900">{goal.label}</span>
                <span className="text-sm text-gray-600">
                  {goal.value}/{goal.max}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}

        <button className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
          <Award className="h-4 w-4" />
          View All Goals
        </button>
      </div>
    </div>
  );
};

export default ActivityAndGoals;
