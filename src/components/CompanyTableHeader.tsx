
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
    <thead className="flex w-full text-sm text-[rgba(37,37,37,1)] font-semibold flex-wrap border-black border-t max-md:max-w-full">
      <tr className="flex w-full">
        <th className="bg-white flex min-h-[38px] gap-[7px] py-[11px] border-[0.5px] border-solid border-[#B9B9B9] w-[47px]">
          <div className="self-stretch flex w-[13px] items-center my-auto">
            <div className="self-stretch flex w-[18px] items-center gap-[7px] my-auto rounded-md">
              <input
                type="checkbox"
                checked={selectedCompanies.length === filteredCompaniesLength && filteredCompaniesLength > 0}
                onChange={onSelectAll}
                className="rounded border border-[color:var(--checkbox-border-color,#D8D6D4)] bg-white self-stretch flex min-h-[18px] w-[17.5px] h-[17.5px] my-auto border-solid"
              />
            </div>
          </div>
        </th>
        <th className="items-center bg-white flex min-w-60 gap-[7px] text-[rgba(26,26,26,1)] flex-1 shrink basis-[0%] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9]">
          <div className="self-stretch my-auto">Company</div>
        </th>
        <th className="bg-white min-w-40 flex-1 shrink basis-[0%] gap-[7px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
          Contact
        </th>
        <th className="bg-white min-w-32 flex-1 shrink basis-[0%] gap-[7px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
          Size
        </th>
        <th className="bg-white min-w-40 flex-1 shrink basis-[0%] gap-[7px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
          Workspaces
        </th>
        <th className="bg-white min-w-32 flex-1 shrink basis-[0%] gap-[7px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
          Tier
        </th>
        <th className="bg-white min-w-32 flex-1 shrink basis-[0%] gap-[7px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
          Status
        </th>
        <th className="bg-white flex w-32 shrink-0 h-[38px] gap-[7px] py-[11px] border-[0.5px] border-solid border-[#B9B9B9]">
        </th>
      </tr>
    </thead>
  );
};
