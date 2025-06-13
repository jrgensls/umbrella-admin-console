
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Settings, Home, Plus } from 'lucide-react';
import { OrderFilterBar } from '@/components/OrderFilterBar';

// Mock data based on the screenshot
const ordersData = [
  {
    id: '1',
    name: 'Møllerup Gods',
    vatNumber: 'DK12345678',
    phone: '+1234567890',
    email: 'info@moellerup.dk',
    address: 'Møllerupvej 26',
    city: '8410 Rønde, Denmark'
  },
  {
    id: '2',
    name: 'Kirstinelund',
    vatNumber: '987654321',
    phone: '+0987654321',
    email: 'info@kirtinelund.dk',
    address: 'Skæringvej 88',
    city: '8520 Lystrup'
  },
  {
    id: '3',
    name: 'Workspace X',
    vatNumber: '564738291',
    phone: '+1122334455',
    email: 'hello@workspacex.com',
    address: '789 Creativity Ave',
    city: 'Creative Town'
  },
  {
    id: '4',
    name: 'Bloxhub',
    vatNumber: '564738291',
    phone: '+1122334455',
    email: 'info@bloxhub.dk',
    address: '789 Creativity Ave',
    city: 'Copenhagen'
  }
];

export const OrdersTable = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = ordersData.filter(order =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="bg-white shadow-sm">
      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="flex items-center gap-2 text-blue-600 border-b-2 border-blue-600 rounded-none pb-2">
              <Home className="h-4 w-4" />
              All
            </Button>
            <Button variant="ghost" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" className="flex items-center gap-2 text-blue-600">
            <Settings className="h-4 w-4" />
            View settings
          </Button>
        </div>

        {/* Filter Bar */}
        <OrderFilterBar onFilterChange={() => {}} />

        {/* Search Bar */}
        <div className="flex items-center justify-between mb-4 mt-4">
          <div className="flex items-center gap-4">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>Name</option>
              <option>Email</option>
              <option>City</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>Descending</option>
              <option>Ascending</option>
            </select>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search ...( press enter to submit )"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-80"
            />
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-gray-600">Active filters</span>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              Date activated
            </span>
            <div className="w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              1
            </div>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-700 font-medium">Name</TableHead>
              <TableHead className="text-gray-700 font-medium">VAT Number</TableHead>
              <TableHead className="text-gray-700 font-medium">Phone</TableHead>
              <TableHead className="text-gray-700 font-medium">Email</TableHead>
              <TableHead className="text-gray-700 font-medium">Address</TableHead>
              <TableHead className="text-gray-700 font-medium">City</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{order.name}</TableCell>
                <TableCell className="text-gray-600">{order.vatNumber}</TableCell>
                <TableCell className="text-gray-600">{order.phone}</TableCell>
                <TableCell>
                  <a href={`mailto:${order.email}`} className="text-blue-600 hover:underline">
                    {order.email}
                  </a>
                </TableCell>
                <TableCell className="text-gray-600">{order.address}</TableCell>
                <TableCell className="text-gray-600">{order.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
