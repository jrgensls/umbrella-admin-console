
import React, { useState } from 'react';
import { CompanyFilterState } from '@/lib/types';
import { Search, Filter, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
    <section className="bg-white border border-border rounded-lg shadow-sm p-6 mt-4">
      <div className="flex items-center justify-between gap-6">
        {/* Search Input */}
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            placeholder="Search companies, contacts, and emails..."
            className="pl-10 h-11 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-4">
          {/* Active Filters Badge */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
              <span>{activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied</span>
            </div>
          )}

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 border border-input rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm font-medium">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>

          {/* Column Settings Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 border border-input rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm font-medium">
            <Settings className="h-4 w-4" />
            <span>Columns</span>
          </button>
        </div>
      </div>
    </section>
  );
};
