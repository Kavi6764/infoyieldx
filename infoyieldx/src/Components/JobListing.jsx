import { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const JobListings = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const navigate = useNavigate();
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Erode,TamilNadu",
      type: "Full-time",
      team: "Product",
      description:
        "Build beautiful, responsive user interfaces using React and modern web technologies.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "UI/UX sensibility"],
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      team: "Product",
      description:
        "Drive product strategy and execution for our core platform features.",
      requirements: ["3+ years PM experience", "Technical background", "Data-driven mindset"],
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "Erode,TamilNadu",
      type: "Full-time",
      team: "Design",
      description:
        "Create intuitive and delightful user experiences across our product suite.",
      requirements: ["Portfolio of UX work", "Figma expertise", "User research experience"],
    },
    {
      id: 4,
      title: "Backend Engineer",
      department: "Engineering",
      location: "Erode,TamilNadu",
      type: "Full-time",
      team: "Infrastructure",
      description:
        "Build scalable backend systems and APIs that power our applications.",
      requirements: ["Node.js/Python experience", "Database design", "Cloud platforms"],
    },
    {
      id: 5,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      team: "Growth",
      description:
        "Lead marketing campaigns and growth initiatives to expand our reach.",
      requirements: ["Digital marketing experience", "Analytics tools", "Content creation"],
    },
    {
      id: 6,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Erode,TamilNadu",
      type: "Full-time",
      team: "Infrastructure",
      description:
        "Manage our cloud infrastructure and deployment pipelines.",
      requirements: ["AWS/GCP experience", "Kubernetes", "CI/CD pipelines"],
    },
  ];

  const departments = ["All", "Engineering", "Product", "Design", "Marketing"];
  const filteredJobs =
    selectedDepartment === "All"
      ? jobs
      : jobs.filter((job) => job.department === selectedDepartment);

  return (
    <section id="job-listings" className="py-20 px-4 ">
      <div className="max-w-6xl mx-auto">
        {/* Animated Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Open Positions
          </h2>
          <p className="md:text-xl text-md text-gray-600 max-w-2xl mx-auto">
            Find your next opportunity and join our mission to build exceptional products
          </p>
        </motion.div>

        {/* Department Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-6 py-2 b text-black rounded-xl font-semibold shadow-xl hover:scale-110 transform transition-all duration-300 scale-95 hover:-translate-y-2 ${
                selectedDepartment === dept ? "bg-black text-white" : ""
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job, i) => (
            <motion.div
              key={job.id}
              className="bg-white border border-gray-200 scale-90 rounded-lg p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#5f8fa5]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-[#051c36] text-white px-2 py-1 rounded-md text-xs">
                  {job.department}
                </div>
                <div className="text-gray-600 text-xs">{job.team}</div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  {job.type}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Key Requirements:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {job.requirements.slice(0, 2).map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <button onClick={()=>navigate("/application")} className="w-full px-4 py-2 rounded-lg bg-black hover:bg-blue-700 text-white">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-500 text-lg">
              No positions found in {selectedDepartment}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
