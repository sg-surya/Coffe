import { useOrderStore } from '../../store/orderStore';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Flame, Loader2, RefreshCw } from 'lucide-react';

const KitchenPortal = () => {
  const { orders, updateOrderStatus } = useOrderStore();
  
  // Kitchen only sees orders that are 'pending' or 'preparing'
  const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing');

  const startPreparing = (id: string) => updateOrderStatus(id, 'preparing');
  const markReady = (id: string) => updateOrderStatus(id, 'ready');

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-8">
      <header className="flex items-center justify-between mb-8 pb-6 border-b border-stone-800">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center">
            <Flame className="text-orange-500 mr-3" size={32} />
            Kitchen Display System
          </h1>
          <p className="text-stone-400 font-medium mt-1">Live Order Queue</p>
        </div>
        <div className="bg-stone-800 px-4 py-2 rounded-xl flex items-center space-x-2 border border-stone-700">
          <RefreshCw className="text-emerald-400 animate-spin-slow" size={16} />
          <span className="font-bold text-emerald-400 text-sm">{activeOrders.length} Active Orders</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeOrders.length === 0 ? (
          <div className="col-span-full h-64 flex flex-col items-center justify-center text-stone-600 border-2 border-dashed border-stone-800 rounded-2xl">
            <CheckCircle2 size={48} className="mb-4 opacity-50" />
            <h3 className="text-xl font-bold">Kitchen is clear</h3>
            <p>No active orders right now.</p>
          </div>
        ) : (
          activeOrders.map((order) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={order.id}
              className={`rounded-2xl border-l-4 shadow-xl overflow-hidden bg-stone-800 flex flex-col ${
                order.status === 'pending' ? 'border-l-amber-500' : 'border-l-blue-500'
              }`}
            >
              <div className={`px-5 py-4 flex justify-between items-center ${
                order.status === 'pending' ? 'bg-amber-500/10' : 'bg-blue-500/10'
              }`}>
                <div>
                  <h3 className="text-2xl font-black text-white">#{order.id}</h3>
                  <p className="text-sm font-bold mt-1 text-stone-400 flex items-center">
                    {order.tableId ? `Table ${order.tableId}` : order.customerName}
                    <span className="mx-2">•</span>
                    {order.type === 'dine_in' ? 'Dine In' : 'Takeaway'}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className={`text-xs font-bold uppercase px-2 py-1 rounded-md mb-2 ${
                    order.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-bold text-stone-300 flex items-center">
                    <Clock size={14} className="mr-1.5" />
                    {Math.floor((new Date().getTime() - order.timePlaced.getTime()) / 60000)}m
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1">
                <ul className="space-y-4">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="font-black text-xl text-stone-300 w-8">{item.quantity}x</span>
                      <div>
                        <span className="font-bold text-lg text-white block leading-tight">{item.name}</span>
                        {item.customizations && item.customizations.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-2">
                            {item.customizations.map((mod, mi) => (
                              <span key={mi} className="text-xs font-bold bg-stone-700 text-stone-300 px-2 py-0.5 rounded-md">
                                {mod}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-t border-stone-700 bg-stone-800/50 mt-auto">
                {order.status === 'pending' ? (
                  <button 
                    onClick={() => startPreparing(order.id)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-stone-900 font-black rounded-xl transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center"
                  >
                    Start Preparing
                  </button>
                ) : (
                  <button 
                    onClick={() => markReady(order.id)}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-black rounded-xl transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center group"
                  >
                    <Loader2 size={18} className="mr-2 animate-spin-slow group-hover:hidden" />
                    Mark Ready for Pickup
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default KitchenPortal;
