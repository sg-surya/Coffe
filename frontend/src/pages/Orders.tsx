import { motion } from 'framer-motion';
import { Clock, CheckCircle2, ChevronRight, Check } from 'lucide-react';

const ORDERS = [
  { id: '1001', table: 'T4', status: 'preparing', time: '4m', items: ['2x Espresso Macchiato', '1x Avocado Toast'], total: 28.5 },
  { id: '1002', table: 'T2', status: 'pending', time: '1m', items: ['1x Vanilla Latte', '1x Chocolate Croissant'], total: 8.7 },
  { id: '1003', table: 'T8', status: 'ready', time: '8m', items: ['2x Iced Caramel Macchiato'], total: 11.6 },
  { id: '1004', table: 'T1', status: 'preparing', time: '6m', items: ['1x Matcha Latte', '2x Avocado Toast'], total: 25.6 },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending': return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-bold uppercase tracking-wider">Pending</span>;
    case 'preparing': return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>Preparing</span>;
    case 'ready': return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center"><CheckCircle2 size={12} className="mr-1" />Ready</span>;
    default: return null;
  }
};

const Orders = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {['Active Orders', 'Completed', 'Cancelled'].map((tab, i) => (
            <button
              key={tab}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-colors ${
                i === 0 
                  ? 'bg-stone-800 text-white shadow-md' 
                  : 'bg-white text-stone-500 hover:bg-stone-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-xl border border-rose-100 shadow-sm">
          <span className="relative flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <span className="text-sm font-bold">2 Delayed Orders</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {ORDERS.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`bg-white rounded-2xl border ${
              order.status === 'ready' ? 'border-emerald-200' : 'border-stone-200'
            } p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}
          >
            {/* Status Background Accent */}
            <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl rounded-bl-full ${
              order.status === 'ready' ? 'bg-emerald-100/50' : 
              order.status === 'preparing' ? 'bg-blue-100/50' : 
              'bg-amber-100/50'
            } -z-10`} />

            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm ${
                  order.status === 'ready' ? 'bg-emerald-50 text-emerald-600' :
                  order.status === 'preparing' ? 'bg-[#fdf8f6] text-[#8b4513]' :
                  'bg-stone-50 text-stone-600'
                }`}>
                  {order.table}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-800">Order #{order.id}</h3>
                  <div className="flex items-center mt-1 text-sm font-medium text-stone-500">
                    <Clock size={14} className="mr-1.5" />
                    <span>{order.time} elapsed</span>
                  </div>
                </div>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="bg-stone-50 rounded-xl p-4 mb-6">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Order Items</h4>
              <ul className="space-y-2">
                {order.items.map((item, i) => (
                  <li key={i} className="flex items-center text-sm font-medium text-stone-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-300 mr-2.5"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Total Amount</span>
                <span className="text-2xl font-black text-stone-800">${order.total.toFixed(2)}</span>
              </div>
              
              <div className="flex space-x-3">
                {order.status !== 'ready' && (
                  <button className="px-4 py-2 bg-white border border-stone-200 text-stone-700 font-bold rounded-xl hover:bg-stone-50 transition-colors shadow-sm text-sm">
                    View Details
                  </button>
                )}
                <button className={`px-6 py-2.5 rounded-xl font-bold flex items-center shadow-sm text-white text-sm transition-all ${
                  order.status === 'pending' ? 'bg-[#8b4513] hover:bg-[#6b3e2e]' :
                  order.status === 'preparing' ? 'bg-emerald-600 hover:bg-emerald-700' :
                  'bg-stone-800 hover:bg-black'
                }`}>
                  {order.status === 'pending' ? 'Accept Order' :
                   order.status === 'preparing' ? 'Mark as Ready' : 'Mark Served'}
                  {order.status === 'preparing' ? <Check size={16} className="ml-2" /> : <ChevronRight size={16} className="ml-2" />}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
