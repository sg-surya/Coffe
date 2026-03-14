import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, ShoppingCart, Minus, Plus, Utensils, X } from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';

const MENU_ITEMS = [
  { id: '1', name: "Espresso Macchiato", category: "Coffee", price: 4.50, stock: "In Stock", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: '2', name: "Vanilla Latte", category: "Coffee", price: 5.20, stock: "In Stock", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: '3', name: "Avocado Toast", category: "Breakfast", price: 9.80, stock: "In Stock", image: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: '4', name: "Chocolate Croissant", category: "Pastries", price: 3.50, stock: "Out of Stock", image: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: '5', name: "Iced Caramel Macchiato", category: "Cold Coffee", price: 5.80, stock: "In Stock", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=200&h=200" },
];

const CustomerMenu = () => {
  const addOrder = useOrderStore(state => state.addOrder);
  const [cart, setCart] = useState<{item: any, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (item: any) => {
    if (item.stock === 'Out of Stock') return;
    setCart(prev => {
      const exists = prev.find(p => p.item.id === item.id);
      if (exists) {
        return prev.map(p => p.item.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.item.id === id) {
        return { ...p, qty: Math.max(0, p.qty + delta) };
      }
      return p;
    }).filter(p => p.qty > 0));
  };

  const total = cart.reduce((acc, curr) => acc + (curr.item.price * curr.qty), 0);
  const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    addOrder({
      id: Math.floor(Math.random() * 10000).toString(),
      customerName: 'Me (Customer)',
      type: 'takeaway',
      status: 'pending',
      items: cart.map(c => ({ id: c.item.id, name: c.item.name, quantity: c.qty, price: c.item.price })),
      total,
      timePlaced: new Date(),
      timeUpdated: new Date()
    });
    
    setOrderPlaced(true);
    setCart([]);
    setIsCartOpen(false);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-20 relative">
      <header className="fixed top-0 inset-x-0 h-16 bg-white border-b border-stone-200 z-30 flex items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <Coffee size={24} className="text-[#8b4513]" />
          <span className="text-xl font-bold tracking-tight text-[#5c3a21]">CafeFlow</span>
        </div>
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
        >
          <ShoppingCart size={20} className="text-stone-700" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="w-full max-w-sm bg-white h-full relative z-50 flex flex-col shadow-2xl border-l border-stone-200"
          >
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-stone-800">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 bg-stone-100 rounded-full hover:bg-stone-200"><X size={18} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-400">
                  <Utensils size={40} className="mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map(c => (
                  <div key={c.item.id} className="flex justify-between items-center bg-stone-50 p-3 rounded-xl">
                    <div className="flex-1">
                      <h4 className="font-semibold text-stone-800 text-sm leading-tight">{c.item.name}</h4>
                      <p className="text-stone-500 text-sm">${(c.item.price * c.qty).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-3 bg-white px-2 py-1 rounded-lg border border-stone-200 shadow-sm">
                      <button onClick={() => updateQty(c.item.id, -1)} className="text-stone-400 hover:text-stone-800"><Minus size={14} /></button>
                      <span className="font-bold text-sm text-stone-800 w-4 text-center">{c.qty}</span>
                      <button onClick={() => updateQty(c.item.id, 1)} className="text-stone-400 hover:text-stone-800"><Plus size={14} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-stone-100 bg-stone-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-stone-600">Total</span>
                  <span className="text-2xl font-black text-stone-800">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#8b4513] text-white py-3.5 rounded-xl font-bold hover:bg-[#6b3e2e] transition-colors shadow-sm"
                >
                  Place Order
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Success Toast */}
      {orderPlaced && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 bg-emerald-600 outline outline-4 outline-emerald-100 text-white px-6 py-3 rounded-xl shadow-xl z-30 font-bold"
        >
          🎉 Order sent to the kitchen!
        </motion.div>
      )}

      {/* Menu Area */}
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-stone-800 mb-2">Our Menu</h1>
          <p className="text-stone-500 font-medium">Order online, skip the line.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {MENU_ITEMS.map((item) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={item.id}
              className={`bg-white rounded-2xl border ${item.stock === 'Out of Stock' ? 'opacity-60 grayscale' : 'border-stone-200/60 shadow-sm'} overflow-hidden group`}
            >
              <div className="h-40 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <span className="bg-white/90 backdrop-blur text-[10px] uppercase font-bold px-2 py-1 rounded-md text-[#8b4513] shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex flex-col h-32">
                <h3 className="font-bold text-stone-800 text-lg leading-tight mb-1">{item.name}</h3>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-black text-stone-800">${item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    disabled={item.stock === 'Out of Stock'}
                    className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${
                      item.stock === 'Out of Stock' 
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
                        : 'bg-[#fdf8f6] text-[#8b4513] hover:bg-[#8b4513] hover:text-white'
                    }`}
                  >
                    {item.stock === 'Out of Stock' ? 'Out' : 'Add'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerMenu;
