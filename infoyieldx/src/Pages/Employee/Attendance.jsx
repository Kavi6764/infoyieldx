import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Appcontext } from "../../Context/Context";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Attendance = () => {
   const empId = localStorage.getItem("empId")

  // State for attendance records and pagination
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendancePage, setAttendancePage] = useState(1);
  const [attendanceTotal, setAttendanceTotal] = useState(0);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
  const [attendanceError, setAttendanceError] = useState(null);

  // State for regularization records and pagination
  const [regularizationRecords, setRegularizationRecords] = useState([]);
  const [regularizationPage, setRegularizationPage] = useState(1);
  const [regularizationTotal, setRegularizationTotal] = useState(0);
  const [isLoadingRegularizations, setIsLoadingRegularizations] = useState(false);
  const [regularizationError, setRegularizationError] = useState(null);

  // State for UI toggles and filters
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(["all"]);
  const [searchDate, setSearchDate] = useState("");
  const [showRegularizationForm, setShowRegularizationForm] = useState(false);

  // State for regularization form
  const [regularizationData, setRegularizationData] = useState({
    date: "",
    requestedStatus: "",
    reason: "",
  });

  const limit = 10; // Records per page

  // Summary data for cards and chart
  const summaryData = useMemo(
    () => ({
      totalWorkingDays: attendanceRecords.length,
      presentDays: attendanceRecords.filter((r) => r.status === "Present").length,
      absentDays: attendanceRecords.filter((r) => r.status === "Absent").length,
      lateArrivals: attendanceRecords.filter((r) => r.status === "Late").length,
    }),
    [attendanceRecords]
  );

  // Current date for display
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Fetch attendance records
  useEffect(() => {
    const fetchAttendance = async () => {
      if (!empId) return;
      setIsLoadingAttendance(true);
      setAttendanceError(null);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/attendance/employee/${empId}?page=${attendancePage}&limit=${limit}`
        );
        const formatted = res.data.records.map((record) => ({
          date: record.date,
          status: record.status,
          checkIn: record.markedAt
            ? new Date(record.markedAt).toTimeString().slice(0, 5)
            : "",
          checkOut: "", // Placeholder for future check-out support
          totalHours: "", // Placeholder for future total hours calculation
        }));
        setAttendanceRecords(formatted);
        setAttendanceTotal(res.data.total);
      } catch (err) {
        console.error(err);
        setAttendanceError("Failed to load attendance records");
        toast.error("Failed to load attendance records");
      } finally {
        setIsLoadingAttendance(false);
      }
    };

    fetchAttendance();
  }, [empId, attendancePage]);

  // Fetch regularization records
  useEffect(() => {
    const fetchRegularizations = async () => {
      if (!empId) return;
      setIsLoadingRegularizations(true);
      setRegularizationError(null);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/attendance/get-regularizations?employeeId=${empId}&page=${regularizationPage}&limit=${limit}`
        );
        setRegularizationRecords(res.data.requests);
        setRegularizationTotal(res.data.total);
      } catch (err) {
        console.error(err);
        setRegularizationError("Failed to load regularization requests");
        toast.error("Failed to load regularization requests");
      } finally {
        setIsLoadingRegularizations(false);
      }
    };

    fetchRegularizations();
  }, [empId, regularizationPage]);

  // Handle mark attendance
  // const handleMarkAttendance = async () => {
  //   const today = new Date().toISOString().split("T")[0];
  //   const alreadyMarked = attendanceRecords.some(
  //     (record) => record.date === today
  //   );
  //   if (alreadyMarked) {
  //     toast.error("You have already marked attendance for today.");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/attendance/entry",
  //       { employeeId: empId }
  //     );
  //     toast.info(res.data.message);
  //     setAttendanceRecords((prev) => [
  //       {
  //         date: today,
  //         checkIn: new Date().toTimeString().slice(0, 5),
  //         checkOut: "",
  //         totalHours: "",
  //         status: res.data.status,
  //       },
  //       ...prev,
  //     ]);
  //   } catch (err) {
  //     const msg = err.response?.data?.message || "Error marking attendance.";
  //     toast.error(msg);
  //   }
  // };
const handleMarkAttendance = async () => {
  if (!empId || !/^[0-9a-fA-F]{24}$/.test(empId)) {
    toast.error("Invalid employee ID");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  try {
    const resCheck = await axios.get(
      `http://localhost:5000/api/attendance/employee/${empId}?startDate=${today}&endDate=${today}`
    );
    console.log("Duplicate check response:", resCheck.data);
    const alreadyMarked = resCheck.data.records.some(
      (record) => record.date === today
    );
    if (alreadyMarked) {
      toast.error("You have already marked attendance for today.");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/attendance/entry",
      { employeeId: empId }
    );
    toast.info(res.data.message);
    setAttendanceRecords((prev) => [
      {
        date: today,
        checkIn: new Date().toTimeString().slice(0, 5),
        checkOut: "",
        totalHours: "",
        status: res.data.status,
      },
      ...prev,
    ]);
  } catch (err) {
    const msg =
      err.response?.data?.error === "Attendance already marked for today"
        ? "You have already marked attendance for today."
        : err.response?.data?.error || "Error marking attendance.";
    toast.error(msg);
    console.error("Mark attendance error:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });
  }
};
  // Handle regularization submission
  const handleSubmitRegularization = async () => {
    const { date, requestedStatus, reason } = regularizationData;
    if (!date || !requestedStatus || !reason) {
      toast.error("All fields are required.");
      return;
    }
    if (new Date(date) > new Date()) {
      toast.error("Cannot select future dates.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/attendance/regularizations",
        { employeeId: empId, date, requestedStatus, reason }
      );
      toast.success(res.data.message);
      setShowRegularizationForm(false);
      setRegularizationData({ date: "", requestedStatus: "", reason: "" });
      // Refresh regularization records
      const regRes = await axios.get(
        `http://localhost:5000/api/attendance/get-regularizations?employeeId=${empId}&page=1&limit=${limit}`
      );
      setRegularizationRecords(regRes.data.requests);
      setRegularizationTotal(regRes.data.total);
      setRegularizationPage(1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit request.");
    }
  };

  // Filter records
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesStatus =
      selectedStatus.includes("all") ||
      selectedStatus.includes(record.status.toLowerCase());
    const matchesDate = searchDate ? record.date === searchDate : true;
    return matchesStatus && matchesDate;
  });

  // Handle status filter change
  const handleStatusChange = (status) => {
    if (status === "all") {
      setSelectedStatus(["all"]);
    } else {
      const newSelected = selectedStatus.includes("all")
        ? [status]
        : selectedStatus.includes(status)
        ? selectedStatus.filter((s) => s !== status)
        : [...selectedStatus, status];

      setSelectedStatus(
        newSelected.length === 0
          ? ["all"]
          : newSelected.filter((s) => s !== "all")
      );
    }
  };

  // Chart.js configuration
  const chartData = {
    labels: ["Present", "Absent", "Late"],
    datasets: [
      {
        data: [
          summaryData.presentDays,
          summaryData,summaryData.absentDays,
          summaryData.lateArrivals,
        ],
        backgroundColor: ["#4ade80", "#f87171", "#facc15"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between max-md:flex-col gap-5 items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Attendance Report</h1>
            <p className="text-gray-600 mt-1">{formattedDate}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleMarkAttendance}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              disabled={isLoadingAttendance}
            >
              Mark Attendance
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition"
            >
              Filters
            </button>
            <button
              onClick={() => setShowRegularizationForm(true)}
              className="p-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition"
            >
              Request Regularization
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Search by Date</label>
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Filter by Status</label>
                <div className="flex gap-2 flex-wrap">
                  {["all", "present", "late", "absent"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`px-3 py-1 rounded border text-sm ${
                        selectedStatus.includes(status)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regularization Form */}
        {showRegularizationForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">Regularization Request</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Date</label>
                <input
                  type="date"
                  value={regularizationData.date}
                  onChange={(e) =>
                    setRegularizationData({ ...regularizationData, date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Status</label>
                <select
                  value={regularizationData.requestedStatus}
                  onChange={(e) =>
                    setRegularizationData({
                      ...regularizationData,
                      requestedStatus: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                >
                  <option value="">Select</option>
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Reason</label>
                <input
                  type="text"
                  value={regularizationData.reason}
                  onChange={(e) =>
                    setRegularizationData({ ...regularizationData, reason: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleSubmitRegularization}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
              <button
                onClick={() => setShowRegularizationForm(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Working Days", value: summaryData.totalWorkingDays, icon: "fa-calendar-alt", color: "blue" },
            { title: "Present Days", value: summaryData.presentDays, icon: "fa-check-circle", color: "green" },
            { title: "Absent Days", value: summaryData.absentDays, icon: "fa-times-circle", color: "red" },
            { title: "Late Arrivals", value: summaryData.lateArrivals, icon: "fa-clock", color: "yellow" },
          ].map(({ title, value, icon, color }, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className={`rounded-full bg-${color}-100 p-3 mr-4`}>
                <i className={`fas ${icon} text-${color}-600 text-xl`}></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Attendance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Attendance Summary</h2>
          <div style={{ height: "300px" }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Attendance Timeline */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Attendance Timeline</h2>
          {isLoadingAttendance ? (
            <div className="text-center">Loading...</div>
          ) : attendanceError ? (
            <div className="text-center">
              <p className="text-red-600">{attendanceError}</p>
              <button
                onClick={() => setAttendancePage(1)}
                className="mt-2 p-2 bg-blue-600 text-white rounded"
              >
                Retry
              </button>
            </div>
          ) : filteredRecords.length === 0 ? (
            <p className="text-gray-500">No attendance records found.</p>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {filteredRecords.map((record, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className="flex-shrink-0 w-3 h-3 rounded-full mt-1"
                      style={{
                        backgroundColor:
                          record.status === "Present"
                            ? "#4ade80"
                            : record.status === "Late"
                            ? "#facc15"
                            : "#f87171",
                      }}
                    ></div>
                    <div>
                      <p className="text-sm text-gray-500">{record.date}</p>
                      <p className="text-base font-medium text-gray-800">{record.status}</p>
                      <p className="text-sm text-gray-600">
                        Check-in: {record.checkIn} | Check-out: {record.checkOut}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              {attendanceTotal > limit && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setAttendancePage((prev) => Math.max(prev - 1, 1))}
                    disabled={attendancePage === 1}
                    className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {attendancePage} of {Math.ceil(attendanceTotal / limit)}
                  </span>
                  <button
                    onClick={() => setAttendancePage((prev) => prev + 1)}
                    disabled={attendancePage * limit >= attendanceTotal}
                    className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Regularization List */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Regularization Requests</h2>
          {isLoadingRegularizations ? (
            <div className="text-center">Loading...</div>
          ) : regularizationError ? (
            <div className="text-center">
              <p className="text-red-600">{regularizationError}</p>
              <button
                onClick={() => setRegularizationPage(1)}
                className="mt-2 p-2 bg-blue-600 text-white rounded"
              >
                Retry
              </button>
            </div>
          ) : regularizationRecords.length === 0 ? (
            <p className="text-gray-500">No regularization requests found.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Requested Status</th>
                      <th className="px-4 py-2">Reason</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regularizationRecords.map((req, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-4 py-2">{req.date}</td>
                        <td className="px-4 py-2">{req.requestedStatus}</td>
                        <td className="px-4 py-2">{req.reason}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              req.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : req.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {regularizationTotal > limit && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setRegularizationPage((prev) => Math.max(prev - 1, 1))}
                    disabled={regularizationPage === 1}
                    className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {regularizationPage} of {Math.ceil(regularizationTotal / limit)}
                  </span>
                  <button
                    onClick={() => setRegularizationPage((prev) => prev + 1)}
                    disabled={regularizationPage * limit >= regularizationTotal}
                    className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;