import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  const goToFirst = () => onPageChange(1);
  const goToLast = () => onPageChange(totalPages);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-row items-center justify-between gap-4 mt-12 mb-4">
      <button 
        onClick={goToFirst}
        disabled={currentPage === 1}
        className={`px-6 py-2 font-medium rounded-lg transition-colors ${
          currentPage === 1 
            ? 'text-slate-400 cursor-not-allowed' 
            : 'text-slate-700 hover:text-purple-700 hover:bg-purple-50'
        }`}
      >
        First
      </button>
      
      <div className="flex items-center gap-2">
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
              currentPage === pageNum
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-purple-50 hover:text-purple-700'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
      
      <button 
        onClick={goToLast}
        disabled={currentPage === totalPages}
        className={`px-6 py-2 font-medium rounded-lg transition-colors ${
          currentPage === totalPages 
            ? 'text-slate-400 cursor-not-allowed' 
            : 'text-purple-700 hover:text-purple-800 hover:bg-purple-50'
        }`}
      >
        Last →
      </button>
    </div>
  );
}