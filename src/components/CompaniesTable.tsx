
import React, { useState } from 'react';
import { Company, CompanyFilterState } from '@/lib/types';
import { CompanyTableHeader } from './CompanyTableHeader';
import { CompanyTableRow } from './CompanyTableRow';
import { useRegistrations } from '@/hooks/useRegistrations';

interface CompaniesTableProps {
  filters: CompanyFilterState;
}

export const CompaniesTable: React.FC<CompaniesTableProps> = ({ filters }) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const { data: registrations, isLoading, error } = useRegistrations();

  console.log('Raw registrations data:', registrations);

  // Convert registrations to Company format
  const companies: Company[] = registrations ? registrations.map((reg) => {
    console.log('Processing registration:', reg);
    return {
      id: reg.id,
      name: reg.company_name || 'Unknown Company',
      logo: `https://via.placeholder.com/40x40/6366F1/FFFFFF?text=${(reg.company_name || 'UC').substring(0, 2).toUpperCase()}`,
      industry: 'Business', // Default industry for registrations
      primaryContact: reg.contact_person_name || '',
      employeeCount: 0, // Default employee count since not in registrations table
      memberSince: reg.created_at,
      workspaces: [reg.preferred_location || 'Unknown Location'],
      membershipTier: 'basic' as const,
      status: reg.payment_status === 'paid' ? 'active' as const : 'pending' as const,
      website: '',
      contactEmail: reg.contact_email || '',
      isMultiLocation: false,
    };
  }) : [];

  console.log('Converted companies:', companies);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         company.primaryContact.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         company.contactEmail.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    const matchesIndustry = filters.industry === 'All Industries' || company.industry === filters.industry;
    const matchesTier = filters.membershipTier === 'All Tiers' || company.membershipTier === filters.membershipTier;
    const matchesWorkspace = filters.workspace === 'All Locations' || company.workspaces.includes(filters.workspace);
    const matchesMultiLocation = !filters.multiLocationOnly || company.isMultiLocation;
    const matchesStatus = filters.status === 'All Status' || company.status === filters.status;

    return matchesSearch && matchesIndustry && matchesTier && matchesWorkspace && matchesMultiLocation && matchesStatus;
  });

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanies(prev =>
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCompanies(
      selectedCompanies.length === filteredCompanies.length
        ? []
        : filteredCompanies.map(company => company.id)
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[490px] w-full max-md:max-w-full mt-4 flex items-center justify-center">
        <p>Loading companies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[490px] w-full max-md:max-w-full mt-4 flex items-center justify-center">
        <p className="text-red-600">Error loading companies: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[490px] w-full max-md:max-w-full mt-4">
      <table className="w-full border-collapse">
        <CompanyTableHeader
          selectedCompanies={selectedCompanies}
          filteredCompaniesLength={filteredCompanies.length}
          onSelectAll={handleSelectAll}
        />
        <tbody>
          {filteredCompanies.map((company) => (
            <CompanyTableRow
              key={company.id}
              company={company}
              isSelected={selectedCompanies.includes(company.id)}
              onSelect={handleSelectCompany}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
