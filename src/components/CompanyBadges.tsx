
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CompanyBadgesProps {
  status: string;
  tier: string;
}

export const CompanyBadges: React.FC<CompanyBadgesProps> = ({ status, tier }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Badge className={`text-xs font-medium ${getTierColor(tier)}`}>
        {tier.charAt(0).toUpperCase() + tier.slice(1)}
      </Badge>
      <Badge className={`text-xs font-medium ${getStatusColor(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    </>
  );
};
