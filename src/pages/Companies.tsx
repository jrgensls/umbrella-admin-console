
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
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
              <div className="flex items-center gap-4 mt-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-[#214BCD] text-[#214BCD] text-sm font-semibold rounded-md hover:bg-blue-50 transition-colors">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/7a5769a2f77c7ee18217e2094fc457c52aa5235a?placeholderIfAbsent=true"
                    alt="Export"
                    className="w-3.5 h-3.5"
                  />
                  Export to CSV
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/341b2ca4abe7d46069bed1ee05ef419f71adeac7?placeholderIfAbsent=true"
                    alt="More options"
                    className="w-3.5 h-3.5"
                  />
                </button>
              </div>
            </div>

            {/* View Settings */}
            <div className="flex w-full max-w-[1682px] justify-end px-6 mb-4 max-md:max-w-full">
              <div className="flex text-sm text-[#49443C] font-medium">
                <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/16f71456d025e08e5ede9d54714c186e95f663fb?placeholderIfAbsent=true"
                    alt="View settings"
                    className="w-3.5 h-3.5"
                  />
                  View settings
                </button>
              </div>
            </div>

            {/* Companies Table */}
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
