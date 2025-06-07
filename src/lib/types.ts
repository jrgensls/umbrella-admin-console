
export interface Member {
  id: string;
  customerName: string;
  dateActivated: string;
  vatOrganizationId: string;
  workspaces: string;
  status: 'pending' | 'active' | 'deactivated';
}

export interface FilterState {
  searchQuery: string;
  dateFilter: string;
  sortOrder: 'ascending' | 'descending';
  activeFilters: string[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  isActive: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  address: string;
  startDate: string;
  contactEmail: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  primaryContact: string;
  employeeCount: number;
  memberSince: string;
  workspaces: string[];
  membershipTier: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'inactive' | 'pending';
  website?: string;
  contactEmail: string;
  isMultiLocation: boolean;
}

export interface CompanyFilterState {
  searchQuery: string;
  industry: string;
  membershipTier: string;
  workspace: string;
  multiLocationOnly: boolean;
  status: string;
  sortOrder: 'ascending' | 'descending';
}
