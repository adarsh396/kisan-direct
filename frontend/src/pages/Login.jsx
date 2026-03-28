import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import API_BASE_URL from '../api/config';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // Bring in the brain

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Send credentials to Node.js backend
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password
      });

      // 2. Save the token and user data
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data); // Update global state

      // 3. Redirect to home
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-emerald-600 mb-6">Welcome Back</h2>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-200 mt-4">
            Sign In
          </button>
        </form>
        
        <p className="text-center text-gray-600 mt-6">
          Don't have an account? <Link to="/register" className="text-amber-500 font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;