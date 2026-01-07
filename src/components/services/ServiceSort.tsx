import React from 'react';

interface ServiceSortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  startIndex: number;
  endIndex: number;
  total: number;
}

export default function ServiceSort({
  sortBy,
  onSortChange,
  startIndex,
  endIndex,
  total
}: ServiceSortProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
        <span className="text-slate-600 font-medium whitespace-nowrap">Sort by:</span>
        <select 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="input px-2 md:px-3 py-2 text-sm focus-ring"
        >
          <option value="price">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>
      <div className="text-sm text-slate-600 font-medium pt-6 md:pt-0">
        Showing {startIndex + 1}-{Math.min(endIndex, total)} of {total}
      </div>
    </div>
  );
}