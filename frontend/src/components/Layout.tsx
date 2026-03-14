import { Outlet, Link, useLocation } from 'react-router-dom';
import { Coffee, LayoutDashboard, ListOrdered, Settings, LogOut, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Menu Items', path: '/menu', icon: Coffee },
    { name: 'Active Orders', path: '/orders', icon: ListOrdered },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#fafaf9] text-stone-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-stone-200 flex flex-col shadow-sm z-10">
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-[#8b4513] text-white p-2 rounded-xl">
            <Coffee size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#5c3a21]">CafeFlow</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group overflow-hidden ${
                  isActive 
                    ? 'text-[#8b4513] bg-[#fdf8f6] font-medium' 
                    : 'text-stone-500 hover:bg-[#f2e8e5] hover:text-[#8b4513]'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav-bg"
                    className="absolute inset-0 bg-[#fdf8f6] border border-[#eaddd7] rounded-xl z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center space-x-3 w-full">
                  <Icon size={20} className={isActive ? 'text-[#8b4513]' : 'text-stone-400 group-hover:text-[#8b4513] transition-colors'} />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-stone-200">
          <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-200 flex items-center justify-between px-8 z-10">
          <h1 className="text-2xl font-bold text-stone-800 capitalize tracking-tight">
            {location.pathname === '/' ? 'Dashboard Overview' : location.pathname.substring(1).replace('-', ' ')}
          </h1>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full border border-stone-200 text-stone-500 hover:bg-stone-50 hover:text-stone-800 transition-colors relative">
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              <Bell size={20} />
            </button>
            <div className="flex items-center space-x-3 cursor-pointer p-1.5 pr-4 border border-stone-200 rounded-full hover:bg-stone-50 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Admin" 
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-stone-700 leading-tight">Admin User</span>
                <span className="text-xs text-stone-500 leading-tight">Cafe Owner</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#fafaf9]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
