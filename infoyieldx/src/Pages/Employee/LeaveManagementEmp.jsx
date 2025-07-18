import { useEffect, useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import {toast} from 'react-toastify'



export const LeaveManagementEmp = () => {
  const [leaveBalance,setleaveBalance] =useState({
    sick: { used: 0, total: 10 },
  casual: { used: 0, total: 20 },
  earned: { used: 0, total: 15 },
  unpaid: { used: 0, total: 0 }
  })
  const [leaves,setLeaves]  = useState([])
  const [showRequestForm, setShowRequestForm] = useState(false);
  const empId = localStorage.getItem("empId");
  const [formData, setFormData] = useState({
    employeeId: empId,
    leaveType: 'sick',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leave/apply", {...formData,
        leaveType:formData.leaveType.toLowerCase()
      });
       toast.success("Leave submitted successfully");
      setShowRequestForm(false);
      fetchLeaves()
      setFormData({
        employeeId: empId,
        leaveType: 'sick',
        fromDate: '',
        toDate: '',
        reason: ''
      });

    } catch (err) {
      console.error('Submission failed:', err.response?.data?.error || err.message);
      alert("Error: " + (err.response?.data?.error || "Something went wrong"));
    }
  };
  const fetchLeaves = async () =>{
    try{
    const res =await axios.get(`http://localhost:5000/api/leave/my-leaves/${empId}`)
    console.log("Leavs:",res.data.leaves)
        const leaves = res.data.leaves.map((leave) => ({
        id: leave._id,
        employee: `${leave.employee.firstname} ${leave.employee.lastname}`,
        type: leave.leaveType,
        startDate: leave.fromDate,
        endDate: leave.toDate,
        days: leave.totalDays,
        status: leave.status,
        reason: leave.reason
      }));
      setLeaves(leaves)
      if (res.data.leaves.length > 0) {
  const used = res.data.leaves[0].employee.leaveBalance || {};
  setleaveBalance((prev) => ({
    sick: { ...prev.sick, used: used.sick || 0 },
    casual: { ...prev.casual, used: used.casual || 0 },
    earned: { ...prev.earned, used: used.earned || 0 },
    unpaid: { ...prev.unpaid, used: used.unpaid || 0 }
  }));
    }}catch (err) {
      console.error("Error fetching leaves:", err.message);
      toast.error("Failed to load leave data");
  }}
  useEffect(()=>{
       fetchLeaves()
  },[])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-orange-600 bg-orange-50';
    }
  };

  return (
    <div className="space-y-6 p-6 max-md:w-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-3 md:justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 max-md:text-center">Leave Management</h1>
          <p className="text-gray-600 max-md:text-center mt-1">Manage your time off requests</p>
        </div>
        <button
          onClick={() => setShowRequestForm(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Request Leave
        </button>
      </div>

      {/* Leave Balances */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6">
        {Object.entries(leaveBalance).map(([type, balance]) => (
          <div key={type} className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="text-sm text-gray-600 capitalize mb-2">{type} Leave</div>
            <div className="flex items-center justify-between text-gray-900 text-2xl font-bold mb-2">
              <span>{balance.total - balance.used}</span>
              <span className="text-sm text-gray-500">/ {balance.total} days</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(balance.used / balance.total) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">{balance.used} days used</p>
          </div>
        ))}
      </div>

      {/* Form */}
      {showRequestForm && (
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-bold mb-4">New Leave Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Leave Type</label>
                <select
                  value={formData.leaveType}
                  onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="sick">Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                  <option value="earned">Earned Leave</option>
                  <option value="unpaid">Unpaid Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={formData.fromDate}
                  onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={formData.toDate}
                  onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter reason..."
                required
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Submit
              </button>
              <button
                type="button"
                className="border border-gray-300 px-4 py-2 rounded-md"
                onClick={() => setShowRequestForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
        <div className="p-4 flex items-center gap-2 border-b">
          <Clock className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-semibold">Recent Leave Requests</h2>
        </div>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b bg-gray-100 text-gray-700">
              {/* <th className="p-3">Employee</th> */}
              <th className="p-3">Type</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Days</th>
              <th className="p-3">Status</th>
              <th className="p-3">Reason</th>
            </tr>
          </thead>
          <tbody> 
            {leaves.map((request) => (
              <tr key={request.id} className="border-b hover:bg-gray-50">
                {/* <td className="p-3 font-medium text-gray-900">{request.employee}</td> */}
                <td className="p-3 capitalize">{request.type}</td>
                <td className="p-3">
                  {new Date(request.startDate).toLocaleDateString()} -{' '}
                  {new Date(request.endDate).toLocaleDateString()}
                </td>
                <td className="p-3">{request.days}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>
                </td>
                <td className="p-3">{request.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
