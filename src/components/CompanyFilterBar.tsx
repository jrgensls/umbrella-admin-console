
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
        <div className="flex w-full gap-5 flex-wrap justify-between max-md:max-w-full">
          <div className="flex items-stretch gap-[15px] flex-wrap">
            {/* Industry Filter */}
            <div className="flex">
              <div className="w-full flex-1 shrink basis-[0%]">
                <div className="items-stretch border border-[color:var(--select-border-color,#CBD5E1)] shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)] flex w-full bg-white rounded-md border-solid">
                  <div className="items-center flex min-h-[31px] text-sm text-slate-700 font-normal whitespace-nowrap flex-1 shrink basis-[0%] my-auto">
                    <select
                      value={filters.industry}
                      onChange={(e) => handleFilterChange('industry', e.target.value)}
                      className="text-slate-700 flex-1 shrink basis-[0%] self-stretch w-full overflow-hidden my-auto bg-transparent border-none outline-none px-3"
                    >
                      <option value="All Industries">All Industries</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Design">Design</option>
                      <option value="Legal">Legal</option>
                    </select>
                  </div>
                  <div className="justify-center items-center rounded-[0px_var(--select-border-radius,6px)_var(--select-border-radius,6px)_0px] flex h-full w-[35px]">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/42ab7e45ea8d8c1d41e83cdacd5762deee03479d?placeholderIfAbsent=true"
                      alt="Dropdown arrow"
                      className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Tier Filter */}
            <div className="flex">
              <div className="w-full flex-1 shrink basis-[0%]">
                <div className="items-stretch border border-[color:var(--select-border-color,#CBD5E1)] shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)] flex w-full bg-white rounded-md border-solid">
                  <div className="items-center flex min-h-[31px] text-sm text-slate-700 font-normal whitespace-nowrap flex-1 shrink basis-[0%] my-auto">
                    <select
                      value={filters.membershipTier}
                      onChange={(e) => handleFilterChange('membershipTier', e.target.value)}
                      className="text-slate-700 flex-1 shrink basis-[0%] self-stretch w-full overflow-hidden my-auto bg-transparent border-none outline-none px-3"
                    >
                      <option value="All Tiers">All Tiers</option>
                      <option value="basic">Basic</option>
                      <option value="premium">Premium</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div className="justify-center items-center rounded-[0px_var(--select-border-radius,6px)_var(--select-border-radius,6px)_0px] flex h-full w-[35px]">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/42ab7e45ea8d8c1d41e83cdacd5762deee03479d?placeholderIfAbsent=true"
                      alt="Dropdown arrow"
                      className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Workspace Filter */}
            <div className="flex">
              <div className="w-full flex-1 shrink basis-[0%]">
                <div className="items-stretch border border-[color:var(--select-border-color,#CBD5E1)] shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)] flex w-full bg-white rounded-md border-solid">
                  <div className="items-center flex min-h-[31px] text-sm text-slate-700 font-normal whitespace-nowrap flex-1 shrink basis-[0%] my-auto">
                    <select
                      value={filters.workspace}
                      onChange={(e) => handleFilterChange('workspace', e.target.value)}
                      className="text-slate-700 flex-1 shrink basis-[0%] self-stretch w-full overflow-hidden my-auto bg-transparent border-none outline-none px-3"
                    >
                      <option value="All Locations">All Locations</option>
                      <option value="Kristinelund">Kristinelund</option>
                      <option value="Mollerup Gods">Mollerup Gods</option>
                      <option value="Brain Embassy">Brain Embassy</option>
                      <option value="Groska">Groska</option>
                      <option value="Wintercircus">Wintercircus</option>
                    </select>
                  </div>
                  <div className="justify-center items-center rounded-[0px_var(--select-border-radius,6px)_var(--select-border-radius,6px)_0px] flex h-full w-[35px]">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/42ab7e45ea8d8c1d41e83cdacd5762deee03479d?placeholderIfAbsent=true"
                      alt="Dropdown arrow"
                      className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-location Toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="multiLocation"
                checked={filters.multiLocationOnly}
                onChange={(e) => handleFilterChange('multiLocationOnly', e.target.checked)}
                className="w-4 h-4 text-[#214BCD] bg-gray-100 border-gray-300 rounded focus:ring-[#214BCD] focus:ring-2"
              />
              <label htmlFor="multiLocation" className="text-sm text-slate-700 font-normal">
                Multi-location only
              </label>
            </div>
          </div>

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
