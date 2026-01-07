import React from 'react';

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p className="text-body-lg text-slate-500">No services found in this category.</p>
      <p className="text-sm text-slate-400 mt-2">Try adjusting your filters or browse all services.</p>
    </div>
  );
}