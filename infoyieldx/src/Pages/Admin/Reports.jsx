import { FileText, CalendarDays, BarChart, UserCheck } from "lucide-react";

const reportItems = [
  {
    title: "Leave Summary",
    description: "Monthly breakdown of approved and pending leaves.",
    icon: <CalendarDays className="text-blue-600 w-6 h-6" />,
  },
  {
    title: "Attendance Report",
    description: "Daily attendance log with check-in and check-out times.",
    icon: <UserCheck className="text-green-600 w-6 h-6" />,
  },
  {
    title: "Performance Review",
    description: "Quarterly feedback and performance ratings.",
    icon: <BarChart className="text-purple-600 w-6 h-6" />,
  },
  {
    title: "Payroll Report",
    description: "Salary breakdown and payment history.",
    icon: <FileText className="text-yellow-600 w-6 h-6" />,
  },
];

const Reports = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">HR Reports</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {reportItems.map((report, index) => (
          <div
            key={index}
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-start gap-4">
              {report.icon}
              <div>
                <h2 className="text-lg font-semibold">{report.title}</h2>
                <p className="text-sm text-gray-600">{report.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
