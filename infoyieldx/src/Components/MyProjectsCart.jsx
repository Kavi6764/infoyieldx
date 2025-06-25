import { X } from "lucide-react";
import { useState } from "react";



const MyProjectsCart = (props) => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All"
    ? props.data
    : props.data.filter(project => project.status === filter);

  return (
    <div className="p-6 space-y-6">
   
      <div className="flex items-center justify-between">
  
          
        <h2 className="text-2xl font-bold">Recent Projects
        
        </h2>
       
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div key={project.id} className="border rounded-lg flex flex-col gap-1 justify-start p-4 bg-white hover:shadow-md">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm font-medium text-blue-600">{project.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProjectsCart;