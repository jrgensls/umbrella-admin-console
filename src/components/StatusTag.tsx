import React from 'react';
import { cn } from '@/lib/utils';

interface StatusTagProps {
  status: 'pending' | 'active' | 'deactivated';
  className?: string;
}

export const StatusTag: React.FC<StatusTagProps> = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'text-[#214BCD] bg-blue-100';
      case 'active':
        return 'text-green-800 bg-green-200';
      case 'deactivated':
        return 'text-orange-700 bg-orange-200';
      default:
        return 'text-gray-700 bg-gray-200';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'active':
        return 'Active';
      case 'deactivated':
        return 'Deactivated';
      default:
        return status;
    }
  };

  return (
    <div
      className={cn(
        'text-xs font-bold gap-[3.5px] px-[7px] py-1 rounded-xl',
        getStatusStyles(),
        className
      )}
    >
      {getStatusLabel()}
    </div>
  );
};
