import { ArrowLeft, Clock, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

function BlogDetails({ service }: any) {
  console.log(service);

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/home"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <Link
              href="/legal-resources"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Legal-Resources
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">
              {service.category_name}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Left Column - Service Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <Link
                href="/legal-resources"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Legal-Resources</span>
              </Link>

              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full uppercase border border-purple-200">
                      {service.category_name}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {service.title}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <span className="text-slate-600">4.9 (127 reviews)</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {service.duration && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 rounded-lg border border-violet-200">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{service.duration}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Blog Details
                    </h2>

                    <div className="rich-text-content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: service.content || "",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
