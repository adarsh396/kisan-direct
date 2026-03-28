import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Package, MapPin, PlusCircle, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [msg, setMsg] = useState('');
  const [myCrops, setMyCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    pricePerKg: '',
    quantityAvailable: '',
    location: '',
    imageUrl: '',
    category: 'Grains'
  });

  // --- 1. FETCH ONLY YOUR CROPS ---
  const fetchMyCrops = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/crops');

      // Get current user from context or storage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const currentUserId = user?._id || storedUser?._id;

      const filtered = res.data.filter(c => {
        const cropFarmerId = c.farmerId?._id || c.farmerId;
        return cropFarmerId === currentUserId;
      });

      console.log("My Active Listings:", filtered); // Check your console for farmerPhone!
      setMyCrops(filtered);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching your crops:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id || localStorage.getItem('user')) {
      fetchMyCrops();
    }
  }, [user]);

  // --- 2. LIST A NEW CROP ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      // Direct pull from storage to ensure we have the contactNumber
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = storedUser?.token;

      if (!storedUser?.contactNumber) {
        setMsg("❌ Error: No phone number in profile. Please Logout and Login again.");
        return;
      }

      // Inside handleSubmit in Dashboard.jsx
      const payload = {
        title: formData.title,
        pricePerKg: formData.pricePerKg,
        quantityAvailable: formData.quantityAvailable,
        location: formData.location,
        imageUrl: formData.imageUrl,
        category: formData.category, // <--- THIS LINE IS MISSING IN YOUR CODE!
        farmerId: storedUser._id,
        farmerName: storedUser.name,
        farmerPhone: storedUser.contactNumber
      };

      await axios.post(
        'http://localhost:5000/api/crops',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMsg("✅ Crop listed successfully!");
      setFormData({ title: '', pricePerKg: '', quantityAvailable: '', location: '', imageUrl: '' });
      fetchMyCrops();
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Failed to list crop."));
    }
  };

  // --- 3. DELETE A CROP ---
  const deleteCrop = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        await axios.delete(`http://localhost:5000/api/crops/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setMsg("🗑️ Crop removed.");
        fetchMyCrops();
      } catch (err) {
        setMsg("❌ Could not delete crop.");
      }
    }
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Farmer Dashboard</h1>
        <p className="text-gray-500 mt-2 text-lg">Manage your produce and track your active listings.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Form Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-24">
          <div className="flex items-center space-x-2 mb-6 text-emerald-600">
            <PlusCircle size={24} />
            <h2 className="text-xl font-bold">Add New Produce</h2>
          </div>

          {msg && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center space-x-2 ${msg.includes('✅') || msg.includes('🗑️') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
              }`}>
              <span>{msg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1 font-sans">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
              >
                <option value="Grains">🌾 Grains</option>
                <option value="Vegetables">🥦 Vegetables</option>
                <option value="Fruits">🍎 Fruits</option>
                <option value="Pulses">🫘 Pulses</option>
                <option value="Other">📦 Other</option>
              </select>
            </div>
            <input type="text" placeholder="Crop Name" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all" required />

            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Price (₹/Kg)" value={formData.pricePerKg} onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all" required />
              <input type="number" placeholder="Qty (Kg)" value={formData.quantityAvailable} onChange={(e) => setFormData({ ...formData, quantityAvailable: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all" required />
            </div>

            <input type="text" placeholder="Mandi / Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all" required />
            <input type="text" placeholder="Image URL" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm" required />

            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95 mt-4">
              Post to Marketplace
            </button>
          </form>
        </div>

        {/* Listings Section */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Active Listings</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600" size={40} /></div>
          ) : myCrops.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-gray-400">
              No crops listed under your account yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {myCrops.map(crop => (
                <div key={crop._id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group">
                  <div className="flex items-center space-x-5">
                    <img src={crop.imageUrl} alt="" className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{crop.title}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span className="text-emerald-600 font-black">₹{crop.pricePerKg}/kg</span>
                        <span>{crop.quantityAvailable}kg</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deleteCrop(crop._id)} className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;