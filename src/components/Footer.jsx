const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} - Design and Developed by Amar Kumar Gupta(AB). All rights reserved.</p>
        <p className="text-xs text-gray-400 mt-1">Built with React + Tailwind | Backend on NodeJS + ExpressJS + CouchDB | Server - Azure(Docker+K8s)</p>
      </div>
    </footer>
  );
};

export default Footer;