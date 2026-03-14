import { motion } from 'framer-motion';
import { Search, Filter, Plus, Coffee, Tag } from 'lucide-react';

const MENU_ITEMS = [
  { id: 1, name: "Espresso Macchiato", category: "Coffee", price: 4.50, stock: "In Stock", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=200&h=200", prepTime: "5 min" },
  { id: 2, name: "Vanilla Latte", category: "Coffee", price: 5.20, stock: "In Stock", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=200&h=200", prepTime: "7 min" },
  { id: 3, name: "Avocado Toast", category: "Breakfast", price: 9.80, stock: "Low Stock", image: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=200&h=200", prepTime: "12 min" },
  { id: 4, name: "Chocolate Croissant", category: "Pastries", price: 3.50, stock: "Out of Stock", image: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&q=80&w=200&h=200", prepTime: "2 min" },
  { id: 5, name: "Iced Caramel Macchiato", category: "Cold Coffee", price: 5.80, stock: "In Stock", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=200&h=200", prepTime: "6 min" },
  { id: 6, name: "Matcha Latte", category: "Tea", price: 6.00, stock: "In Stock", image: "https://images.unsplash.com/photo-1536956641575-b62007d4b4fb?auto=format&fit=crop&q=80&w=200&h=200", prepTime: "5 min" },
];

const Menu = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-stone-200/60 sticky top-0 z-20">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b4513] focus:border-transparent transition-all placeholder-stone-400"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 transition-colors">
            <Filter size={18} />
            <span className="font-medium">Filters</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-[#8b4513] text-white rounded-xl hover:bg-[#6b3e2e] transition-colors shadow-sm hover:shadow-md">
            <Plus size={18} />
            <span className="font-medium">Add Item</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide py-2">
        {['All Items', 'Coffee', 'Cold Coffee', 'Tea', 'Pastries', 'Breakfast'].map((cat, i) => (
          <button
            key={cat}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors border ${
              i === 0 
                ? 'bg-[#8b4513] text-white border-transparent' 
                : 'bg-white text-stone-600 border-stone-200 hover:border-[#8b4513] hover:text-[#8b4513]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MENU_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden hover:shadow-xl transition-all group flex flex-col"
          >
            <div className="relative h-48 overflow-hidden bg-stone-100">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md text-[#8b4513] shadow-sm flex items-center">
                  <Coffee size={12} className="mr-1" />
                  {item.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`text-xs font-bold px-2 py-1 rounded-md shadow-sm backdrop-blur ${
                  item.stock === 'In Stock' ? 'bg-emerald-500/90 text-white' : 
                  item.stock === 'Low Stock' ? 'bg-amber-500/90 text-white' : 
                  'bg-rose-500/90 text-white'
                }`}>
                  {item.stock}
                </span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-stone-800 text-lg leading-tight group-hover:text-[#8b4513] transition-colors line-clamp-2">
                  {item.name}
                </h3>
              </div>
              
              <div className="flex items-center text-xs text-stone-500 mt-auto mb-4">
                <span className="flex items-center mr-3 bg-stone-100 px-2 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mr-1.5"></span>
                  Prep: {item.prepTime}
                </span>
                <span className="flex items-center bg-[#fdf8f6] text-[#8b4513] px-2 py-1 rounded-md">
                  <Tag size={12} className="mr-1" />
                  Popular
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                <span className="text-xl font-black text-stone-800">
                  ${item.price.toFixed(2)}
                </span>
                <button className="text-sm font-semibold text-[#8b4513] bg-[#f2e8e5] hover:bg-[#8b4513] hover:text-white px-4 py-2 rounded-xl transition-colors">
                  Edit Item
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
