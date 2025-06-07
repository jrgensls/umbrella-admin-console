import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white self-stretch flex min-h-16 w-full items-center gap-[40px_100px] justify-between flex-wrap pr-16 py-1.5 border-[rgba(228,228,228,1)] border-b max-md:max-w-full max-md:pr-5">
      <div className="self-stretch w-[187px] my-auto">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/08ed99e2ba00009ab720f7d3904fa65781d9a1d6?placeholderIfAbsent=true"
          alt="Zapfloor Logo"
          className="aspect-[3.53] object-contain w-[187px]"
        />
      </div>
      <div className="self-stretch flex items-center gap-4 text-sm text-[rgba(62,62,62,1)] font-normal my-auto">
        <div className="items-center self-stretch flex gap-[7px] pr-[var(--button-padding-x,] my-auto pl-[}] pt-[7px)] pb-[10.5px;] rounded-md">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/9ef80b47ce57e707e9e73c46d9d683fb27263c1a?placeholderIfAbsent=true"
            alt="User avatar"
            className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
          />
          <div className="self-stretch my-auto">
            wtnn schoofs
          </div>
        </div>
      </div>
    </header>
  );
};
