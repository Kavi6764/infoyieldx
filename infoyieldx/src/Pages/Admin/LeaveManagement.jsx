import React, { useEffect, useState, useContext } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Appcontext } from '../../Context/Context';

const statusConfig = {
  pending: { color: 'text-yellow-800 bg-yellow-100', icon: Clock },
  approved: { color: 'text-green-800 bg-green-100', icon: CheckCircle },
  rejected: { color: 'text-red-800 bg-red-100', icon: XCircle },
};

const LeaveManagement = () => {
  const { hrToken } = useContext(Appcontext);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [regularizations, setRegularizations] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedRegularization, setSelectedRegularization] = useState();
  const [loadingId, setLoadingId] = useState(null);
  const [filterPendingOnly, setFilterPendingOnly] = useState(false);

  useEffect(() => {
    fetchData();
    fetchRegularizations();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leave/get-leaves");
      const data = res.data;
      const formatted = data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((leave) => ({
          id: leave._id,
          employeeName: `${leave.employee.firstname} ${leave.employee.lastname}`,
          type: leave.leaveType,
          startDate: leave.fromDate.slice(0, 10),
          endDate: leave.toDate.slice(0, 10),
          status: leave.status?.toLowerCase() || "pending",
          edited: leave.edited || false,
          reason: leave.reason,
          image: leave.employee.avatar.startsWith("http")
            ? leave.employee.avatar
            : `http://${leave.employee.avatar}`,
          leaveBalance: leave.employee.leaveBalance,
        }));
      setLeaveRequests(formatted);
    } catch (err) {
      console.error("Error fetching leaves", err);
    }
  };

  const fetchRegularizations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance/get-regularizations");
      const formatted = res.data.requests.map((req) => ({
        ...req,
        status: req.status.toLowerCase(),
      }));
      setRegularizations(formatted)
    } catch (err) {
      console.error("Failed to fetch regularizations", err);
    }
  };

  const handleStatusChange = async (leaveId, newStatus) => {
    const current = leaveRequests.find((leave) => leave.id === leaveId);
    const wasFinal = current.status === 'approved' || current.status === 'rejected';
    const isEditing = wasFinal && current.status !== newStatus;

    setLoadingId(leaveId);
    try {
      await axios.patch(`http://localhost:5000/api/leave/${leaveId}/status`, {
        status: newStatus,
        edited: isEditing,
      });
      toast.success(`Leave ${isEditing ? "edited to" : ""} ${newStatus} successfully!`);
      fetchData();
      setSelectedEmployee(null);
    } catch (err) {
      toast.error("Failed to update leave status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRegularizationAction = async (action) => {
    try {
      await axios.put(
        `http://localhost:5000/api/attendance/regularizations/${selectedRegularization._id}`,
        {
          action,
          adminId: hrToken,
        }
      );
      toast.success(`Request ${action}d`);
      fetchRegularizations();
      setSelectedRegularization(null);
    } catch (err) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="space-y-4 py-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Leave Management</h1>
      <p>Manage employee leaves and regularization requests</p>

      <div className="flex justify-end">
        <button
          onClick={() => setFilterPendingOnly(!filterPendingOnly)}
          className="mb-4 text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          {filterPendingOnly ? "Show All" : "Show Pending Only"}
        </button>
      </div>

      {/* Leave Requests */}
      <div className="flex flex-col gap-4">
        {leaveRequests
          .filter((req) => !filterPendingOnly || req.status === "pending")
          .map((request) => {
            const config = statusConfig[request.status];
            const StatusIcon = config.icon;

            return (
              <div
                key={request.id}
                onClick={() => setSelectedEmployee(request)}
                className="border rounded-lg p-6 shadow hover:shadow-md cursor-pointer"
              >
                <div className="flex gap-5">
                  <img
                    src={request.image}
                    alt={request.employeeName}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{request.employeeName}</h3>
                    <p className="text-sm text-gray-600">{request.type}</p>
                    <p className="text-sm text-gray-500">
                      {request.startDate} - {request.endDate}
                    </p>
                    <p className="text-sm text-gray-600">{request.reason}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.color}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {request.status}
                      {request.edited && <span className="ml-1 text-[10px] text-gray-500">(edited)</span>}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEmployee(request);
                      }}
                      className="text-blue-600 text-sm underline hover:text-blue-800"
                    >
                      {request.status === "pending" ? "Action" : "Edit Status"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Regularization Requests */}
      <h2 className="text-xl font-semibold mt-8">Regularization Requests</h2>
      <div className="flex flex-col gap-4">
        {regularizations.map((req) => {
          const config = statusConfig[req.status.toLowerCase()];
          const StatusIcon = config.icon;
          return (
            <div
              key={req._id}
              onClick={() => setSelectedRegularization(req)}
              className="border p-4 rounded shadow hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    req.employeeId.avatar.startsWith("http")
                      ? req.employeeId.avatar
                      : `http://${req.employeeId.avatar}`
                  }
                  className="w-12 h-12 rounded-full object-cover border"
                  alt="avatar"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">
                    {req.employeeId.firstname} {req.employeeId.lastname}
                  </h4>
                  <p className="text-sm text-gray-600">Date: {req.date}</p>
                  <p className="text-sm text-gray-600">Request: {req.requestedStatus}</p>
                  <p className="text-sm text-gray-500">{req.reason}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.color}`}>
                  <StatusIcon className="w-4 h-4 mr-1" />
                  {req.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leave Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <button onClick={() => setSelectedEmployee(null)} className="absolute top-2 right-2 text-lg">
              &times;
            </button>
            <h2 className="text-lg font-semibold">{selectedEmployee.employeeName}'s Leave Summary</h2>
            <p><strong>From:</strong> {selectedEmployee.startDate}</p>
            <p><strong>To:</strong> {selectedEmployee.endDate}</p>
            <p><strong>Total Days:</strong> {
              (new Date(selectedEmployee.endDate) - new Date(selectedEmployee.startDate)) / (1000 * 60 * 60 * 24) + 1
            }</p>
            <p><strong>Type:</strong> {selectedEmployee.type}</p>
            <p><strong>Reason:</strong> {selectedEmployee.reason}</p>
            <div className="mt-3">
              <strong>Leave Balance:</strong>
              <ul className="list-disc list-inside">
                {Object.entries(selectedEmployee.leaveBalance).map(([type, count]) => (
                  <li key={type}>{type}: {count}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Change Status</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(selectedEmployee.id, "approved")}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(selectedEmployee.id, "rejected")}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regularization Modal */}
      {selectedRegularization && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <button onClick={() => setSelectedRegularization(null)} className="absolute top-2 right-2 text-lg">
              &times;
            </button>
            <h2 className="text-lg font-semibold">
              {selectedRegularization.employeeId.firstname} {selectedRegularization.employeeId.lastname}'s Regularization
            </h2>
            <p><strong>Date:</strong> {selectedRegularization.date}</p>
            <p><strong>Requested Status:</strong> {selectedRegularization.requestedStatus}</p>
            <p><strong>Reason:</strong> {selectedRegularization.reason}</p>
            <p><strong>Status:</strong> {selectedRegularization.status}</p>
            {selectedRegularization.status === "pending" && (
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleRegularizationAction("Approve")} className="bg-green-600 text-white px-4 py-1 rounded">Approve</button>
                <button onClick={() => handleRegularizationAction("Reject")} className="bg-red-600 text-white px-4 py-1 rounded">Reject</button>
              </div>
             )} 
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LeaveManagement;
