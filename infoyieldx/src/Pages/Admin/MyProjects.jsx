import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyProjects = () => {
  const [myProjects, setMyProjects] = useState([]);
  const [imgpreview, setImgpreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    status: "In Progress",
    image: null,
    department: "",
  });

  const [editProjectId, setEditProjectId] = useState(null);
  const [editData, setEditData] = useState({});

  // Add Project Handlers
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];

      setNewProject({ ...newProject, image: file });
      setImgpreview(URL.createObjectURL(file));
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("technologies", newProject.technologies); // comma-separated
    formData.append("status", newProject.status);
    formData.append("department",newProject.department)
    if (newProject.image) {
      formData.append("image", newProject.image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/HR/add-portfolio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Added:", res.data);
      fetchProjects(); // refresh list
      setShowForm(false);
      toast.success("Added SuccessFully");
      setNewProject({
        title: "",
        description: "",
        technologies: "",
        status: "In Progress",
        image: null,
      });
      setImgpreview(null);
    } catch (err) {
      console.error("Failed to add project", err.response?.data || err.message);
    }
  };
  // Edit Project Handlers
  const handleEditClick = (project) => {
    console.log(project);
    setEditProjectId(project._id);
    setEditData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      status: project.status,
      imageUrl: project.image,
      department:project.department
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditData({ ...editData, image: imageUrl });
      const imageUrl = URL.createObjectURL(files[0]);
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("description", editData.description);
    formData.append("technologies", editData.technologies); // comma-separated
    formData.append("status", editData.status);

    if (editData.image) {
      formData.append("image", editData.image);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/HR/update-portfolio/${editProjectId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Project updated");
      fetchProjects();
      setEditProjectId(null);
      setEditData({});
      toast.success("Updated successfully");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditProjectId(null);
    setEditData({});
  };
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/HR/get-portfolio");
      setMyProjects(res.data.portfolio);
      console.log("portfolio:,", res.data.portfolio);
    } catch (err) {
      console.error("Failed to fetch portfolio", err);
    }
  };
  const handleDeleteProject = async (projectId) => {
  if (!window.confirm("Are you sure you want to delete this project?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/HR/delete-portfolio/${projectId}`);
    toast.success("Project deleted successfully");
    fetchProjects(); // Refresh the project list
  } catch (err) {
    console.error("Failed to delete project:", err.response?.data || err.message);
    toast.error("Failed to delete project");
  }
};


  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div className="mx-auto max-w-6xl py-10">
        
          <div className="text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        My Projects
      </h1>
      <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
        Explore the projects I’ve worked on across different departments, showcasing technologies, progress status, and department ownership. You can also add or edit projects as needed.
      </p>
    </div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? "Cancel" : "Add Project"}
      </button>

      {showForm && (
        <form
          onSubmit={handleAddProject}
          className="mb-10 p-6 bg-gray-100 rounded shadow"
        >
          <div className="mb-4">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={newProject.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              name="technologies"
              value={newProject.technologies}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Department</label>
            <select
              name="department"
              value={newProject.department}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Department</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Accounts">Accounts</option>
              <option value="Digital-Marketing">Digital Marketing</option>
              <option value="Oracle Database">Oracle Database</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Status</label>
            <select
              name="status"
              value={newProject.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Project Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {imgpreview && (
              <img
                src={imgpreview}
                alt="Preview"
                className="h-40 w-full object-cover rounded mt-2"
              />
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Project
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProjects.map((project) =>
          editProjectId === project._id ? (
            <div key={project.id} className="p-4 bg-yellow-100 rounded shadow">
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="text"
                name="technologies"
                value={editData.technologies}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <div className="mb-4">
                <label className="block font-semibold mb-1">Department</label>
                <select
                  name="department"
                  value={newProject.department}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Digital-Marketing">Digital Marketing</option>
                  <option value="Oracle Database">Oracle Database</option>
                </select>
              </div>

              <select
                name="status"
                value={editData.status}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleEditChange}
                className="mb-2"
              />
              {editData.imageUrl && (
                <img
                  src={`http://${editData.image}`}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-1 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div key={project._id} className="p-4 bg-white rounded shadow">
              {<project className="imageUrl"></project> && (
                <img
                  src={`http://${project.imageUrl}`}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {project.description}
              </p>
              <p className="text-sm text-gray-800 mb-1">
                <strong>Technologies:</strong> {project.technologies}
              </p>
              <p className="text-sm mb-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    project.status === "Completed"
                      ? "text-green-600"
                      : "text-orange-500"
                  } font-semibold`}
                >
                  {project.status}
                </span>
              </p>
              <div className="flex items-center justify-between">
                 <button
                onClick={() => handleEditClick(project)}
                className="px-4 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
  onClick={() => handleDeleteProject(project._id)}
  className="px-4 py-1 bg-red-500 text-white rounded"
>
  Delete
</button>
              </div>
             
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyProjects;
