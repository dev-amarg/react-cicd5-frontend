import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;