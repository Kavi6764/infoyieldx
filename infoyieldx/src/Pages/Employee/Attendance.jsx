// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState ,useEffect} from 'react';
import * as echarts from 'echarts';

const Attendance= () => {
  const [dateRange, setDateRange] = useState({
    start: '2025-05-17',
    end: '2025-06-17'
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(['all']);
  const [searchDate, setSearchDate] = useState('');
  
  // Current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Mock data for attendance
  const summaryData = {
    totalWorkingDays: 22,
    presentDays: 19,
    absentDays: 1,
    lateArrivals: 2
  };
  
  const attendanceRecords = [
    { date: '2025-06-17', checkIn: '09:00', checkOut: '17:30', totalHours: '8.5', status: 'Present' },
    { date: '2025-06-16', checkIn: '09:15', checkOut: '17:45', totalHours: '8.5', status: 'Present' },
    { date: '2025-06-15', checkIn: '08:55', checkOut: '17:30', totalHours: '8.5', status: 'Present' },
    { date: '2025-06-14', checkIn: '09:30', checkOut: '17:30', totalHours: '8.0', status: 'Late' },
    { date: '2025-06-13', checkIn: '09:00', checkOut: '17:30', totalHours: '8.5', status: 'Present' },
    
  ];
  
  const filteredRecords = attendanceRecords.filter(record => {
    // Filter by status
    if (selectedStatus.includes('all') || selectedStatus.includes(record.status.toLowerCase())) {
      // Filter by search
      if (searchDate) {
        return record.date.includes(searchDate);
      }
      return true;
    }
    return false;
  });
  
  // Initialize attendance chart
  useEffect(() => {
    const chartDom = document.getElementById('attendance-chart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      
      const option = {
        animation: false,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Attendance',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: summaryData.presentDays, name: 'Present', itemStyle: { color: '#4ade80' } },
              { value: summaryData.absentDays, name: 'Absent', itemStyle: { color: '#f87171' } },
              { value: summaryData.lateArrivals, name: 'Late', itemStyle: { color: '#facc15' } }
            ]
          }
        ]
      };
      
      myChart.setOption(option);
      
      // Cleanup
      return () => {
        myChart.dispose();
      };
    }
  }, []);
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = 30; // Simplified for example
    
    for (let i = 1; i <= daysInMonth; i++) {
      // Find if there's a record for this day
      const dayStr = `2025-06-${i.toString().padStart(2, '0')}`;
      const record = attendanceRecords.find(r => r.date === dayStr);
      
      let statusClass = 'bg-gray-100';
      if (record) {
        if (record.status === 'Present') statusClass = 'bg-green-100 border-green-400';
        else if (record.status === 'Absent') statusClass = 'bg-red-100 border-red-400';
        else if (record.status === 'Late') statusClass = 'bg-yellow-100 border-yellow-400';
      }
      
      days.push(
        <div key={i} className={`p-2 border rounded-lg ${statusClass} flex flex-col items-center`}>
          <span className="font-semibold">{i}</span>
          {record && record.status !== 'Absent' && (
            <div className="text-xs mt-1">
              <div>{record.checkIn}</div>
              <div>{record.checkOut}</div>
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  const handleStatusChange = (status) => {
    if (status === 'all') {
      setSelectedStatus(['all']);
    } else {
      const newSelected = selectedStatus.includes('all') 
        ? [status]
        : selectedStatus.includes(status)
          ? selectedStatus.filter(s => s !== status)
          : [...selectedStatus, status];
      
      if (newSelected.length === 0) {
        setSelectedStatus(['all']);
      } else {
        setSelectedStatus(newSelected.filter(s => s !== 'all'));
      }
    }
  };
  
  const handleExport = () => {
    alert('Exporting attendance report...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Attendance Report</h1>
            <p className="text-gray-600 mt-1">{formattedDate}</p>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition cursor-pointer !rounded-button whitespace-nowrap"
          >
            <i className="fas fa-filter text-gray-600"></i>
            <span className="ml-2">Filters</span>
          </button>
        </div>
        
        {/* Filters Section */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="date" 
                    className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  />
                  <span>to</span>
                  <input 
                    type="date" 
                    className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleStatusChange('all')}
                    className={`px-3 py-1 rounded-full text-sm ${selectedStatus.includes('all') ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} cursor-pointer !rounded-button whitespace-nowrap`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => handleStatusChange('present')}
                    className={`px-3 py-1 rounded-full text-sm ${selectedStatus.includes('present') ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'} cursor-pointer !rounded-button whitespace-nowrap`}
                  >
                    Present
                  </button>
                  <button 
                    onClick={() => handleStatusChange('absent')}
                    className={`px-3 py-1 rounded-full text-sm ${selectedStatus.includes('absent') ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800'} cursor-pointer !rounded-button whitespace-nowrap`}
                  >
                    Absent
                  </button>
                  <button 
                    onClick={() => handleStatusChange('late')}
                    className={`px-3 py-1 rounded-full text-sm ${selectedStatus.includes('late') ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'} cursor-pointer !rounded-button whitespace-nowrap`}
                  >
                    Late
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search by Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                  <input 
                    type="text" 
                    placeholder="YYYY-MM-DD" 
                    className="pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                onClick={handleExport}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-download mr-2"></i>
                Export Report
              </button>
            </div>
          </div>
        )}
        
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <i className="fas fa-calendar-alt text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Working Days</p>
              <p className="text-2xl font-bold">{summaryData.totalWorkingDays}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Present Days</p>
              <p className="text-2xl font-bold text-green-600">{summaryData.presentDays}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <i className="fas fa-times-circle text-red-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Absent Days</p>
              <p className="text-2xl font-bold text-red-600">{summaryData.absentDays}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <i className="fas fa-clock text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Late Arrivals</p>
              <p className="text-2xl font-bold text-yellow-600">{summaryData.lateArrivals}</p>
            </div>
          </div>
        </div>
        
        {/* Attendance Chart and Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
            <div id="attendance-chart" style={{ height: '300px' }}></div>
            <div className="flex justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Present</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Absent</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Late</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">June 2025</h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              <div className="font-medium text-gray-500">Sun</div>
              <div className="font-medium text-gray-500">Mon</div>
              <div className="font-medium text-gray-500">Tue</div>
              <div className="font-medium text-gray-500">Wed</div>
              <div className="font-medium text-gray-500">Thu</div>
              <div className="font-medium text-gray-500">Fri</div>
              <div className="font-medium text-gray-500">Sat</div>
              {generateCalendarDays()}
            </div>
          </div>
        </div>
        
        {/* Detailed List View */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Detailed Attendance Records</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkIn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkOut}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.totalHours}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${record.status === 'Present' ? 'bg-green-100 text-green-800' : 
                            record.status === 'Absent' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No records found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {filteredRecords.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredRecords.length}</span> records
              </div>
              <div className="flex-1 flex justify-end">
                <button 
                  onClick={handleExport}
                  className="ml-3 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-download mr-2"></i>
                  Export
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;

