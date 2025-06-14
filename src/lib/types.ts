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
  employeeCount: string | number; // Updated to allow string or number for company_size
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

export interface Order {
  id: string;
  order_number: string;
  date: string;
  company_name: string;
  company_email: string;
  company_phone: string | null;
  company_vat_number: string | null;
  company_address: string | null;
  contact_person: string | null;
  contact_title: string | null;
  workspace_id: string;
  workspace_name: string;
  reference: string | null;
  total_amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'invoiced' | 'cancelled' | 'refunded';
  created_at: string;
  updated_at: string;
  created_by_admin: string | null;
  notes: string | null;
  purchase_order_number: string | null;
}
