
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type OrderFilterState } from '@/pages/Orders';

interface Order {
  id: string;
  order_number: string;
  date: string;
  company_name: string;
  company_email: string;
  company_phone: string | null;
  company_vat_number: string | null;
  company_address: string | null;
  contact_person: string | null;
  workspace_name: string;
  reference: string | null;
  total_amount: number;
  currency: string;
  status: string;
}

interface OrdersTableProps {
  filters: OrderFilterState;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ filters }) => {
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders', filters],
    queryFn: async () => {
      console.log('Fetching orders with filters:', filters);
      
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: filters.sortOrder === 'ascending' });

      // Apply search filter
      if (filters.searchQuery.trim()) {
        query = query.or(`company_name.ilike.%${filters.searchQuery}%,company_email.ilike.%${filters.searchQuery}%,workspace_name.ilike.%${filters.searchQuery}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }
      
      console.log('Fetched orders:', data);
      return data as Order[];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[490px] w-full mt-4 bg-white border rounded-lg shadow-sm flex items-center justify-center">
        <div className="text-gray-500">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[490px] w-full mt-4 bg-white border rounded-lg shadow-sm flex items-center justify-center">
        <div className="text-red-500">Error loading orders: {error.message}</div>
      </div>
    );
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: currency || 'DKK',
    }).format(amount / 100); // Convert from cents to actual amount
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800' },
      invoiced: { label: 'Invoiced', className: 'bg-blue-100 text-blue-800' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
      refunded: { label: 'Refunded', className: 'bg-gray-100 text-gray-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-[490px] w-full mt-4 bg-white border rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-gray-700">Order #</TableHead>
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="font-semibold text-gray-700">Company</TableHead>
            <TableHead className="font-semibold text-gray-700">Contact</TableHead>
            <TableHead className="font-semibold text-gray-700">Workspace</TableHead>
            <TableHead className="font-semibold text-gray-700">Amount</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700">Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{order.order_number}</TableCell>
                <TableCell className="text-gray-600">{formatDate(order.date)}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.company_name}</div>
                    <div className="text-sm text-gray-500">
                      <a href={`mailto:${order.company_email}`} className="text-blue-600 hover:underline">
                        {order.company_email}
                      </a>
                    </div>
                    {order.company_vat_number && (
                      <div className="text-xs text-gray-400">VAT: {order.company_vat_number}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">
                  {order.contact_person && (
                    <div className="text-sm font-medium">{order.contact_person}</div>
                  )}
                  {order.company_phone && (
                    <div className="text-xs text-gray-500">{order.company_phone}</div>
                  )}
                </TableCell>
                <TableCell className="text-gray-600">{order.workspace_name}</TableCell>
                <TableCell className="font-medium">
                  {formatAmount(order.total_amount, order.currency)}
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-gray-600 max-w-[200px] truncate">
                  {order.reference || '-'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
