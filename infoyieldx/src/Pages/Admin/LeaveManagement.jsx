import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

  const leaveRequests = [
  {
    id: 1,
    employeeName: 'John Doe',
    type: 'Sick Leave',
    startDate: '2025-06-15',
    endDate: '2025-06-17',
    status: 'pending',
    reason: 'Flu and rest',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    employeeName: 'Alice Smith',
    type: 'Annual Leave',
    startDate: '2025-06-20',
    endDate: '2025-06-25',
    status: 'approved',
    reason: 'Family vacation',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    employeeName: 'Bob Johnson',
    type: 'Personal Leave',
    startDate: '2025-06-10',
    endDate: '2025-06-11',
    status: 'rejected',
    reason: 'Unplanned time off',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];


const employeeLeaves = {
  "John Doe": {
    totalAllowed: 30,
    taken: {
      "Sick Leave": 5,
      "Annual Leave": 10,
      "Personal Leave": 2,
    },
  },
  "Alice Smith": {
    totalAllowed: 25,
    taken: {
      "Annual Leave": 8,
    },
  },
  "Bob Johnson": {
    totalAllowed: 20,
    taken: {
      "Personal Leave": 4,
      "Sick Leave": 1,
    },
  },
};

const statusConfig = {
  pending: { color: 'text-yellow-800 bg-yellow-100', icon: Clock },
  approved: { color: 'text-green-800 bg-green-100', icon: CheckCircle },
  rejected: { color: 'text-red-800 bg-red-100', icon: XCircle },
};

const LeaveManagement = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleCardClick = (employeeName) => {
    const record = employeeLeaves[employeeName];
    if (record) {
      setSelectedEmployee({ name: employeeName, ...record });
    }
  };

  const closeModal = () => setSelectedEmployee(null);

  return (
    <div className="space-y-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Leave Management</h1>
      <p className="text-gray-700">Manage your time off requests</p>

      {/* Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative animate-fadeIn">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-2">{selectedEmployee.name}'s Leave Summary</h2>
            <p className="text-sm text-gray-700">
              <strong>Total Allowed:</strong> {selectedEmployee.totalAllowed}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Total Taken:</strong>{" "}
              {Object.values(selectedEmployee.taken).reduce((sum, val) => sum + val, 0)}
            </p>
            <div className="mt-2 text-sm">
              <strong>Category Breakdown:</strong>
              <ul className="list-disc list-inside mt-1">
                {Object.entries(selectedEmployee.taken).map(([type, count]) => (
                  <li key={type}>
                    {type}: {count} days
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Leave Requests */}
      <div className="flex flex-col gap-4">
        {leaveRequests.map((request) => {
          const config = statusConfig[request.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={request.id}
              onClick={() => handleCardClick(request.employeeName)}
              className="border rounded-lg p-6 shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="flex justify-between md:items-center items-start gap-5">
                <img
                  src={request.image}
                  alt={request.employeeName}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{request.employeeName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{request.type}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {request.startDate} - {request.endDate}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{request.reason}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.color} mb-2`}>
                    <StatusIcon className="w-4 h-4 mr-1" />
                    {request.status}
                  </span>
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-50 text-sm">
                        Approve
                      </button>
                      <button className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 text-sm">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaveManagement;
