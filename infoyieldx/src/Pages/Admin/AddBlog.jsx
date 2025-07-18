import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: null,
    department: "",
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:5000/api/HR/get-blogs");
    setBlogs(res.data.blogs || []);
    console.log("blogs,", blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewBlog({ ...newBlog, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setNewBlog({ ...newBlog, [name]: value });
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    formData.append("department", newBlog.department);

    if (newBlog.image) {
      formData.append("image", newBlog.image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/HR/add-blogs",
        formData
      );
      console.log("Blog:", res.data.blog);
      setBlogs((prev) => [...prev, res.data.blog]);
      setNewBlog({ title: "", content: "", image: null, department: "" });
      setShowForm(false);
      toast.success("Added Successfully");
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleEditClick = (blog) => {
    setEditId(blog._id);
    setEditData({
      title: blog.title,
      content: blog.content,
      image: blog.image,
      department: blog.department,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditData({ ...editData, image: URL.createObjectURL(files[0]) });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("content", editData.content);
    formData.append("department", editData.department);

    const fileInput = document.querySelector('input[name="image"]');
    if (fileInput?.files[0]) {
      formData.append("image", fileInput.files[0]);
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/HR/update-blog/${editId}`,
        formData
      );
      const updatedBlogs = blogs.map((b) =>
        b._id === editId ? res.data.updatedBlog : b
      );
      toast.success("Updated");
      setBlogs(updatedBlogs);
      setEditId(null);
      setEditData({});
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleDeleteBlog = async (id) => {
    console.log("id", id);
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/HR/delete-blog/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
      toast.success("Blog Data has Been Deleted");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">📝 My Blog Posts</h1>
        <p className="text-gray-600">
          Share your knowledge, thoughts, and insights by creating or editing
          blogs.
        </p>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? "Cancel" : "Add Blog"}
      </button>

      {showForm && (
        <form
          onSubmit={handleAddBlog}
          className="mb-10 bg-gray-100 p-6 rounded shadow"
        >
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <textarea
            name="content"
            placeholder="Blog Content"
            value={newBlog.content}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <select
            name="department"
            value={newBlog.department}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Select Department</option>
            <option value="Web">Web Development</option>
            <option value="Mobile">App Development</option>
            <option value="Accounts">Accounts</option>
            <option value="oracle-dbs">Oracle Database</option>
            <option value="oracle-ebs">Oracle EBS</option>
          </select>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full mb-4"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Blog
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(blogs) &&
          blogs.map((blog) => {
            return editId === blog._id ? (
              <div key={blog._id} className="bg-yellow-100 p-4 rounded shadow">
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                  name="content"
                  value={editData.content}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <select
                  name="department"
                  value={editData.department}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-2 border rounded"
                >
                  <option value="Tech">Web Development</option>
                  <option value="HR">App Development</option>
                  <option value="Marketing">Accounts</option>
                  <option value="Finance">Oracle-Ebs</option>
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
                    src={editData.imageUrl}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 px-3 py-1 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-400 px-3 py-1 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div key={blog._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{blog.title}</h2>
                  <span className="text-sm text-gray-500">{blog.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Department:</strong> {blog.department}
                </p>
                <p className="text-gray-700 mt-1">{blog.content}</p>
                {blog.imageUrl && (
                  <img
                    src={`http://${blog.imageUrl}`}
                    alt="Blog"
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditClick(blog)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AddBlog;
