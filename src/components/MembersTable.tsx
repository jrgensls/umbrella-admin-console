import React, { useState } from 'react';
import { Member } from '@/lib/types';
import { StatusTag } from './StatusTag';

const mockMembers: Member[] = [
  {
    id: '1',
    customerName: 'Mirek Sivak',
    dateActivated: '22-04-2024 14:59',
    vatOrganizationId: 'BE 0805.914.897',
    workspaces: 'Kristinelund',
    status: 'pending',
  },
  {
    id: '2',
    customerName: 'Bert corporation',
    dateActivated: '22-04-2024 14:59',
    vatOrganizationId: '/',
    workspaces: 'Mollerup Gods',
    status: 'active',
  },
  {
    id: '3',
    customerName: 'Matthew',
    dateActivated: '22-04-2024 14:59',
    vatOrganizationId: 'BE 0805.914.897',
    workspaces: '3 locations',
    status: 'active',
  },
  {
    id: '4',
    customerName: 'Vincent',
    dateActivated: '22-04-2024 14:59',
    vatOrganizationId: 'BE 0805.914.897',
    workspaces: '2 locations',
    status: 'active',
  },
  {
    id: '5',
    customerName: 'Valeriy',
    dateActivated: '22-04-2024 14:59',
    vatOrganizationId: 'BE 0805.914.897',
    workspaces: 'Brain embassy',
    status: 'deactivated',
  },
  {
    id: '6',
    customerName: 'Wouter',
    dateActivated: '22-04-2024 14:59',
    vatOrganizationId: 'BE 0805.914.897',
    workspaces: 'Groska',
    status: 'deactivated',
  },
  {
    id: '7',
    customerName: 'Manon',
    dateActivated: '22-04-2024 14:59',
    vatOrganizationId: 'BE 0805.914.897',
    workspaces: 'Wintercircus',
    status: 'deactivated',
  },
  {
    id: '8',
    customerName: 'Caitlin',
    dateActivated: '22-04-2024 14:59',
    vatOrganizationId: '/',
    workspaces: '3 locations',
    status: 'deactivated',
  },
  {
    id: '9',
    customerName: 'Maarten',
    dateActivated: '22-04-2024 14:59',
    vatOrganizationId: '/',
    workspaces: '5 locations',
    status: 'deactivated',
  },
];

interface MembersTableProps {
  searchQuery?: string;
}

export const MembersTable: React.FC<MembersTableProps> = ({ searchQuery = '' }) => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const filteredMembers = mockMembers.filter(member =>
    member.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.workspaces.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectMember = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    setSelectedMembers(
      selectedMembers.length === filteredMembers.length
        ? []
        : filteredMembers.map(member => member.id)
    );
  };

  return (
    <div className="min-h-[490px] w-full max-md:max-w-full max-md:mt-[-200px] max-md:mr-2.5">
      <table className="w-full">
        <thead className="flex w-full text-sm text-[rgba(37,37,37,1)] font-semibold flex-wrap border-black border-t max-md:max-w-full">
          <tr className="flex w-full">
            <th className="bg-white flex min-h-[38px] gap-[7px] py-[11px] border-[0.5px] border-solid border-[#B9B9B9] w-[47px]">
              <div className="self-stretch flex w-[13px] items-center my-auto">
                <div className="self-stretch flex w-[18px] items-center gap-[7px] my-auto rounded-md">
                  <input
                    type="checkbox"
                    checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border border-[color:var(--checkbox-border-color,#D8D6D4)] bg-white self-stretch flex min-h-[18px] w-[17.5px] h-[17.5px] my-auto border-solid"
                  />
                </div>
              </div>
            </th>
            <th className="items-center bg-white flex min-w-60 gap-[7px] text-[rgba(26,26,26,1)] flex-1 shrink basis-[0%] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9]">
              <div className="self-stretch my-auto">Customer name</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/62e21cc8120f641604449f1519512c30c9168f8d?placeholderIfAbsent=true"
                alt="Sort"
                className="aspect-[1] object-contain w-3 self-stretch shrink-0 h-3 my-auto"
              />
            </th>
            <th className="bg-white min-w-60 flex-1 shrink basis-[0%] gap-[7px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
              Date activated
            </th>
            <th className="bg-white min-w-60 flex-1 shrink basis-[0%] gap-[7px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
              VAT / Organization ID
            </th>
            <th className="bg-white min-w-60 whitespace-nowrap flex-1 shrink basis-[0%] gap-[7px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
              Workspaces
            </th>
            <th className="bg-white min-w-60 whitespace-nowrap flex-1 shrink basis-[0%] gap-[7px] px-3.5 py-[11px] border-[0.5px] border-solid border-[#B9B9B9] text-left">
              Status
            </th>
            <th className="bg-white flex w-40 shrink-0 h-[38px] gap-[7px] py-[11px] border-[0.5px] border-solid border-[#B9B9B9]">
            </th>
          </tr>
        </thead>
        <tbody className="w-full max-md:max-w-full">
          {filteredMembers.map((member, index) => (
            <tr key={member.id} className="bg-white border flex w-full flex-wrap border-[rgba(201,201,201,1)] border-solid max-md:max-w-full">
              <td className="flex items-center gap-[7px] w-[47px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <div className="self-stretch flex w-[13px] items-center my-auto">
                  <div className="self-stretch flex w-[18px] items-center gap-[7px] my-auto rounded-md">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleSelectMember(member.id)}
                      className="rounded border border-[color:var(--checkbox-border-color,#D8D6D4)] bg-white self-stretch flex min-h-[18px] w-[17.5px] h-[17.5px] my-auto border-solid"
                    />
                  </div>
                </div>
              </td>
              <td className="flex min-w-60 items-center gap-[7px] text-sm text-neutral-800 font-normal w-[285px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <div className="self-stretch flex-1 shrink basis-[0%] min-w-60 w-full my-auto">
                  {member.customerName}
                </div>
              </td>
              <td className="flex min-w-60 items-center gap-[7px] text-sm text-neutral-800 font-normal w-[291px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <div className="self-stretch flex-1 shrink basis-[0%] min-w-60 w-full my-auto">
                  {member.dateActivated}
                </div>
              </td>
              <td className="flex min-w-60 items-center gap-[7px] text-sm text-neutral-800 font-normal w-72 px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <div className="self-stretch flex-1 shrink basis-[0%] min-w-60 w-full my-auto">
                  {member.vatOrganizationId}
                </div>
              </td>
              <td className="flex min-w-60 items-center gap-[7px] text-sm text-neutral-800 font-normal w-[289px] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <div className="self-stretch flex-1 shrink basis-[0%] min-w-60 w-full my-auto">
                  {member.workspaces}
                </div>
              </td>
              <td className="flex items-center gap-[7px] flex-1 shrink basis-[0%] px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <div className="self-stretch flex min-h-4 w-full flex-1 shrink basis-[0%] my-auto">
                  <StatusTag status={member.status} />
                </div>
              </td>
              <td className="flex items-center gap-[7px] w-40 px-3.5 py-[11px] border-[rgba(219,219,219,1)] border-b">
                <div className="flex gap-2">
                  <button className="items-center flex min-h-[31px] gap-[7px] pr-[var(--button-padding-x,] pl-[}] pt-[7px)] pb-[10.5px;] rounded-md hover:bg-gray-100 transition-colors">
                    <img
                      src={index % 2 === 0 ? "https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/b06716c1904dc4b6925729e189fc6158b29a01ae?placeholderIfAbsent=true" : "https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/0bd0242da77e15430430e7baffa38e94d59f8dc9?placeholderIfAbsent=true"}
                      alt="Action"
                      className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
                    />
                  </button>
                  <button className="items-center flex min-h-[31px] gap-[7px] pr-[var(--button-padding-x,] pl-[}] pt-[7px)] pb-[10.5px;] rounded-md hover:bg-gray-100 transition-colors">
                    <img
                      src={index % 2 === 0 ? "https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/c02fa9a0533be71c9072147c1beadd3dbdbfda18?placeholderIfAbsent=true" : "https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/59ae45e2b9e0f6e0cc078aa3a1c6b491643d01ca?placeholderIfAbsent=true"}
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
