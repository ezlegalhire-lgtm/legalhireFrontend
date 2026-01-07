"use client";

import React, { useState, useEffect } from "react";
import { Section, Badge, Skeleton, Pill, BRAND } from "./SharedUI";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

interface BlogItem {
  id: number;
  category: string;
  title: string;
  readTime: number;
  excerpt: string;
  content: string;
}

interface BlogCardProps {
  item: BlogItem;
  onOpen: (item: BlogItem) => void;
}

interface BlogSectionProps {
  onOpenBlog: (item: BlogItem) => void;
}

export default function BlogSection({ onOpenBlog }: BlogSectionProps) {
  const CATS = [
    "All",
    "Corporate",
    "Employment",
    "Family",
    "Property",
    "Immigration",
  ];
  const [active, setActive] = useState("All");
  const [items, setItems] = useState<BlogItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_CMS_API_URL || "https://cms.ezlegalhire.com";

  useEffect(() => {
    // Fetch blogs from your API; category & pagination ready
    // Example endpoint: `/api/blogs?category=${active==='All'?'':active}&page=${page}`
    setLoading(true);
    // Demo mock: replace with real fetch
    setTimeout(() => {
      const mock: BlogItem[] = [
        {
          id: 1,
          category: "Corporate",
          title: "Shareholder Agreements in UAE: Key Clauses",
          readTime: 6,
          excerpt:
            "Understand essential clauses like pre-emption, drag/tag-along, and dispute resolution under UAE law.",
          content:
            "<p>Full blog content here for Shareholder Agreements...</p>",
        },
        {
          id: 2,
          category: "Employment",
          title: "End-of-Service Gratuity: 2025 Update",
          readTime: 5,
          excerpt:
            "How to compute gratuity for limited vs unlimited contracts, and what changed recently.",
          content: "<p>Full blog content here for Gratuity...</p>",
        },
        {
          id: 3,
          category: "Family",
          title: "Marriage & Divorce for Expats in the UAE",
          readTime: 7,
          excerpt:
            "A practical guide to jurisdiction, documentation, and recognition across countries.",
          content: "<p>Full blog content here for Family...</p>",
        },
        {
          id: 4,
          category: "Property",
          title: "Commercial Lease Pitfalls to Avoid",
          readTime: 4,
          excerpt:
            "Key negotiation points, renewal options, and penalty clauses for SMEs.",
          content: "<p>Full blog content here for Property...</p>",
        },
        {
          id: 5,
          category: "Immigration",
          title: "Golden Visa Pathways for Entrepreneurs",
          readTime: 6,
          excerpt:
            "Eligibility, documents, and timelines for the 10-year visa categories.",
          content: "<p>Full blog content here for Golden Visa...</p>",
        },
        {
          id: 6,
          category: "Corporate",
          title: "Contract Enforcement & DIFC Courts",
          readTime: 5,
          excerpt:
            "When to choose DIFC jurisdiction and how enforcement works with Dubai Courts.",
          content: "<p>Full blog content here for DIFC...</p>",
        },
      ];
      const filtered =
        active === "All" ? mock : mock.filter((m) => m.category === active);
      const pageSize = 6;
      const slice = filtered.slice(0, page * pageSize);
      setItems(slice);
      setHasMore(slice.length < filtered.length);
      setLoading(false);
    }, 400);
  }, [active, page]);

  function changeCat(c: string) {
    setActive(c);
    setPage(1);
  }

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      setError(null);

      const serviceResponse = await fetch(`${API_BASE_URL}/api/public/blogs`);

      if (!serviceResponse.ok) {
        throw new Error("Service not found");
      }

      const serviceData = await serviceResponse.json();
      setBlog(serviceData?.blogs);
    } catch (err) {
      console.error("Error fetching service:", err);
      setError(err instanceof Error ? err.message : "Failed to load service");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchServiceData();
  }, []);

  return (
    <Section id="blogs" className="py-12">
      <div className="mb-3">
        <h2 className="text-3xl  text-slate-900 text-center sm:text-start light-anton anton">
          Legal Blogs
        </h2>
        <p className="text-slate-600 text-center sm:text-start">
          Fresh insights from licensed UAE lawyers.
        </p>
      </div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <Pill key={c} active={c === active} onClick={() => changeCat(c)}>
              {c}
            </Pill>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-2xl bg-white p-5"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-3/4 mt-3" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-5/6 mt-1" />
              <div className="mt-4 flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-5">
            {blog?.map((item: any, index) => (
              <div key={index}>
                <div className="rounded-[15px] bg-[#faf5ff] transition-all border border-purple-300 py-5 px-3   duration-300 fade-in">
                  <Badge tone="good">{item?.category_name}</Badge>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {item?.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    <div
                      className="pb-4 text-sm text-slate-600"
                      dangerouslySetInnerHTML={{ __html: item?.excerpt }}
                    ></div>
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {item?.readTime} min read
                    </span>
                    <Link
                      href={`/blog/${item?.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 group-hover:gap-3 shadow-md hover:shadow-lg"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            {/* {hasMore ? (
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 rounded-md text-white hover:opacity-95 transition-opacity"
                style={{ background: BRAND.accent }}
              >
                Load More
              </button>
            ) : (
              <span className="text-sm text-slate-500">No more posts</span>
            )} */}
          </div>
        </>
      )}
    </Section>
  );
}
