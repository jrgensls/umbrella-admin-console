
import React from 'react';

interface CompanyTableHeaderProps {
  selectedCompanies: string[];
  filteredCompaniesLength: number;
  onSelectAll: () => void;
}

export const CompanyTableHeader: React.FC<CompanyTableHeaderProps> = ({
  selectedCompanies,
  filteredCompaniesLength,
  onSelectAll,
}) => {
  return (
    <thead>
      <tr className="text-sm text-[rgba(37,37,37,1)] font-semibold border-black border-t">
        <th className="bg-white w-[47px] px-3 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-center">
          <input
            type="checkbox"
            checked={selectedCompanies.length === filteredCompaniesLength && filteredCompaniesLength > 0}
            onChange={onSelectAll}
            className="rounded border border-[color:var(--checkbox-border-color,#D8D6D4)] bg-white w-[17.5px] h-[17.5px] border-solid"
          />
        </th>
        <th className="bg-white w-[240px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left text-[rgba(26,26,26,1)]">
          Company
        </th>
        <th className="bg-white w-[200px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
          Contact
        </th>
        <th className="bg-white w-[120px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
          Size
        </th>
        <th className="bg-white w-[200px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
          Workspaces
        </th>
        <th className="bg-white w-[120px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
          Tier
        </th>
        <th className="bg-white w-[120px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
          Status
        </th>
        <th className="bg-white w-[128px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9]">
        </th>
      </tr>
    </thead>
  );
};
