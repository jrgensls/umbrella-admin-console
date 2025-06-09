
import React, { useState } from 'react';
import { FilterState } from '@/lib/types';

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    dateFilter: 'Date',
    sortOrder: 'descending',
    activeFilters: ['Expected date after'],
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, searchQuery: e.target.value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleDateFilterChange = (value: string) => {
    const newFilters = { ...filters, dateFilter: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSortOrderChange = (value: 'ascending' | 'descending') => {
    const newFilters = { ...filters, sortOrder: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <section className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border flex flex-col items-stretch mt-2.5 pt-1.5 pb-4 px-[13px] rounded-[1px] border-[rgba(202,202,202,1)] border-solid max-md:max-w-full max-md:mr-2.5 max-md:pr-5">
      <div className="w-full max-md:max-w-full">
        <div className="flex w-full gap-5 flex-wrap justify-between max-md:max-w-full">
          <div className="flex items-stretch gap-[15px]">
            {/* Date Filter */}
            <div className="flex">
              <div className="w-full flex-1 shrink basis-[0%]">
                <div className="items-stretch border border-[color:var(--select-border-color,#CBD5E1)] shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)] flex w-full bg-white rounded-md border-solid">
                  <div className="items-center flex min-h-[31px] text-sm text-slate-700 font-normal whitespace-nowrap flex-1 shrink basis-[0%] my-auto">
                    <select
                      value={filters.dateFilter}
                      onChange={(e) => handleDateFilterChange(e.target.value)}
                      className="text-slate-700 flex-1 shrink basis-[0%] self-stretch w-full overflow-hidden my-auto bg-transparent border-none outline-none px-3"
                    >
                      <option value="Date">Date</option>
                      <option value="Last 7 days">Last 7 days</option>
                      <option value="Last 30 days">Last 30 days</option>
                      <option value="Last 90 days">Last 90 days</option>
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

            {/* Sort Order Filter */}
            <div className="flex items-stretch">
              <div className="flex mr-[-179px]">
                <div className="w-full flex-1 shrink basis-[0%]">
                  <div className="items-stretch border border-[color:var(--select-border-color,#CBD5E1)] shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)] flex w-full bg-white rounded-md border-solid">
                    <div className="items-center flex min-h-[31px] text-sm text-slate-700 font-normal whitespace-nowrap flex-1 shrink basis-[0%] my-auto">
                      <select
                        value={filters.sortOrder}
                        onChange={(e) => handleSortOrderChange(e.target.value as 'ascending' | 'descending')}
                        className="text-slate-700 flex-1 shrink basis-[0%] self-stretch w-full overflow-hidden my-auto px-[13px] py-[3px] bg-transparent border-none outline-none"
                      >
                        <option value="descending">Descending</option>
                        <option value="ascending">Ascending</option>
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
              <img
                src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/4ced8f91768a2d4ade652776c4cf1d39897e358f?placeholderIfAbsent=true"
                alt="Sort icon"
                className="aspect-[1] object-contain w-3 shrink-0 mt-[9px]"
              />
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
                  onChange={handleSearchChange}
                  placeholder="Type to search (press enter to submit)"
                  className="self-stretch min-w-60 flex-1 shrink basis-[0%] my-auto bg-transparent border-none outline-none text-ellipsis"
                />
              </div>
            </div>

            <div className="flex gap-2.5">
              <div className="text-white text-[9px] font-bold min-w-[17.5px] border-[color:var(--overlaybadge-outline-color,#FFF)] min-h-[18px] whitespace-nowrap w-[18px] h-[18px] bg-[#214BCD] rounded-[10.5px] border-2 border-solid flex items-center justify-center">
                2
              </div>
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

        {/* Active Filters */}
        <div className="flex w-[229px] max-w-full items-stretch gap-5 text-xs justify-between mt-2">
          <div className="text-[rgba(53,53,53,1)] font-normal my-auto">
            Active filters
          </div>
          <div className="flex text-[#214BCD] font-bold">
            <div className="text-[#214BCD] text-xs font-bold self-stretch w-[124px] gap-[3.5px] bg-blue-100 px-[7px] py-1 rounded-xl">
              Expected date after
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
