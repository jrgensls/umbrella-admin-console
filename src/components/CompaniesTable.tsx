
import React, { useState } from 'react';
import { Company, CompanyFilterState } from '@/lib/types';
import { CompanyTableHeader } from './CompanyTableHeader';
import { CompanyTableRow } from './CompanyTableRow';
import { useRegistrations } from '@/hooks/useRegistrations';

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    logo: 'https://via.placeholder.com/40x40/214BCD/FFFFFF?text=TF',
    industry: 'Technology',
    primaryContact: 'Sarah Johnson',
    employeeCount: 45,
    memberSince: '2023-01-15',
    workspaces: ['Kristinelund', 'Brain Embassy'],
    membershipTier: 'premium',
    status: 'active',
    website: 'www.techflow.com',
    contactEmail: 'sarah@techflow.com',
    isMultiLocation: true,
  },
  {
    id: '2',
    name: 'Creative Minds Studio',
    logo: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=CM',
    industry: 'Design',
    primaryContact: 'Alex Chen',
    employeeCount: 12,
    memberSince: '2023-03-22',
    workspaces: ['Wintercircus'],
    membershipTier: 'basic',
    status: 'active',
    website: 'www.creativeminds.com',
    contactEmail: 'alex@creativeminds.com',
    isMultiLocation: false,
  },
  {
    id: '3',
    name: 'FinanceForward',
    logo: 'https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=FF',
    industry: 'Finance',
    primaryContact: 'Michael Rodriguez',
    employeeCount: 85,
    memberSince: '2022-11-08',
    workspaces: ['Kristinelund', 'Mollerup Gods', 'Groska'],
    membershipTier: 'enterprise',
    status: 'active',
    website: 'www.financeforward.com',
    contactEmail: 'michael@financeforward.com',
    isMultiLocation: true,
  },
  {
    id: '4',
    name: 'HealthTech Innovations',
    logo: 'https://via.placeholder.com/40x40/EF4444/FFFFFF?text=HT',
    industry: 'Healthcare',
    primaryContact: 'Dr. Emma Watson',
    employeeCount: 28,
    memberSince: '2023-05-10',
    workspaces: ['Brain Embassy'],
    membershipTier: 'premium',
    status: 'active',
    website: 'www.healthtech.com',
    contactEmail: 'emma@healthtech.com',
    isMultiLocation: false,
  },
  {
    id: '5',
    name: 'Digital Marketing Pro',
    logo: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=DM',
    industry: 'Marketing',
    primaryContact: 'James Wilson',
    employeeCount: 15,
    memberSince: '2023-02-14',
    workspaces: ['Wintercircus', 'Groska'],
    membershipTier: 'basic',
    status: 'pending',
    website: 'www.digitalmarketingpro.com',
    contactEmail: 'james@digitalmarketingpro.com',
    isMultiLocation: true,
  },
  {
    id: '6',
    name: 'Legal Eagles LLP',
    logo: 'https://via.placeholder.com/40x40/6B7280/FFFFFF?text=LE',
    industry: 'Legal',
    primaryContact: 'Victoria Thompson',
    employeeCount: 22,
    memberSince: '2022-09-30',
    workspaces: ['Mollerup Gods'],
    membershipTier: 'premium',
    status: 'inactive',
    website: 'www.legaleagles.com',
    contactEmail: 'victoria@legaleagles.com',
    isMultiLocation: false,
  },
];

interface CompaniesTableProps {
  filters: CompanyFilterState;
}

export const CompaniesTable: React.FC<CompaniesTableProps> = ({ filters }) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const { data: registrations, isLoading, error } = useRegistrations();

  // Convert registrations to Company format and combine with mock data
  const registrationCompanies: Company[] = registrations ? registrations.map((reg) => ({
    id: reg.id,
    name: reg.company_name,
    logo: `https://via.placeholder.com/40x40/6366F1/FFFFFF?text=${reg.company_name.substring(0, 2).toUpperCase()}`,
    industry: 'Registration', // Default industry for registrations
    primaryContact: reg.contact_person_name,
    employeeCount: 0, // Default employee count
    memberSince: reg.created_at,
    workspaces: [reg.preferred_location],
    membershipTier: 'basic' as const,
    status: reg.payment_status === 'paid' ? 'active' as const : 'pending' as const,
    website: '',
    contactEmail: reg.contact_email,
    isMultiLocation: false,
  })) : [];

  // Combine mock companies with registration companies
  const allCompanies = [...mockCompanies, ...registrationCompanies];

  const filteredCompanies = allCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         company.primaryContact.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
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
