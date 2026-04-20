import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Zoom } from 'react-awesome-reveal';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const res = await api.get(`/employees/${id}`);
      setEmployee(res.data.data);
      setLoading(false);
    } catch {
      setError('Employee not found or server error');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this employee permanently?')) return;
    try {
      await api.delete(`/employees/${id}`);
      alert('Employee deleted successfully');
      navigate('/employees');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete employee. Please try again.');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div></div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      {/* Zoom for the whole card */}
      <Zoom duration={5000} triggerOnce>
        <div className="w-full max-w-2xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/30 transform transition-all hover:scale-[1.02] duration-300">
          
          {/* Zoom for Photo Section */}
          <Zoom duration={5000} triggerOnce>
            <div className="relative h-80 bg-gradient-to-r from-indigo-600 to-purple-700">
              {employee.photo ? (
                <img
                  src={employee.photo}
                  alt={employee.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-7xl text-white">
                  📸 No Photo
                </div>
              )}
              {/* Gradient overlay for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </Zoom>

          {/* Zoom for Details Content */}
          <Zoom duration={5000} triggerOnce>
            <div className="p-8 space-y-6">
              {/* Name and Designation */}
              <div className="text-center">
                <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">{employee.name}</h2>
                <p className="text-indigo-200 text-xl font-medium mt-2">{employee.designation}</p>
              </div>

              {/* Info Grid */}
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-gray-900 font-medium">
                  <div className="flex items-center gap-2"><span className="font-bold">🧑‍🤝‍🧑 Gender:</span> {employee.gender}</div>
                  <div className="flex items-center gap-2"><span className="font-bold">🏢 Department:</span> {employee.department}</div>
                  <div className="flex items-center gap-2"><span className="font-bold">📍 City:</span> {employee.city}</div>
                  <div className="flex items-center gap-2 col-span-2"><span className="font-bold">🆔 Employee ID:</span> <span className="text-xs bg-gray-800/50 px-2 py-1 rounded">{employee._id}</span></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link
                  to={`/update/${employee._id}`}
                  className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition transform hover:scale-105 shadow-md"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition transform hover:scale-105 shadow-md"
                >
                  🗑️ Delete
                </button>
              </div>
              <button
                onClick={() => navigate('/employees')}
                className="w-full bg-gray-200/80 backdrop-blur hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-xl transition"
              >
                ← Back to List
              </button>
            </div>
          </Zoom>
        </div>
      </Zoom>
    </div>
  );
};

export default EmployeeDetails;