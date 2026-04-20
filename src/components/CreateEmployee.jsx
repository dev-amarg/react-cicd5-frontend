import { useState } from 'react';
import api from '../api/axios';
import { Fade, Zoom } from 'react-awesome-reveal';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    department: '',
    designation: '',
    city: '',
    photo: ''  // base64 string
  });
  const [photoPreview, setPhotoPreview] = useState('');
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');

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
    try {
      const res = await api.post('/employees', formData);
      setSuccess('Employee created successfully!');
      setFormData({ name: '', gender: '', department: '', designation: '', city: '', photo: '' });
      setPhotoPreview('');
      setErrors([]);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors(['Something went wrong. Please try again.']);
      }
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <Fade duration={5000} triggerOnce>
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-2xl border border-white/30">
          <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-8">
            📸 Create New Employee
          </h2>

          {success && (
            <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 text-center font-semibold">
              ✅ {success}
            </div>
          )}

          {errors.length > 0 && (
            <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4">
              {errors.map((err, idx) => (
                <div key={idx} className="text-sm">❌ {err}</div>
              ))}
            </div>
          )}

            <Zoom duration={5000}>
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
                <option value="Doctor">Doctor</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
              </select>
              <input
                type="text"
                name="designation"
                placeholder="Designation (e.g. Software Engineer)"
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
              <div className="flex flex-col gap-2">
                <label className="text-white font-semibold">📷 Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="p-2 rounded-xl bg-white/80 focus:outline-none cursor-pointer"
                />
                {photoPreview && (
                  <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover mt-2 border-2 border-white shadow" />
                )}
              </div>
            </div>
            <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg"
              >
               Add Employee
            </button>
          </form>
        </Zoom>
        </div>
      </Fade>
    </div>
  );
};

export default CreateEmployee;