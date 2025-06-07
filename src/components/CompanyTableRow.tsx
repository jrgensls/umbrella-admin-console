
import React from 'react';
import { Company } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { CompanyBadges } from './CompanyBadges';
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
  return (
    <tr className="bg-white border flex w-full flex-wrap border-[rgba(201,201,201,1)] border-solid max-md:max-w-full">
      <td className="flex items-center gap-[7px] w-[47px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        <div className="self-stretch flex w-[13px] items-center my-auto">
          <div className="self-stretch flex w-[18px] items-center gap-[7px] my-auto rounded-md">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(company.id)}
              className="rounded border border-[color:var(--checkbox-border-color,#D8D6D4)] bg-white self-stretch flex min-h-[18px] w-[17.5px] h-[17.5px] my-auto border-solid"
            />
          </div>
        </div>
      </td>
      <td className="flex min-w-60 items-center gap-3 text-sm text-neutral-800 font-normal px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        <div className="flex flex-col">
          <div className="font-medium">{company.name}</div>
          <div className="text-xs text-gray-500">Since {new Date(company.memberSince).getFullYear()}</div>
        </div>
      </td>
      <td className="flex items-center text-sm text-neutral-800 font-normal px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        <div className="flex flex-col">
          <div className="font-medium">{company.primaryContact}</div>
          <div className="text-xs text-gray-500">{company.contactEmail}</div>
        </div>
      </td>
      <td className="flex items-center text-sm text-neutral-800 font-normal px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        {company.employeeCount} employees
      </td>
      <td className="flex items-center text-sm text-neutral-800 font-normal px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        <div className="flex flex-col gap-1">
          {company.isMultiLocation && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              Multi-location ({company.workspaces.length})
            </Badge>
          )}
          <div className="text-xs text-gray-600">
            {company.workspaces.join(', ')}
          </div>
        </div>
      </td>
      <td className="flex items-center px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        <CompanyBadges status={company.status} tier={company.membershipTier} />
      </td>
      <td className="flex items-center px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
      </td>
      <td className="flex items-center gap-[7px] w-32 px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
        <CompanyActions />
      </td>
    </tr>
  );
};
