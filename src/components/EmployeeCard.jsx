import { Link } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';

const EmployeeCard = ({ employee }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-gray-100/50 backdrop-blur-sm">
      
      {/* Zoom for Photo Section with bg-pink-700 */}
      <Zoom duration={5000} triggerOnce>
        <div className="relative h-56 bg-pink-700 flex items-center justify-center overflow-hidden">
          {employee.photo ? (
            <img
              src={employee.photo}
              alt={employee.name}
              className="h-44 w-44 object-cover rounded-full border-4 border-white shadow-xl transform transition duration-300 hover:scale-110"
            />
          ) : (
            <div className="h-44 w-44 rounded-full bg-pink-500 flex items-center justify-center text-6xl text-white shadow-inner">
              👤
            </div>
          )}
          {/* Optional: Overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
        </div>
      </Zoom>

      {/* Zoom for Details Section */}
      <Zoom duration={5000} triggerOnce>
        <div className="p-6 text-center space-y-3">
          <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">{employee.name}</h3>
          
          <div className="space-y-1 text-gray-700 text-sm">
            <p><span className="font-semibold">🧑‍🤝‍🧑 Gender:</span> {employee.gender}</p>
            <p><span className="font-semibold">🏢 Department:</span> {employee.department}</p>
            <p><span className="font-semibold">💼 Designation:</span> {employee.designation}</p>
            <p><span className="font-semibold">📍 City:</span> {employee.city}</p>
          </div>

          <div className="flex justify-between gap-2 pt-4">
            <Link
              to={`/employee/${employee._id}`}
              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition transform hover:scale-105 shadow-md"
            >
              📋 Details
            </Link>
            <Link
              to={`/update/${employee._id}`}
              className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 rounded-xl transition transform hover:scale-105 shadow-md"
            >
              ✏️ Update
            </Link>
            <Link
              to={`/delete/${employee._id}`}
              className="flex-1 text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition transform hover:scale-105 shadow-md"
            >
              🗑️ Delete
            </Link>
          </div>
        </div>
      </Zoom>
    </div>
  );
};

export default EmployeeCard;