import { useContext, useState, useEffect } from "react";
import {
  Search, Filter, Plus
} from "lucide-react";
import { Appcontext } from "../../Context/Context";
import { toast } from "react-toastify";
import axios from "axios";

const departments = ["Engineering", "Product", "Design", "Marketing", "Sales", "HR", "Finance"];

const EmployeeList = () => {
  const { hrUID } = useContext(Appcontext);
  const [employeeList, setEmployeeList] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    dateOfBirth: "", address: "", position: "", department: "",
    salary: "", startDate: "", emergencyContact: "", password: "", type: "employee"
  });


  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/HR/get-employee");
      setEmployeeList(res.data.Employee)
      console.log(res.data.Employee)
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch employees");
    }
  };
useEffect(() => {
  fetchEmployees();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "", lastName: "", email: "", phone: "", dateOfBirth: "",
      address: "", position: "", department: "", salary: "", startDate: "",
      emergencyContact: "", password: "", type: "employee"
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("hrToken");

    if (!formData.firstName || !formData.email || !formData.position) {
      toast.error("Please fill in required fields");
      setIsSubmitting(false);
      return;
    }
const form = new FormData();
form.append("firstname", formData.firstName);
form.append("lastname", formData.lastName);
form.append("email", formData.email);
form.append("phone", formData.phone);
form.append("position", formData.position);
form.append("department", formData.department);
form.append("type", formData.type);
form.append("password", formData.password);
form.append("dateOfBirth", formData.dateOfBirth);
form.append("address", formData.address);
form.append("salary", formData.salary);
form.append("emergencyContact", formData.emergencyContact); 
form.append("startDate", formData.startDate); // 

if (imageFile) {
  form.append("image", imageFile);
};

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/HR/update-employee/${editingId}`, form);
        toast.success("Employee updated");
      } else {
        const res = await axios.post("http://localhost:5000/api/HR/add-employee", form);
        toast.success(`Added: ${res.data.employeeId}`);
      }
      fetchEmployees();
      resetForm();
      setShowForm(false);
    } catch (err) {
      toast.error(
  err?.response?.data?.message ||
  err?.response?.data?.error ||
  err.message ||
  "Something went wrong"
);

    }
    setIsSubmitting(false);
  };

  const handleEdit = (emp) => {
    setFormData({
      firstName: emp.firstname, lastName: emp.lastname, email: emp.email,
      phone: emp.phone, dateOfBirth: emp.dateOfBirth || "", address: emp.address || "",
      position: emp.position, department: emp.department, salary: emp.salary || "",
      startDate: emp.startDate || "", emergencyContact: emp.emergencyContact || "",
      password: "", type: emp.type || "employee"
    });
    setEditingId(emp._id);
    setImagePreview(emp.image || null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      // const token = localStorage.getItem("hrToken");
      await axios.delete(`http://localhost:5000/api/HR/delete-employee/${id}`);
      toast.success("Deleted successfully");
      fetchEmployees();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredEmployees = Array.isArray(employeeList)
    ? employeeList.filter((emp) =>
        `${emp.firstname} ${emp.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-gray-500 text-sm">Manage your employees</p>
        </div>
        <button onClick={() => setShowForm((p) => !p)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
          <Plus className="mr-2 h-4 w-4" /> {showForm ? "Close" : "Add"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-bold">{editingId ? "Edit" : "Add"} Employee</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && <img src={imagePreview} alt="preview" className="w-20" />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border p-2 rounded" />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border p-2 rounded" />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
            <input name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border p-2 rounded" />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded" />
            <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} className="border p-2 rounded" />
            <input name="salary" placeholder="Annual Salary" value={formData.salary} onChange={handleChange} className="border p-2 rounded" />
            <input name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} className="border p-2 rounded" />
            <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} className="border p-2 rounded" />
            <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} className="border p-2 rounded" />
            <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 rounded md:col-span-2" />
            <select name="department" value={formData.department} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Department</option>
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded">
              <option value="employee">Employee</option>
              <option value="intern">Intern</option>
            </select>
          </div>

          <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {isSubmitting ? "Submitting..." : editingId ? "Update" : "Add"}
          </button>
          {editingId && <button type="button" onClick={resetForm} className="ml-4 text-sm text-gray-500 hover:underline">Cancel Edit</button>}
        </form>
      )}

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:max-w-xs"
        />
        <button className="border px-4 py-2 rounded hover:bg-gray-100 flex items-center">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((emp) => (
          <div key={emp._id} className="border rounded-lg p-4 hover:shadow transition">
            {emp.image && <img src={emp.image} alt="avatar" className="w-12 h-12 rounded-full object-cover mb-2" />}
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="font-bold">{emp.firstname} {emp.lastname}</h2>
                <p className="text-sm text-gray-500">{emp.position}</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{emp.type}</span>
            </div>
            <p className="text-sm text-gray-700 mb-1">Dept: {emp.department}</p>
            <p className="text-sm text-gray-500">Email: {emp.email}</p>
            <p className="text-sm text-gray-500">Phone: {emp.phone}</p>
            <div className="flex space-x-3 mt-2">
              <button onClick={() => handleEdit(emp)} className="text-blue-500 hover:underline text-sm">Edit</button>
              <button onClick={() => handleDelete(emp._id)} className="text-red-500 hover:underline text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
