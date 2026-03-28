import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, LayoutDashboard, LogOut, Sprout } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-emerald-600 font-black text-2xl tracking-tighter">
          <Sprout size={32} />
          <span>Kisan-Direct</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              {/* Profile Link (Everyone sees this) */}
              <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 font-bold transition-all">
                <User size={18} />
                <span>Hello, {user.name.split(' ')[0]}</span>
              </Link>

              {/* Dashboard Link (ONLY FARMERS see this) */}
              {/* Note: Make sure 'farmer' matches exactly how it's saved in your MongoDB (e.g. 'farmer' vs 'Farmer') */}
              {user.role === 'farmer' && (
                <Link to="/dashboard" className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 font-bold transition-all">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
              )}

              {/* Logout Button (Everyone sees this) */}
              <button 
                onClick={handleLogout}
                className="bg-gray-50 text-gray-500 px-4 py-2 rounded-xl font-bold hover:bg-red-50 hover:text-red-500 transition-all flex items-center space-x-1"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-all">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;