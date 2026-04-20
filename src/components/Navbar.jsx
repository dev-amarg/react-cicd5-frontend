// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <Link to="/" className="text-white text-2xl font-bold drop-shadow-md">
//               🏢 EmployeeHub
//             </Link>
//           </div>
//           <div className="hidden md:flex space-x-6">
//             <Link to="/" className="text-white hover:text-yellow-300 transition font-medium">Home</Link>
//             <Link to="/create" className="text-white hover:text-yellow-300 transition font-medium">Add Employee</Link>
//           </div>
//           <div className="md:hidden">
//             {/* Mobile menu button could be added later */}
//             <button className="text-white focus:outline-none">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: '🏠 Home', path: '/' },
    { name: '👥 Employees', path: '/employees' },
    { name: '➕ Add Employee', path: '/create-employee' },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-extrabold text-2xl tracking-tight drop-shadow">
              👔 EmployeeHub
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-white font-semibold transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-white/30 backdrop-blur scale-105'
                    : 'hover:bg-white/20 hover:scale-105'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none text-2xl"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-white font-semibold ${
                  location.pathname === link.path ? 'bg-white/30' : 'hover:bg-white/20'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;