
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type OrderFilterState } from '@/pages/Orders';

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

interface OrdersTableProps {
  filters: OrderFilterState;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ filters }) => {
  const { searchQuery, dateFilter, sortOrder } = filters;

  let filteredOrders = ordersData.filter(order =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting
  if (sortOrder === 'ascending') {
    filteredOrders = filteredOrders.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filteredOrders = filteredOrders.slice().sort((a, b) => b.name.localeCompare(a.name));
  }

  // For "dateFilter", in a real app, you'd filter dates, but here we just show the control.

  // Render table
  return (
    <div className="min-h-[490px] w-full mt-4 bg-white border rounded-lg shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">VAT Number</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">Phone</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">Address</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">City</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-3 font-medium">{order.name}</td>
              <td className="px-6 py-3 text-gray-600">{order.vatNumber}</td>
              <td className="px-6 py-3 text-gray-600">{order.phone}</td>
              <td className="px-6 py-3">
                <a href={`mailto:${order.email}`} className="text-blue-600 hover:underline">
                  {order.email}
                </a>
              </td>
              <td className="px-6 py-3 text-gray-600">{order.address}</td>
              <td className="px-6 py-3 text-gray-600">{order.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
