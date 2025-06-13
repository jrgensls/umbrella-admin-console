
import React from 'react';
import { Company } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { CompanyActions } from './CompanyActions';

interface CompanyTableRowProps {
  company: Company;
  isSelected: boolean;
  onSelect: (companyId: string) => void;
}

export const CompanyTableRow: React.FC<CompanyTableRowProps> = ({
  company,
  isSelected,
  onSelect,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const displayEmployeeCount = (employeeCount: string | number) => {
    if (typeof employeeCount === 'string') {
      return employeeCount === 'Not specified' ? 'Not specified' : employeeCount;
    }
    return `${employeeCount} employees`;
  };

  return (
    <tr className="bg-white border border-[rgba(201,201,201,1)] border-solid">
      <td className="w-[47px] px-3 py-[11px] border-[rgba(219,219,219,1)] border-b text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(company.id)}
          className="rounded border border-[color:var(--checkbox-border-color,#D8D6D4)] bg-white w-[17.5px] h-[17.5px] border-solid"
        />
      </td>
      <td className="w-[240px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        <div className="flex flex-col">
          <div className="font-medium text-sm text-neutral-800">{company.name}</div>
          <div className="text-xs text-gray-500">Start date: {formatDate(company.memberSince)}</div>
        </div>
      </td>
      <td className="w-[200px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        <div className="flex flex-col">
          {company.primaryContact && company.primaryContact.trim() !== '' && (
            <div className="font-medium text-sm text-neutral-800">{company.primaryContact}</div>
          )}
          <div className="text-xs text-gray-500">{company.contactEmail}</div>
        </div>
      </td>
      <td className="w-[120px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b text-sm text-neutral-800">
        {displayEmployeeCount(company.employeeCount)}
      </td>
      <td className="w-[200px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        <div className="flex flex-col gap-1">
          {company.isMultiLocation && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 w-fit">
              Multi-location ({company.workspaces.length})
            </Badge>
          )}
          <div className="text-xs text-gray-600">
            {company.workspaces.join(', ')}
          </div>
        </div>
      </td>
      <td className="w-[120px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        <Badge className={`text-xs font-medium ${getStatusColor(company.status)}`}>
          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
        </Badge>
      </td>
      <td className="w-[128px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        <CompanyActions />
      </td>
    </tr>
  );
};
