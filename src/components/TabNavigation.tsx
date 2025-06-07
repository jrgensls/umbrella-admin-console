import React, { useState } from 'react';
import { TabItem } from '@/lib/types';

interface TabNavigationProps {
  onTabChange?: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('default');

  const tabs: TabItem[] = [
    { id: 'default', label: 'Default', icon: 'https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/6c712db1410986ad40784236b01189665ad2e8a8?placeholderIfAbsent=true', isActive: true },
    { id: 'create', label: 'Create view', isActive: false },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="border-b-[color:var(--tabs-tablist-border-color,#E7E6E4)] flex mt-[15px] border-b border-solid">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`items-center flex gap-[7px] text-sm font-bold whitespace-nowrap px-4 py-3.5 border-b border-solid transition-colors ${
            activeTab === tab.id
              ? 'border-b-[color:var(--zapfloor-blue-dark,#214BCD)] text-[#214BCD] border-b-2'
              : 'border-b-[color:var(--tabs-tab-border-color,#E7E6E4)] text-[#7A7771] hover:text-[#214BCD]'
          }`}
        >
          {tab.icon && (
            <img
              src={tab.icon}
              alt={`${tab.label} icon`}
              className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
            />
          )}
          <div className="self-stretch my-auto">
            {tab.label}
          </div>
        </button>
      ))}
      <div className="items-center flex min-w-60 min-h-[45px] gap-3.5 w-[5045px] px-[29p] py-[7px)] rounded-md max-md:max-w-full max-md:px-5">
        <div className="self-stretch flex min-h-3.5 w-3.5 my-auto" />
      </div>
    </div>
  );
};
