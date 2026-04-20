import { useState, useEffect } from 'react';
import api from '../api/axios';
import EmployeeCard from '../components/EmployeeCard';
import Spinner from '../components/Spinner';
import { Zoom } from 'react-awesome-reveal';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees');
      setEmployees(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load employees');
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Zoom for Heading */}
        <Zoom duration={5000} triggerOnce>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-800 drop-shadow-lg">
              👥 All Employees
            </h1>
            <p className="text-gray-700 text-lg mt-2">Meet your amazing team members</p>
          </div>
        </Zoom>

        {employees.length === 0 ? (
          <Zoom duration={5000} triggerOnce>
            <div className="text-center bg-white/30 backdrop-blur rounded-2xl p-10 max-w-md mx-auto">
              <p className="text-gray-800 text-xl">No employees found. Add some!</p>
              <button
                onClick={() => window.location.href = '/create-employee'}
                className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-xl hover:bg-indigo-600 transition"
              >
                + Add Employee
              </button>
            </div>
          </Zoom>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {employees.map((emp) => (
              // Wrap each card with Zoom (or keep Zoom inside EmployeeCard – but user wants "sab pe" so we add outer Zoom)
              <Zoom key={emp._id} duration={5000} triggerOnce>
                <div>
                  <EmployeeCard employee={emp} />
                </div>
              </Zoom>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;