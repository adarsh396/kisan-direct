import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate(); // This lets us redirect the user after they sign up
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'buyer', location: '', contactNumber: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    
    try {
      // 1. Send the data to your Node.js server
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      // 2. The server sends back a JWT token and user info. Save it to the browser!
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // 3. Send them to the homepage
      navigate('/');
      
    } catch (err) {
      // If the backend throws an error (like "User already exists"), show it
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-emerald-600 mb-6">Join Kisan-Direct</h2>
        
        {/* If there is an error, show a red alert box */}
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input type="text" name="name" onChange={handleChange} required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
              <input type="text" name="contactNumber" onChange={handleChange} required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input type="email" name="email" onChange={handleChange} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input type="password" name="password" onChange={handleChange} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">I am a...</label>
              <select name="role" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                <option value="buyer">Buyer</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">City/Village</label>
              <input type="text" name="location" onChange={handleChange} required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-200 mt-4">
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account? <Link to="/login" className="text-amber-500 font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;