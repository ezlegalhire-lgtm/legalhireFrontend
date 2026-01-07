"use client";

import React, { useState, useMemo, useEffect } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
//import ServiceHeader from '@/components/services/ServiceHeader';
import ServiceFilters from "@/components/services/ServiceFilters";
import ServiceSort from "@/components/services/ServiceSort";
import ServiceCard from "@/components/services/ServiceCard";
import Pagination from "@/components/services/Pagination";
import LoadingState from "@/components/services/LoadingState";
import ErrorState from "@/components/services/ErrorState";
import EmptyState from "@/components/services/EmptyState";

interface Service {
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
}

interface Category {
  id: number;
  name: string;
  slug: string;
  service_count: number;
}

const ITEMS_PER_PAGE = 10;
const API_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "https://cms.ezlegalhire.com";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data from CMS API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/public/services`);

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();

        setServices(data.services || []);
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort services
  const filteredAndSortedServices = useMemo(() => {
    const filtered =
      selectedCategory === "all"
        ? services
        : services.filter(
            (service) => service.category_slug === selectedCategory
          );

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [services, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedServices.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentServices = filteredAndSortedServices.slice(startIndex, endIndex);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedCategory("all");
    setSortBy("price");
    setCurrentPage(1);
  };

  const handleApply = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <PublicHeader />
        <div className="pt-16">
          <LoadingState />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <PublicHeader />
        <div className="pt-16">
          <ErrorState message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      <div className="pt-6 md:pt-16">
        {/* Header - starts right below fixed header */}
        {/* <ServiceHeader totalServices={filteredAndSortedServices.length} /> */}

        {/* Main Content */}
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters */}
            <ServiceFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onApply={handleApply}
              onReset={handleReset}
            />

            {/* Services Grid */}
            <main className="flex-1 min-w-0">
              {/* Sort Bar */}
              <ServiceSort
                sortBy={sortBy}
                onSortChange={handleSortChange}
                startIndex={startIndex}
                endIndex={endIndex}
                total={filteredAndSortedServices.length}
              />

              {/* Services Cards Grid */}
              {currentServices.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {currentServices.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <EmptyState />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
