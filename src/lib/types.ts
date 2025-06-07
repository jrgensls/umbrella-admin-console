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
