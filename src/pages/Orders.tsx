
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
    <div className="bg-[rgba(247,249,252,1)] flex flex-col overflow-hidden min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <div className="z-10 flex w-full max-w-[1706px] flex-col items-stretch max-md:max-w-full">
            {/* Page Header */}
            <div className="flex w-full max-w-[1681px] items-stretch gap-5 flex-wrap justify-between p-6 max-md:max-w-full">
              <h1 className="text-black text-[40px] font-semibold max-md:max-w-full">
                Umbrella Orders
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-[#214BCD] text-[#214BCD] text-sm font-semibold rounded-md hover:bg-blue-50 transition-colors">
                  Export to CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  Add Order
                </button>
              </div>
            </div>
            <div className="px-6">
              <OrderFilterBar filters={filters} onFilterChange={handleFilterChange} />
              <OrdersTable filters={filters} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;

