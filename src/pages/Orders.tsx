
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { OrdersTable } from '@/components/OrdersTable';
import { OrderFilterBar } from '@/components/OrderFilterBar';

export interface OrderFilterState {
  searchQuery: string;
  dateFilter: string;
  sortOrder: 'ascending' | 'descending';
}

const Orders = () => {
  const [filters, setFilters] = useState<OrderFilterState>({
    searchQuery: '',
    dateFilter: 'Date',
    sortOrder: 'descending',
  });

  const handleFilterChange = (newFilters: OrderFilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-foreground">Umbrella Orders</h1>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm font-semibold border-[#214BCD] text-[#214BCD] hover:bg-blue-50 transition-colors">
                  Export to CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  Add Order
                </button>
              </div>
            </div>
            <OrderFilterBar filters={filters} onFilterChange={handleFilterChange} />
            <OrdersTable filters={filters} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
