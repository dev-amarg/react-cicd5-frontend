import { Link } from 'react-router-dom';

const EmployeeCard = ({ employee }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100">
      <div className="relative h-48 bg-gradient-to-r from-indigo-200 to-purple-200 flex items-center justify-center">
        {employee.photo ? (
          <img src={employee.photo} alt={employee.name} className="h-40 w-40 object-cover rounded-full border-4 border-white shadow-md" />
        ) : (
          <div className="h-40 w-40 rounded-full bg-gray-300 flex items-center justify-center text-5xl text-gray-600">
            👤
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{employee.name}</h3>
        <p className="text-gray-600 mt-1">
          <span className="font-semibold">Gender:</span> {employee.gender}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Department:</span> {employee.department}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Designation:</span> {employee.designation}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">City:</span> {employee.city}
        </p>
        <div className="flex justify-between mt-5 space-x-2">
          <Link
            to={`/employee/${employee._id}`}
            className="flex-1 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
          >
            📋 Details
          </Link>
          <Link
            to={`/update/${employee._id}`}
            className="flex-1 text-center bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition transform hover:scale-105"
          >
            ✏️ Update
          </Link>
          <Link
            to={`/delete/${employee._id}`}
            className="flex-1 text-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
          >
            🗑️ Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;