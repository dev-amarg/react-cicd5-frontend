import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold drop-shadow-md">
              🏢 EmployeeHub
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-yellow-300 transition font-medium">Home</Link>
            <Link to="/create" className="text-white hover:text-yellow-300 transition font-medium">Add Employee</Link>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button could be added later */}
            <button className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;