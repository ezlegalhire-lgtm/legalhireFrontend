import React from "react";

export default function MetricsSection() {
  const metrics = [
    { value: "1,000+", label: "Happy Clients" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "15+", label: "Verified Lawyers" },
  ];

  return (
    <section className=" bg-gradient-to-b from-white to-slate-50">
      <div className="container">
        <div className="grid-3-col text-center">
          {metrics.map((metric, index) => (
            <div key={index} className="card-neo p-8 hover:scale-105 group">
              <div className="text-5xl font-black gradient-text mb-2 group-hover:scale-110 transition-transform">
                {metric.value}
              </div>
              <div className="text-sm text-slate-600 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
