import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import api from '../api/axios';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    department: '',
    designation: '',
    city: '',
    photo: ''
  });
  const [photoPreview, setPhotoPreview] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch existing employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        const emp = res.data.data;
        setFormData({
          name: emp.name || '',
          gender: emp.gender || '',
          department: emp.department || '',
          designation: emp.designation || '',
          city: emp.city || '',
          photo: emp.photo || ''
        });
        setPhotoPreview(emp.photo || '');
        setLoading(false);
      } catch (err) {
        setErrors(['Failed to load employee data']);
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors([]);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await api.put(`/employees/${id}`, formData);
      alert('Employee updated successfully!');
      navigate(`/employee/${id}`); // back to details page
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors(['Something went wrong. Please try again.']);
      }
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <Zoom duration={5000} triggerOnce>
        <div className="w-full max-w-3xl bg-white/30 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Photo Zoom Section */}
          <Zoom duration={5000} triggerOnce>
            <div className="relative h-64 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="h-48 w-48 rounded-full border-4 border-white shadow-xl object-cover"
                />
              ) : (
                <div className="h-48 w-48 rounded-full bg-gray-300 flex items-center justify-center text-6xl text-gray-600 border-4 border-white">
                  👤
                </div>
              )}
              <label className="absolute bottom-4 right-4 bg-white/80 backdrop-blur rounded-full p-2 cursor-pointer shadow-lg hover:bg-white transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <span className="text-indigo-600 font-bold text-sm">📷 Change</span>
              </label>
            </div>
          </Zoom>

          {/* Form Zoom Section */}
          <Zoom duration={5000} triggerOnce>
            <div className="p-8">
              <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                ✏️ Update Employee
              </h2>

              {errors.length > 0 && (
                <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-6">
                  {errors.map((err, idx) => (
                    <div key={idx} className="text-sm">❌ {err}</div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition"
                    required
                  />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                  </select>
                  <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
                  {updating ? 'Updating...' : '💾 Update Employee'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/employee/${id}`)}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-xl transition"
                >
                  Cancel
                </button>
              </form>
            </div>
          </Zoom>
        </div>
      </Zoom>
    </div>
  );
};

export default UpdateEmployee;