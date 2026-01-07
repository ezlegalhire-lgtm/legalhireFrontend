import React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: number;
    categoryId: number;
    category_name: string;
    category_slug: string;
    name: string;
    slug: string;
    price: number;
    description: string | null;
    icon: string | null;
    duration: string | null;
    isActive: boolean;
    isFeatured: boolean;
    sortOrder: number;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`}>
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-purple-400 hover:shadow-xl transition-all duration-300 group h-full flex flex-col cursor-pointer">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full uppercase tracking-wide">
            {service.category_name}
          </span>
        </div>

        {/* Service Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors line-clamp-2 min-h-[3.5rem]">
          {service.name}
        </h3>

        {/* Description */}
        {/* <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
          {service.description || 'Professional legal service provided by licensed UAE lawyers'}
        </p> */}
        <div className="rich-text-excerpt" dangerouslySetInnerHTML={{ __html: service.description || "" }} />

        {/* Duration badge if available */}
        {service.duration && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 text-violet-700 text-xs font-medium rounded-full border border-violet-200">
              <Clock className="w-3.5 h-3.5" />
              {service.duration}
            </span>
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-5 border-t-2 border-slate-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium mb-1">
              Starting from
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">
                {service.price}
              </span>
              <span className="text-sm font-semibold text-slate-600">AED</span>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 group-hover:gap-3 shadow-md hover:shadow-lg">
            View Details
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
