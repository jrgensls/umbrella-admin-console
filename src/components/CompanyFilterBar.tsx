
import React, { useState } from 'react';
import { CompanyFilterState } from '@/lib/types';

interface CompanyFilterBarProps {
  onFilterChange?: (filters: CompanyFilterState) => void;
}

export const CompanyFilterBar: React.FC<CompanyFilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<CompanyFilterState>({
    searchQuery: '',
    industry: 'All Industries',
    membershipTier: 'All Tiers',
    workspace: 'All Locations',
    multiLocationOnly: false,
    status: 'All Status',
    sortOrder: 'descending',
  });

  const handleFilterChange = (key: keyof CompanyFilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== 'All Industries' && value !== 'All Tiers' && value !== 'All Locations' && value !== 'All Status' && value !== false
  ).length;

  return (
    <section className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border flex flex-col items-stretch mt-2.5 pt-1.5 pb-[20px] px-[13px] rounded-[1px] border-[rgba(202,202,202,1)] border-solid max-md:max-w-full max-md:mr-2.5 max-md:pr-5">
      <div className="w-full max-md:max-w-full">
        <div className="flex w-full gap-5 flex-wrap justify-end max-md:max-w-full">
          <div className="flex gap-[40px_43px] max-md:max-w-full">
            {/* Search Input */}
            <div className="text-sm text-[#1b1f26] font-normal grow shrink-0 basis-0 w-fit">
              <div className="items-center border border-[color:var(--Grays-Gray-6,#F2F2F7)] shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)] bg-white flex w-full gap-[11px] pr-[var(--inputtext-padding-x,] pl-[}] pt-[7px)] pb-[10.5px;] rounded-md border-solid">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/163789cef5db25537f5848267abf7ab1935482a8?placeholderIfAbsent=true"
                  alt="Search icon"
                  className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  placeholder="Search companies..."
                  className="self-stretch min-w-60 flex-1 shrink basis-[0%] my-auto bg-transparent border-none outline-none text-ellipsis"
                />
              </div>
            </div>

            <div className="flex gap-2.5">
              {activeFiltersCount > 0 && (
                <div className="text-white text-[9px] font-bold min-w-[17.5px] border-[color:var(--overlaybadge-outline-color,#FFF)] min-h-[18px] whitespace-nowrap w-[18px] h-[18px] bg-[#214BCD] rounded-[10.5px] border-2 border-solid flex items-center justify-center">
                  {activeFiltersCount}
                </div>
              )}
              <button className="items-stretch flex min-h-[21px] pr-[var(--border-radius-none,] pl-[var(--border-radius-none,] mt-[9px] pt-0 pb-[0px)] rounded-md">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/1ea2f3b8c4edb141b22ce0db2c32ee2f503031f2?placeholderIfAbsent=true"
                  alt="Filter options"
                  className="aspect-[1] object-contain w-[21px] flex-1 shrink basis-[0%]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
