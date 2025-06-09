
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { CompanyFilterBar } from '@/components/CompanyFilterBar';
import { CompaniesTable } from '@/components/CompaniesTable';
import { CompanyFilterState } from '@/lib/types';
import { useRegistrations } from '@/hooks/useRegistrations';

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

  const { data: registrations, isLoading, error } = useRegistrations();

  const handleFilterChange = (newFilters: CompanyFilterState) => {
    setFilters(newFilters);
  };

  console.log('Registrations data:', registrations);
  console.log('Loading state:', isLoading);
  console.log('Error state:', error);

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

            {/* View Settings - moved up to replace tab navigation */}
            <div className="flex w-full max-w-[1682px] justify-end px-6 mb-4 max-md:max-w-full">
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

            {/* Loading and Error States */}
            {isLoading && (
              <div className="px-6 py-4 text-center">
                <p>Loading registrations...</p>
              </div>
            )}

            {error && (
              <div className="px-6 py-4 text-center text-red-600">
                <p>Error loading registrations: {error.message}</p>
              </div>
            )}

            {/* Registration Data Display */}
            {registrations && registrations.length > 0 && (
              <div className="px-6 mb-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Registration Records ({registrations.length})
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">Company Name</th>
                          <th className="text-left p-2 font-medium">Contact Person</th>
                          <th className="text-left p-2 font-medium">Email</th>
                          <th className="text-left p-2 font-medium">Phone</th>
                          <th className="text-left p-2 font-medium">Location</th>
                          <th className="text-left p-2 font-medium">Status</th>
                          <th className="text-left p-2 font-medium">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrations.map((registration) => (
                          <tr key={registration.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{registration.company_name}</td>
                            <td className="p-2">{registration.contact_person_name}</td>
                            <td className="p-2">{registration.contact_email}</td>
                            <td className="p-2">{registration.contact_phone}</td>
                            <td className="p-2">{registration.preferred_location}</td>
                            <td className="p-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                registration.payment_status === 'paid' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {registration.payment_status}
                              </span>
                            </td>
                            <td className="p-2">
                              {new Date(registration.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Original Content Area */}
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
