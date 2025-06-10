
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
    <section className="bg-white border border-border rounded-lg shadow-sm p-4 mt-4">
      <div className="flex items-center justify-between gap-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            placeholder="Search companies and contacts..."
            className="pl-10 h-10 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-3">
          {/* Active Filters Badge */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <span>{activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied</span>
            </div>
          )}

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-3 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>

          {/* Column Settings Button */}
          <button className="flex items-center gap-2 px-3 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <Settings className="h-4 w-4" />
            <span className="text-sm font-medium">Columns</span>
          </button>
        </div>
      </div>
    </section>
  );
};
