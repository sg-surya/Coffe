import { create } from 'zustand';

// Temporary mock types
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'cancelled';
export type OrderType = 'dine_in' | 'takeaway';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  customizations?: string[];
}

export interface Order {
  id: string;
  tableId?: string;
  customerName?: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  timePlaced: Date;
  timeUpdated: Date;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [
    {
      id: '1001',
      tableId: 'T4',
      type: 'dine_in',
      status: 'preparing',
      items: [
        { id: '1', name: 'Espresso Macchiato', quantity: 2, price: 4.5 },
        { id: '3', name: 'Avocado Toast', quantity: 1, price: 9.8 }
      ],
      total: 18.8,
      timePlaced: new Date(Date.now() - 4 * 60000), // 4 mins ago
      timeUpdated: new Date()
    },
    {
      id: '1002',
      customerName: 'Alice',
      type: 'takeaway',
      status: 'pending',
      items: [
        { id: '2', name: 'Vanilla Latte', quantity: 1, price: 5.2, customizations: ['Less Sugar', 'Oat Milk'] },
        { id: '4', name: 'Chocolate Croissant', quantity: 1, price: 3.5 }
      ],
      total: 8.7,
      timePlaced: new Date(Date.now() - 1 * 60000), // 1 min ago
      timeUpdated: new Date()
    }
  ],
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === id ? { ...order, status, timeUpdated: new Date() } : order
    )
  })),
  clearOrders: () => set({ orders: [] })
}));
