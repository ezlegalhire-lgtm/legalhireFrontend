import React from 'react';

interface ServiceHeaderProps {
  totalServices: number;
}

export default function ServiceHeader({ totalServices }: ServiceHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 py-8">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Professional Legal Services
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Discover <span className="font-semibold text-slate-900">{totalServices}</span> comprehensive legal solutions tailored for individuals and businesses in the UAE
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/60 rounded-lg shadow-sm">
              <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-semibold text-purple-800">UAE Based</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/60 rounded-lg shadow-sm">
              <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-semibold text-purple-800">Licensed Experts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}