import React, { useState } from 'react';
import { Workspace } from '@/lib/types';
import { useWorkspaces } from '@/hooks/useWorkspaces';
import type { WorkspaceFilterState } from '@/components/WorkspaceFilterBar';

interface WorkspacesTableProps {
  filters: WorkspaceFilterState;
}

export const WorkspacesTable: React.FC<WorkspacesTableProps> = ({ filters }) => {
  const [selectedWorkspaces, setSelectedWorkspaces] = useState<string[]>([]);
  const { data: workspaces, isLoading, error } = useWorkspaces();

  // Convert workspaces data
  const convertedWorkspaces: Workspace[] = workspaces
    ? workspaces.map((workspace) => ({
        id: workspace.id,
        name: workspace.name || 'Unknown Workspace',
        address: workspace.address || 'Unknown Address',
        startDate: workspace.start_date
          ? new Date(workspace.start_date).toLocaleDateString('da-DK')
          : 'Unknown Date',
        contactEmail: workspace.contact_email || '',
      }))
    : [];

  let filteredWorkspaces = convertedWorkspaces.filter(
    (workspace) =>
      workspace.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      workspace.address.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      workspace.contactEmail.toLowerCase().includes(filters.searchQuery.toLowerCase())
  );

  // No location filter—leave UI in place but don't filter by location

  // Sorting
  filteredWorkspaces = filteredWorkspaces.slice().sort((a, b) => {
    if (filters.sortOrder === 'ascending') {
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });

  const handleSelectWorkspace = (workspaceId: string) => {
    setSelectedWorkspaces((prev) =>
      prev.includes(workspaceId) ? prev.filter((id) => id !== workspaceId) : [...prev, workspaceId]
    );
  };

  const handleSelectAll = () => {
    setSelectedWorkspaces(
      selectedWorkspaces.length === filteredWorkspaces.length && filteredWorkspaces.length > 0
        ? []
        : filteredWorkspaces.map((workspace) => workspace.id)
    );
  };

  if (isLoading) {
    return (
      <div className="w-full mt-4 max-md:max-w-full flex items-center justify-center min-h-[200px]">
        <p>Loading workspaces...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mt-4 max-md:max-w-full flex items-center justify-center min-h-[200px]">
        <p className="text-red-600">Error loading workspaces: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 max-md:max-w-full overflow-x-auto rounded-lg bg-white border border-border">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left w-12">
              <input
                type="checkbox"
                checked={selectedWorkspaces.length === filteredWorkspaces.length && filteredWorkspaces.length > 0}
                onChange={handleSelectAll}
                className="rounded border border-[color:var(--checkbox-border-color,#D8D6D4)] bg-white w-4 h-4"
              />
            </th>
            <th className="px-4 py-3 text-left font-semibold min-w-[140px] w-[220px]">
              <span>Name</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/62e21cc8120f641604449f1519512c30c9168f8d?placeholderIfAbsent=true"
                alt="Sort"
                className="inline ml-1 aspect-square w-3 h-3"
              />
            </th>
            <th className="px-4 py-3 text-left font-semibold min-w-[200px] w-[250px]">Address</th>
            <th className="px-4 py-3 text-left font-semibold min-w-[120px] w-[150px]">Start Date</th>
            <th className="px-4 py-3 text-left font-semibold min-w-[200px] w-[250px]">Contact Email</th>
            <th className="px-4 py-3 text-left font-semibold w-[85px]"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {filteredWorkspaces.map((workspace, index) => (
            <tr key={workspace.id} className="hover:bg-muted">
              <td className="px-4 py-3 w-12">
                <input
                  type="checkbox"
                  checked={selectedWorkspaces.includes(workspace.id)}
                  onChange={() => handleSelectWorkspace(workspace.id)}
                  className="rounded border border-[color:var(--checkbox-border-color,#D8D6D4)] bg-white w-4 h-4"
                />
              </td>
              <td className="px-4 py-3 min-w-[140px] w-[220px] font-normal text-neutral-800">
                {workspace.name}
              </td>
              <td className="px-4 py-3 min-w-[200px] w-[250px] font-normal text-neutral-800">
                {workspace.address}
              </td>
              <td className="px-4 py-3 min-w-[120px] w-[150px] font-normal text-neutral-800">
                {workspace.startDate}
              </td>
              <td className="px-4 py-3 min-w-[200px] w-[250px] font-normal text-neutral-800">
                {workspace.contactEmail}
              </td>
              <td className="px-4 py-3 w-[85px]">
                <div className="flex gap-2">
                  <button className="items-center flex min-h-[31px] gap-[7px] rounded-md hover:bg-gray-100 transition-colors px-2">
                    <img
                      src={
                        index % 2 === 0
                          ? 'https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/b06716c1904dc4b6925729e189fc6158b29a01ae?placeholderIfAbsent=true'
                          : 'https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/0bd0242da77e15430430e7baffa38e94d59f8dc9?placeholderIfAbsent=true'
                      }
                      alt="Action"
                      className="aspect-square w-3.5"
                    />
                  </button>
                  <button className="items-center flex min-h-[31px] gap-[7px] rounded-md hover:bg-gray-100 transition-colors px-2">
                    <img
                      src={
                        index % 2 === 0
                          ? 'https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/c02fa9a0533be71c9072147c1beadd3dbdbfda18?placeholderIfAbsent=true'
                          : 'https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/59ae45e2b9e0f6e0cc078aa3a1c6b491643d01ca?placeholderIfAbsent=true'
                      }
                      alt="More actions"
                      className="aspect-square w-3.5"
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
