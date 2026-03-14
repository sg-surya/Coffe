import { create } from 'zustand';

export type TableStatus = 'available' | 'occupied' | 'reserved';

export interface Table {
  id: string;
  number: string;
  capacity: number;
  status: TableStatus;
  waiterId?: string;
  activeOrderId?: string;
}

interface TableStore {
  tables: Table[];
  updateTableStatus: (id: string, status: TableStatus, orderId?: string) => void;
  assignWaiter: (id: string, waiterId: string) => void;
}

export const useTableStore = create<TableStore>((set) => ({
  tables: Array.from({ length: 12 }, (_, i) => ({
    id: `table_${i + 1}`,
    number: `T${i + 1}`,
    capacity: i < 4 ? 2 : i < 8 ? 4 : 6,
    status: i === 3 ? 'occupied' : i === 7 ? 'reserved' : 'available',
    activeOrderId: i === 3 ? '1001' : undefined
  })),
  
  updateTableStatus: (id, status, orderId) => set((state) => ({
    tables: state.tables.map(table => 
      table.id === id ? { ...table, status, activeOrderId: orderId } : table
    )
  })),
  
  assignWaiter: (id, waiterId) => set((state) => ({
    tables: state.tables.map(table => 
      table.id === id ? { ...table, waiterId } : table
    )
  }))
}));
