
import React from 'react';

export const CompanyActions: React.FC = () => {
  return (
    <div className="flex gap-2">
      <button className="items-center flex min-h-[31px] gap-[7px] pr-[var(--button-padding-x,] pl-[}] pt-[7px)] pb-[10.5px;] rounded-md hover:bg-gray-100 transition-colors">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/b06716c1904dc4b6925729e189fc6158b29a01ae?placeholderIfAbsent=true"
          alt="View details"
          className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
        />
      </button>
      <button className="items-center flex min-h-[31px] gap-[7px] pr-[var(--button-padding-x,] pl-[}] pt-[7px)] pb-[10.5px;] rounded-md hover:bg-gray-100 transition-colors">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/47ad3a508fb640478c91bdeee233bd4b/c02fa9a0533be71c9072147c1beadd3dbdbfda18?placeholderIfAbsent=true"
          alt="More actions"
          className="aspect-[1] object-contain w-3.5 self-stretch my-auto"
        />
      </button>
    </div>
  );
};
