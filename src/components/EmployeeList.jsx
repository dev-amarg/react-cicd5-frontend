import { useState, useEffect } from 'react';
import api from '../api/axios';
import EmployeeCard from '../components/EmployeeCard';
import Spinner from '../components/Spinner';

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
      setError('Failed to load employees', err);
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          👥 All Employees
        </h1>
        {employees.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">No employees found. Add some!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {employees.map((emp) => (
              <EmployeeCard key={emp._id} employee={emp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;