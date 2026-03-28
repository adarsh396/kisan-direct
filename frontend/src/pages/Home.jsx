import { useState, useEffect } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Pulses', 'Other'];

  // --- 1. USE THE ENV VARIABLE HERE ---
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        // This pulls from your .env file (localhost for now, Render later)
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/crops`);
        setCrops(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching crops:", err);
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const contactOnWhatsApp = (phone, cropTitle) => {
    if (!phone) {
      alert("This farmer hasn't provided a contact number yet.");
      return;
    }
    const cleanPhone = phone.toString().replace(/\D/g, '');
    const message = `Hello! I saw your listing for "${cropTitle}" on Kisan-Direct. Is it still available?`;
    const url = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="py-8">
      {/* Hero Banner */}
      <div className="bg-emerald-600 rounded-3xl p-10 mb-10 text-white shadow-lg flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Fresh from the Farm</h1>
        <div className="relative w-full max-w-xl text-gray-900 mt-6">
          <input
            type="text"
            placeholder="Search for crops or locations..."
            className="w-full pl-12 pr-4 py-4 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-4 text-gray-400" size={24} />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4 text-gray-600 font-bold">
          <Filter size={18} />
          <span>Filter by Category:</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all border-2 ${
                selectedCategory === cat
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                  : 'bg-white border-gray-100 text-gray-500 hover:border-emerald-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Today</h2>
        <span className="text-gray-500">{filteredCrops.length} items found</span>
      </div>

      {loading ? (
        <div className="text-center py-20 text-emerald-600 font-bold text-xl">Loading Marketplace...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCrops.map((crop) => (
            <div key={crop._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <img src={crop.imageUrl} alt={crop.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-emerald-700 shadow-sm border border-emerald-100">
                  {crop.category || 'Grains'}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{crop.title}</h3>
                <p className="text-2xl font-black text-emerald-600 mb-3">₹{crop.pricePerKg} <span className="text-sm text-gray-500 font-normal">/ kg</span></p>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium text-gray-400">Farmer:</span> {crop.farmerName || 'Anonymous'}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin size={16} className="mr-1 text-amber-500" /> {crop.location}
                </div>
                <button
                  onClick={() => contactOnWhatsApp(crop.farmerPhone, crop.title)}
                  className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-md active:scale-95"
                >
                  Contact on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredCrops.length === 0 && !loading && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-lg font-medium">No crops found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Home;