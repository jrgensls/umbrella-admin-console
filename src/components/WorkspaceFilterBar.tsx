
import React, { useState } from 'react';
import { Search, Filter, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface WorkspaceFilterState {
  searchQuery: string;
  location: string;
  sortOrder: 'descending' | 'ascending';
}

interface WorkspaceFilterBarProps {
  filters: WorkspaceFilterState;
  onFilterChange?: (filters: WorkspaceFilterState) => void;
}

export const WorkspaceFilterBar: React.FC<WorkspaceFilterBarProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key: keyof WorkspaceFilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange?.(newFilters);
  };

  const activeFiltersCount = 
    (filters.location !== 'All Locations' ? 1 : 0) +
    (filters.sortOrder !== 'descending' ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <section className="bg-white border border-border rounded-lg shadow-sm p-6 mt-4 mb-2">
      <div className="flex items-center justify-between gap-6">
        {/* Search Input */}
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={filters.searchQuery}
            onChange={e => handleFilterChange('searchQuery', e.target.value)}
            placeholder="Search workspace name, address, or email..."
            className="pl-10 h-11 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-4">
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
              <span>{activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied</span>
            </div>
          )}
          {/* Locations Filter */}
          <select
            value={filters.location}
            onChange={e => handleFilterChange('location', e.target.value)}
            className="px-4 py-2 border border-input rounded-lg bg-background text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            <option value="All Locations">All Locations</option>
            <option value="Kristinelund">Kristinelund</option>
            <option value="Mollerup Gods">Mollerup Gods</option>
            <option value="Brain Embassy">Brain Embassy</option>
            <option value="Groska">Groska</option>
            <option value="Wintercircus">Wintercircus</option>
          </select>
          {/* Sort Order */}
          <select
            value={filters.sortOrder}
            onChange={e => handleFilterChange('sortOrder', e.target.value as 'ascending' | 'descending')}
            className="px-4 py-2 border border-input rounded-lg bg-background text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            <option value="descending">Descending</option>
            <option value="ascending">Ascending</option>
          </select>
          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 border border-input rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm font-medium">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          {/* Columns Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 border border-input rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm font-medium">
            <Settings className="h-4 w-4" />
            <span>Columns</span>
          </button>
        </div>
      </div>
    </section>
  );
};

