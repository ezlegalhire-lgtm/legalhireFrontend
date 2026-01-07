import React from "react";
import { Filter, CheckCircle } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  service_count: number;
}

interface ServiceFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function ServiceFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  onReset,
}: ServiceFiltersProps) {
  //const totalServices = categories.reduce((sum, cat) => sum + cat.service_count, 0);

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="md:bg-white md:border-2 border-slate-200 rounded-2xl p-3 md:p-6 lg:sticky lg:top-24 lg:mb-6">
        {/* Header */}
        <div className="flex items-center justify-between md:mb-6 md:pb-4 md:border-b-2 border-slate-100">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-700" />
            <h3 className="font-bold text-lg text-slate-900">
              Filter Services
            </h3>
          </div>
          {selectedCategory !== "all" && (
            <button
              onClick={onReset}
              className="text-xs text-purple-600 hover:text-purple-700 font-semibold"
            >
              Reset
            </button>
          )}
        </div>

        {/* View All Option */}
        {/* <button
          onClick={() => onCategoryChange('all')}
          className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-left transition-all mb-4 ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
              : 'bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 hover:from-slate-200 hover:to-slate-100 border-2 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            {selectedCategory === 'all' && <CheckCircle className="w-5 h-5" />}
            <div>
              <span className="font-bold text-base">View All</span>
              <p className={`text-xs mt-0.5 ${
                selectedCategory === 'all' ? 'text-purple-100' : 'text-slate-500'
              }`}>
                Show all services
              </p>
            </div>
          </div>
          <span className={`text-base font-bold px-3 py-1 rounded-full ${
            selectedCategory === 'all'
              ? 'bg-white/20 text-white'
              : 'bg-slate-700 text-white'
          }`}>
            {totalServices}
          </span>
        </button> */}

        {/* Categories Section */}
        <div className="mb-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 hidden md:block">
            By Category
          </h4>
        </div>

        <div className="flex flex-row md:flex-col gap-2 overflow-x-scroll md:overflow-x-clip  pb-2 md:pb-0">
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category.slug;

            return (
              <button
                key={index}
                onClick={() => onCategoryChange(category.slug)}
                className={`flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl text-left transition-all ${
                  isSelected
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isSelected && <CheckCircle className="w-4 h-4" />}
                  <span className="font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                </div>
                <span
                  className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {category.service_count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-violet-50 border border-violet-200 rounded-xl hidden md:block">
          <p className="text-xs text-violet-800 font-medium leading-relaxed">
            <span className="font-bold">💼 Professional Services</span>
            <br />
            All services provided by licensed UAE legal consultants
          </p>
        </div>
      </div>
    </aside>
  );
}
