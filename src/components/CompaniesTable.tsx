
import React, { useState } from 'react';
import { Company, CompanyFilterState } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

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

  const filteredCompanies = mockCompanies.filter(company => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-[490px] w-full max-md:max-w-full mt-4">
      <table className="w-full">
        <thead className="flex w-full text-sm text-[rgba(37,37,37,1)] font-semibold flex-wrap border-black border-t max-md:max-w-full">
          <tr className="flex w-full">
            <th className="bg-white flex min-h-[38px] gap-[7px] py-[11px] border-[0.5px] border-solid border-[#B9B9B9] w-[47px]">
              <div className="self-stretch flex w-[13px] items-center my-auto">
                <div className="self-stretch flex w-[18px] items-center gap-[7px] my-auto rounded-md">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border border-[color:var(--checkbox-border-color,#D8D6D4)] bg-white self-stretch flex min-h-[18px] w-[17.5px] h-[17.5px] my-auto border-solid"
                  />
                </div>
              </div>
            </th>
            <th className="items-center bg-white flex min-w-60 gap-[7px] text-[rgba(26,26,26,1)] flex-1 shrink basis-[0%] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9]">
              <div className="self-stretch my-auto">Company</div>
            </th>
            <th className="bg-white min-w-40 flex-1 shrink basis-[0%] gap-[7px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
              Industry
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
        <tbody className="w-full max-md:max-w-full">
          {filteredCompanies.map((company) => (
            <tr key={company.id} className="bg-white border flex w-full flex-wrap border-[rgba(201,201,201,1)] border-solid max-md:max-w-full">
              <td className="flex items-center gap-[7px] w-[47px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <div className="self-stretch flex w-[13px] items-center my-auto">
                  <div className="self-stretch flex w-[18px] items-center gap-[7px] my-auto rounded-md">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company.id)}
                      onChange={() => handleSelectCompany(company.id)}
                      className="rounded border border-[color:var(--checkbox-border-color,#D8D6D4)] bg-white self-stretch flex min-h-[18px] w-[17.5px] h-[17.5px] my-auto border-solid"
                    />
                  </div>
                </div>
              </td>
              <td className="flex min-w-60 items-center gap-3 text-sm text-neutral-800 font-normal px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <div className="font-medium">{company.name}</div>
                  <div className="text-xs text-gray-500">Since {new Date(company.memberSince).getFullYear()}</div>
                </div>
              </td>
              <td className="flex items-center text-sm text-neutral-800 font-normal px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                {company.industry}
              </td>
              <td className="flex items-center text-sm text-neutral-800 font-normal px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <div className="flex flex-col">
                  <div className="font-medium">{company.primaryContact}</div>
                  <div className="text-xs text-gray-500">{company.contactEmail}</div>
                </div>
              </td>
              <td className="flex items-center text-sm text-neutral-800 font-normal px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                {company.employeeCount} employees
              </td>
              <td className="flex items-center text-sm text-neutral-800 font-normal px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <div className="flex flex-col gap-1">
                  {company.isMultiLocation && (
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      Multi-location ({company.workspaces.length})
                    </Badge>
                  )}
                  <div className="text-xs text-gray-600">
                    {company.workspaces.join(', ')}
                  </div>
                </div>
              </td>
              <td className="flex items-center px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <Badge className={`text-xs font-medium ${getTierColor(company.membershipTier)}`}>
                  {company.membershipTier.charAt(0).toUpperCase() + company.membershipTier.slice(1)}
                </Badge>
              </td>
              <td className="flex items-center px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <Badge className={`text-xs font-medium ${getStatusColor(company.status)}`}>
                  {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                </Badge>
              </td>
              <td className="flex items-center gap-[7px] w-32 px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <div className="flex gap-2">
                  <button className="items-center flex min-h-[31px] gap-[7px] pr-[var(--button-padding-x,] pl-[}] pt-[7px)] pb-[10.5px;] rounded-md hover:bg-gray-100 transition-colors">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/b06716c1904dc4b6925729e189fc6158b29a01ae?placeholderIfAbsent=true"
                      alt="View details"
                      className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
                    />
                  </button>
                  <button className="items-center flex min-h-[31px] gap-[7px] pr-[var(--button-padding-x,] pl-[}] pt-[7px)] pb-[10.5px;] rounded-md hover:bg-gray-100 transition-colors">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/c02fa9a0533be71c9072147c1beadd3dbdbfda18?placeholderIfAbsent=true"
                      alt="More actions"
                      className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
