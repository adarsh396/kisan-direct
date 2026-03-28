import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute'; // Import the gatekeeper

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="flex-grow max-w-7xl mx-auto p-4 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* --- UPDATED: Protect the Dashboard for Farmers ONLY --- */}
            {/* Note: Ensure 'farmer' exactly matches the role string saved in your database */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRole="farmer">
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Protect the Profile (Open to both farmers and buyers) */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;