import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CustomerPortal from './pages/portals/CustomerPortal';
import KitchenPortal from './pages/portals/KitchenPortal';
import WaiterPortal from './pages/portals/WaiterPortal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dedicated Portals */}
        <Route path="/customer" element={<CustomerPortal />} />
        <Route path="/chef" element={<KitchenPortal />} />
        <Route path="/waiter" element={<WaiterPortal />} />
        
        {/* Admin/Owner Dashboard */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
