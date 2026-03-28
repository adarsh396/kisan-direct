import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { User, MapPin, Phone, Mail, Save, CheckCircle } from 'lucide-react';
import API_BASE_URL from '../api/config';
const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    contactNumber: user?.contactNumber || '',
  });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      
      const res = await axios.put(`${API_BASE_URL}/api/auth/profile`, formData, config);
      
      // Update both Context and LocalStorage so the app stays in sync
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      setMsg('✅ Profile updated successfully!');
    } catch (err) {
      setMsg('❌ Failed to update profile.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-emerald-600 p-8 text-white">
          <h2 className="text-3xl font-bold">Your Profile</h2>
          <p className="text-emerald-100 mt-2">Manage your personal information and contact details.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {msg && (
            <div className={`p-4 rounded-xl font-bold text-sm ${msg.includes('✅') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
              {msg}
            </div>
          )}

          <div className="grid gap-6">
            <div>
              <label className="flex items-center text-gray-400 text-xs font-bold uppercase mb-2 ml-1">
                <User size={14} className="mr-1"/> Full Name
              </label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 transition-all" />
            </div>

            <div>
              <label className="flex items-center text-gray-400 text-xs font-bold uppercase mb-2 ml-1">
                <Mail size={14} className="mr-1"/> Email Address
              </label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 transition-all" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-gray-400 text-xs font-bold uppercase mb-2 ml-1">
                  <MapPin size={14} className="mr-1"/> Location
                </label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 transition-all" />
              </div>
              <div>
                <label className="flex items-center text-gray-400 text-xs font-bold uppercase mb-2 ml-1">
                  <Phone size={14} className="mr-1"/> WhatsApp Number
                </label>
                <input type="text" value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                  className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 transition-all" />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2 mt-4">
            <Save size={20} />
            <span>Save Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;