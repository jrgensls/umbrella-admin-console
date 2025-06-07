
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { TabNavigation } from '@/components/TabNavigation';
import { CompanyFilterBar } from '@/components/CompanyFilterBar';
import { CompaniesTable } from '@/components/CompaniesTable';
import { CompanyFilterState } from '@/lib/types';

const Companies: React.FC = () => {
  const [filters, setFilters] = useState<CompanyFilterState>({
    searchQuery: '',
    industry: 'All Industries',
    membershipTier: 'All Tiers',
    workspace: 'All Locations',
    multiLocationOnly: false,
    status: 'All Status',
    sortOrder: 'descending',
  });

  const handleFilterChange = (newFilters: CompanyFilterState) => {
    setFilters(newFilters);
  };

  const handleTabChange = (tabId: string) => {
    console.log('Tab changed to:', tabId);
  };

  return (
    <div className="bg-[rgba(247,249,252,1)] flex flex-col overflow-hidden min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 flex flex-col">
          <div className="z-10 flex w-full max-w-[1706px] flex-col items-stretch max-md:max-w-full">
            {/* Page Header */}
            <div className="flex w-full max-w-[1681px] items-stretch gap-5 flex-wrap justify-between p-6 max-md:max-w-full">
              <h1 className="text-black text-[40px] font-semibold max-md:max-w-full">
                Companies Overview
              </h1>
              <div className="flex items-stretch gap-[40px_88px] mt-[11px]">
                <button className="text-sm text-[#214BCD] font-semibold">
                  <div className="flex w-full max-w-[70px] flex-col">
                    <div className="items-center border border-[color:var(--zapfloor-blue-dark,#214BCD)] flex gap-[7px] pr-[var(--button-padding-x,] pl-[}] pt-[7px)] pb-[10.5px;] rounded-md border-solid hover:bg-blue-50 transition-colors">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/7a5769a2f77c7ee18217e2094fc457c52aa5235a?placeholderIfAbsent=true"
                        alt="Export"
                        className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                      />
                      <div className="text-[#214BCD] self-stretch my-auto">
                        Export to CSV
                      </div>
                    </div>
                  </div>
                </button>
                <button className="items-center flex gap-[7px] pr-[var(--button-padding-x,] mt-1 pl-[}] pt-[7px)] pb-[10.5px;] rounded-md hover:bg-gray-100 transition-colors">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/341b2ca4abe7d46069bed1ee05ef419f71adeac7?placeholderIfAbsent=true"
                    alt="More options"
                    className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
                  />
                </button>
              </div>
            </div>

            {/* Tab Navigation and View Settings */}
            <div className="flex w-full max-w-[1682px] gap-5 flex-wrap justify-between px-6 max-md:max-w-full">
              <TabNavigation onTabChange={handleTabChange} />
              <div className="flex text-sm text-[#49443C] font-medium">
                <button className="items-center flex min-h-[31px] gap-[7px] pr-[var(--button-padding-x,] pl-[}] pt-[7px)] pb-[10.5px;] rounded-md hover:bg-gray-100 transition-colors">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/16f71456d025e08e5ede9d54714c186e95f663fb?placeholderIfAbsent=true"
                    alt="View settings"
                    className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                  />
                  <div className="text-[#49443C] self-stretch my-auto">
                    View settings
                  </div>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-6">
              <CompanyFilterBar onFilterChange={handleFilterChange} />
              <CompaniesTable filters={filters} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Companies;
