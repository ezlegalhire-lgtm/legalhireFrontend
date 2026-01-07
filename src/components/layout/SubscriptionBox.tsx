import React from "react";

function SubscriptionBox() {
  return (
    <div className="mb-12 p-6 md:p-8 rounded-2xl bg-purple-600 text-white shadow-xl">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-lg md:text-xl font-bold mb-2">
          Stay Updated on UAE Legal News
        </h3>
        <p className="text-xs md:text-sm text-purple-50 mb-6">
          Subscribe to our newsletter for legal updates and insights
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-white placeholder:text-slate-400"
          />
          <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-all hover:scale-105 text-sm shadow-md">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionBox;
