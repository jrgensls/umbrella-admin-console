
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MenuItem } from '@/lib/types';

const mainMenuItems: MenuItem[] = [
  { id: 'workspaces', label: 'Workspaces', icon: 'https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/261c188f11e5925ca9999830ee2299117c266789?placeholderIfAbsent=true', href: '/' },
  { id: 'companies', label: 'Companies', icon: 'https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/0f14a5259a9edb4da5325f52131bc7ca53a6c68c?placeholderIfAbsent=true', href: '/companies' },
  { id: 'orders', label: 'Orders', icon: 'https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/edfbec5d568ce6fc26b2c0e50df6c8b0053e87d2?placeholderIfAbsent=true' },
];

const systemMenuItems: MenuItem[] = [
  { id: 'integrations', label: 'Integrations', icon: 'https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/922123a21e5023bea0c389a034c2da316f9be9d5?placeholderIfAbsent=true' },
  { id: 'settings', label: 'Settings', icon: 'https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/50d971ca60a554be728e887172aaae646441c27a?placeholderIfAbsent=true' },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (item: MenuItem) => {
    if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <nav className="min-w-[175px] border border-[color:var(--Zapfloor-brand-100,#DEECFF)] bg-[rgba(0,0,0,0.83)] min-h-[1016px] w-[175px] max-w-full border-solid">
      <div className="items-stretch flex w-full flex-col justify-center gap-0.5 pl-1 pr-[3px] py-1">
        {/* Main Menu */}
        <div className="w-full gap-0.5 pl-1 pr-[3px] py-1">
          {mainMenuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={`items-center rounded flex w-full gap-[7px] pl-2.5 pr-[11px] py-[15px] text-sm text-white font-normal whitespace-nowrap leading-none cursor-pointer hover:bg-white/10 transition-colors ${
                location.pathname === item.href ? 'bg-white/20' : ''
              }`}
            >
              <img
                src={item.icon}
                alt={`${item.label} icon`}
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
              />
              <div className="self-stretch flex-1 shrink basis-[0%] my-auto">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* System Menu */}
        <div className="w-full gap-0.5 pl-1 pr-[3px] py-1 mt-8">
          <div className="flex-1 shrink basis-[0%] w-full gap-[7px] font-semibold bg-[rgba(0,0,0,0.00)] pl-2.5 pr-[11px] py-[7px] text-sm text-white">
            System
          </div>
          {systemMenuItems.map((item) => (
            <div
              key={item.id}
              className="items-center rounded flex w-full gap-[7px] pl-2.5 pr-[11px] py-[15px] text-sm text-white font-normal whitespace-nowrap leading-none cursor-pointer hover:bg-white/10 transition-colors"
            >
              <img
                src={item.icon}
                alt={`${item.label} icon`}
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
              />
              <div className="self-stretch flex-1 shrink basis-[0%] my-auto">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};
