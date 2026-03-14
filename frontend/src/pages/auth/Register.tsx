import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Mail, Lock, ArrowRight, UserCircle, ChefHat, User, ShieldCheck, User as UserIcon, Phone } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ROLES = [
  { id: 'customer', label: 'Customer', icon: User },
  { id: 'waiter', label: 'Waiter', icon: UserCircle },
  { id: 'chef', label: 'Chef', icon: ChefHat },
  { id: 'owner', label: 'Owner', icon: ShieldCheck },
];

const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('owner');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API validation/registration
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-row-reverse">
      {/* Right side column - Image & Branding (Reversed for variation) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#8b4513]">
        <img 
          src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=1447" 
          alt="Cafe interior" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3e2723] via-[#5c3a21]/50 to-transparent" />
        
        <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white w-full items-end text-right">
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold tracking-tight">CafeFlow</span>
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Coffee size={32} className="text-white" />
            </div>
          </div>

          <div className="max-w-md">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold leading-tight mb-6"
            >
              Join the future of cafe management.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-stone-200 font-medium"
            >
              Whether you're a customer ordering ahead or an owner managing staff, we've got you covered.
            </motion.p>
          </div>
          
          <div className="flex items-center space-x-4 text-stone-300 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <span>© 2026 CafeFlow Inc.</span>
          </div>
        </div>
      </div>

      {/* Left side column - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="absolute top-8 left-8 lg:hidden flex items-center space-x-2">
          <Coffee size={24} className="text-[#8b4513]" />
          <span className="text-xl font-bold text-[#5c3a21]">CafeFlow</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-stone-800 mb-3 tracking-tight">Create an account</h2>
            <p className="text-stone-500">Sign up to get started with CafeFlow</p>
          </div>

          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-stone-700 mb-3">I am registering as</label>
            <div className="grid grid-cols-4 gap-2 p-1 bg-stone-100 rounded-xl">
              {ROLES.map((role) => {
                const isSelected = selectedRole === role.id;
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
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

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Full Name</label>
              <div className="relative group">
                <div className="absolute items-center inset-y-0 left-0 flex pl-4 pointer-events-none text-stone-400 group-focus-within:text-[#8b4513] transition-colors">
                  <UserIcon size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#8b4513]/20 focus:border-[#8b4513] transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Email address</label>
                <div className="relative group">
                  <div className="absolute items-center inset-y-0 left-0 flex pl-3 pointer-events-none text-stone-400 group-focus-within:text-[#8b4513] transition-colors">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#8b4513]/20 focus:border-[#8b4513] transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Phone Number</label>
                <div className="relative group">
                  <div className="absolute items-center inset-y-0 left-0 flex pl-3 pointer-events-none text-stone-400 group-focus-within:text-[#8b4513] transition-colors">
                    <Phone size={16} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#8b4513]/20 focus:border-[#8b4513] transition-all text-sm"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute items-center inset-y-0 left-0 flex pl-4 pointer-events-none text-stone-400 group-focus-within:text-[#8b4513] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#8b4513]/20 focus:border-[#8b4513] transition-all"
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 mt-8 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-stone-800 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <div className={`absolute inset-0 w-full h-full bg-white/10 -translate-x-full ${isLoading ? 'animate-[shimmer_1.5s_infinite]' : ''}`} />
              <span className="flex items-center">
                {isLoading ? 'Creating account...' : 'Complete Registration'}
                {!isLoading && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-stone-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-stone-800 hover:text-stone-900 font-bold border-b border-stone-800 pb-0.5">
              Sign in instead
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
