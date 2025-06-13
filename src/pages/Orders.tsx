
import React from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { OrdersTable } from '@/components/OrdersTable';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';

const Orders = () => {
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
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export to CSV
                </Button>
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Add Order
                </Button>
              </div>
            </div>
            <OrdersTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
