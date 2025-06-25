import React from "react";
import { Bell, Lock, User, Settings, Shield } from "lucide-react";
const AdminSettings = () => {
  return (
    <div className="max-w-6xl mx-auto max-md:w-screen py-10">
        <h2 className="text-2xl font-semibold text-gray-800 pb-10">Settings</h2>

        <div className="grid gap-4 md:grid-cols-2 px-4">
          {/* Profile Settings */}
          <div className="border p-4 rounded hover:shadow">
            <div className="flex items-center gap-3 mb-2">
              <User className="text-blue-600" />
              <h3 className="font-semibold">Profile Settings</h3>
            </div>
            <p className="text-sm text-gray-600">
              Manage your profile, update your information, and change your
              avatar.
            </p>
          </div>

          {/* Security Settings */}
          <div className="border p-4 rounded hover:shadow">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="text-red-600" />
              <h3 className="font-semibold">Security</h3>
            </div>
            <p className="text-sm text-gray-600">
              Change your password, enable 2FA, and manage login sessions.
            </p>
          </div>

          {/* Notification Settings */}
          <div className="border p-4 rounded hover:shadow">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="text-yellow-600" />
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <p className="text-sm text-gray-600">
              Control how you get notified about leave requests, updates, and
              alerts.
            </p>
          </div>

          {/* Permissions */}
          <div className="border p-4 rounded hover:shadow">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="text-purple-600" />
              <h3 className="font-semibold">Permissions</h3>
            </div>
            <p className="text-sm text-gray-600">
              Assign roles, manage user access, and configure team permissions.
            </p>
          </div>
        </div>
      </div>
    
  );
};

export default AdminSettings;
