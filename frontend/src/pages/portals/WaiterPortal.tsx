import { useTableStore } from '../../store/tableStore';
import { useOrderStore } from '../../store/orderStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Info, Plus, Check, Clock, Table2 } from 'lucide-react';

const WaiterPortal = () => {
  const { tables, updateTableStatus } = useTableStore();
  const { orders, updateOrderStatus } = useOrderStore();
  
  // Waiter manages tables and serves ready orders
  const pendingService = orders.filter(o => o.status === 'ready' || o.status === 'preparing' || o.status === 'pending');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-white border-stone-200 text-stone-700 hover:border-emerald-500 hover:shadow-emerald-100';
      case 'occupied': return 'bg-amber-50 border-amber-200 text-amber-800 shadow-amber-100/50';
      case 'reserved': return 'bg-slate-50 border-slate-200 text-slate-700 shadow-slate-100/50';
      default: return 'bg-white border-stone-200 text-stone-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] p-4 sm:p-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-stone-200 gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-800 tracking-tight flex items-center">
            <Table2 className="text-[#8b4513] mr-3" size={32} />
            Floor Management
          </h1>
          <p className="text-stone-500 font-medium mt-1">Manage tables and active orders</p>
        </div>
        
        <div className="flex gap-2 p-1.5 bg-stone-100 rounded-xl overflow-x-auto w-full sm:w-auto">
          {['All Tables', 'Available', 'Occupied', 'My Tables'].map((f, i) => (
            <button key={i} className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors ${
              i === 0 ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}>
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Left Col: Table Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-stone-800">Dining Area A</h2>
            <div className="flex gap-4 text-xs font-bold text-stone-500 uppercase tracking-wider">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-2"></span>Available</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 mr-2"></span>Occupied</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tables.map(table => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={table.id}
                onClick={() => updateTableStatus(table.id, table.status === 'available' ? 'occupied' : 'available')}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 text-left flex flex-col justify-between h-32 shadow-sm ${getStatusColor(table.status)}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-2xl font-black">{table.number}</span>
                  {table.status === 'available' && <Plus size={18} className="text-stone-400 opacity-50" />}
                  {table.status === 'occupied' && <Info size={18} className="text-amber-600 opacity-80" />}
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="flex items-center text-xs font-bold opacity-70">
                    <Users size={14} className="mr-1" /> {table.capacity}
                  </span>
                  
                  {table.status === 'occupied' && (
                    <span className="bg-amber-100/80 text-amber-800 text-[10px] font-black uppercase px-2 py-1 rounded-md">
                      Occupied
                    </span>
                  )}
                  {table.status === 'available' && (
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-2 py-1 rounded-md">
                      Free
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Col: Active Service Feed */}
        <div className="w-full xl:w-96 bg-white rounded-3xl p-6 shadow-xl border border-stone-200/50 flex flex-col max-h-[calc(100vh-8rem)] sticky top-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-stone-800">Service Queue</h2>
            <span className="bg-[#fdf8f6] text-[#8b4513] px-3 py-1 rounded-full text-sm font-bold shadow-inner">
              {pendingService.length} Active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            <AnimatePresence>
              {pendingService.length === 0 ? (
                <div className="h-full flex items-center justify-center text-stone-400 font-medium pb-20">
                  No active orders to serve right now.
                </div>
              ) : (
                pendingService.map(order => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    key={order.id}
                    className={`p-4 rounded-2xl border ${
                      order.status === 'ready' 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-black text-stone-800 text-lg">Order #{order.id}</h4>
                        <p className="text-sm font-bold text-stone-500">
                          {order.tableId ? `Table ${order.tableId}` : order.customerName}
                        </p>
                      </div>
                      
                      {order.status === 'ready' && (
                        <span className="flex h-3 w-3 relative mt-1.5 mr-1 text-emerald-500">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                      )}
                      
                      {order.status !== 'ready' && (
                        <span className="text-xs font-bold uppercase text-stone-400 bg-white px-2 py-1 rounded-md shadow-sm border border-stone-100 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {order.status}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm font-medium text-stone-600 mb-4 bg-white/50 p-2 rounded-xl border border-stone-100/50 backdrop-blur-sm">
                      {order.items.length} items • ${order.total.toFixed(2)}
                    </div>
                    
                    {order.status === 'ready' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'served')}
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)] flex justify-center items-center"
                      >
                        <Check size={18} className="mr-2" strokeWidth={3} />
                        Mark as Served
                      </button>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WaiterPortal;
