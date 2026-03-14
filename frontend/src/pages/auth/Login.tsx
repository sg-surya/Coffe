import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Mail, Lock, ArrowRight, UserCircle, ChefHat, User, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ROLES = [
  { id: 'customer', label: 'Customer', icon: User },
  { id: 'waiter', label: 'Waiter', icon: UserCircle },
  { id: 'chef', label: 'Chef', icon: ChefHat },
  { id: 'owner', label: 'Owner', icon: ShieldCheck },
];

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('owner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for premium effect
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex">
      {/* Left side column - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#3e2723]">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1447" 
          alt="Coffee shop background" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#27170f] via-[#3e2723]/60 to-transparent" />
        
        <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Coffee size={32} className="text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight">CafeFlow</span>
          </div>

          <div className="max-w-md">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold leading-tight mb-6"
            >
              Streamline your coffee shop operations.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-stone-300 font-medium"
            >
              The complete management system for cafes with advanced POS, kitchen display, and analytics.
            </motion.p>
          </div>
          
          <div className="flex items-center space-x-4 text-stone-300 text-sm">
            <span>© 2026 CafeFlow Inc.</span>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Right side column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="absolute top-8 right-8 lg:hidden flex items-center space-x-2">
          <Coffee size={24} className="text-[#8b4513]" />
          <span className="text-xl font-bold text-[#5c3a21]">CafeFlow</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-3 tracking-tight">Welcome back</h2>
            <p className="text-stone-500">Sign in to your account to continue</p>
          </div>

          {/* Role Selection Tabs */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-stone-700 mb-3">Login as</label>
            <div className="grid grid-cols-4 gap-2 p-1 bg-stone-100 rounded-xl">
              {ROLES.map((role) => {
                const isSelected = selectedRole === role.id;
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold transition-all ${
                      isSelected 
                        ? 'bg-white text-[#8b4513] shadow-sm' 
                        : 'text-stone-500 hover:bg-stone-200/50'
                    }`}
                  >
                    <Icon size={18} className="mb-1" />
                    {role.label}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Email address</label>
                <div className="relative group">
                  <div className="absolute items-center inset-y-0 left-0 flex pl-4 pointer-events-none text-stone-400 group-focus-within:text-[#8b4513] transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#8b4513]/20 focus:border-[#8b4513] transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-stone-700">Password</label>
                  <a href="#" className="text-sm font-semibold text-[#8b4513] hover:text-[#6b3e2e] transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute items-center inset-y-0 left-0 flex pl-4 pointer-events-none text-stone-400 group-focus-within:text-[#8b4513] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#8b4513]/20 focus:border-[#8b4513] transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#8b4513] hover:bg-[#6b3e2e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b4513] transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <div className={`absolute inset-0 w-full h-full bg-white/20 -translate-x-full ${isLoading ? 'animate-[shimmer_1.5s_infinite]' : ''}`} />
              <span className="flex items-center">
                {isLoading ? 'Signing in...' : 'Sign in to dashboard'}
                {!isLoading && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-stone-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#8b4513] hover:text-[#6b3e2e] font-bold">
              Register now
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
