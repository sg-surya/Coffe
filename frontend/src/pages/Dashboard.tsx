import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Activity, FileText } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, isPositive, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/60 flex items-center justify-between group hover:shadow-md transition-shadow"
  >
    <div>
      <p className="text-sm font-medium text-stone-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-stone-800">{value}</h3>
      <div className="flex items-center space-x-2 mt-3 text-sm">
        <span className={`px-2 py-1 flex items-center rounded-md font-medium ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          <TrendingUp size={14} className={`mr-1 ${!isPositive && 'rotate-180'}`} />
          {trend}
        </span>
        <span className="text-stone-400">vs last week</span>
      </div>
    </div>
    <div className={`p-4 rounded-xl ${isPositive ? 'bg-[#fdf8f6] text-[#8b4513]' : 'bg-stone-50 text-stone-400'} group-hover:scale-110 transition-transform`}>
      <Icon size={28} />
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$12,450" icon={DollarSign} trend="+12.5%" isPositive={true} delay={0.1} />
        <StatCard title="Total Orders" value="342" icon={FileText} trend="+8.2%" isPositive={true} delay={0.2} />
        <StatCard title="Active Waiters" value="12" icon={Users} trend="0%" isPositive={true} delay={0.3} />
        <StatCard title="Customer Traffic" value="894" icon={Activity} trend="-2.4%" isPositive={false} delay={0.4} />
      </div>

      {/* Recent Activity & Charts sections Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-stone-200/60 p-6 min-h-[400px]"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-stone-800 tracking-tight">Revenue Overview</h3>
            <select className="bg-stone-50 text-stone-600 text-sm px-3 py-1.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8b4513]">
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          {/* Chart placeholder */}
          <div className="h-full flex items-center justify-center border-2 border-dashed border-stone-100 rounded-xl bg-stone-50/50">
            <span className="text-stone-400 flex flex-col items-center">
              <Activity size={32} className="mb-2 opacity-50" />
              Chart Data Rendering...
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-stone-200/60 p-6"
        >
          <h3 className="text-lg font-bold text-stone-800 tracking-tight mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#f2e8e5] text-[#8b4513] font-bold px-3 py-2 rounded-lg text-sm">
                    T{Math.floor(Math.random() * 10) + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-800">Order #{1000 + i}</h4>
                    <p className="text-xs text-stone-500 mt-0.5">2 Mins ago • Dine-in</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-stone-800">${(Math.random() * 50 + 10).toFixed(2)}</span>
                  <div className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                    Preparing
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
