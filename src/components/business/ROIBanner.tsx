
// ROIBanner.tsx
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface ROIBannerProps {
  onOpenModal: () => void;
}

export default function ROIBanner({ onOpenModal }: ROIBannerProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="card-neo p-10 bg-gradient-to-br from-purple-600 via-purple-500 to-fuchsia-600 text-white text-center shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Save up to 40% annually with our Retainers
          </h2>
          <p className="text-lg text-purple-50 mb-6 max-w-2xl mx-auto">
            Join 500+ UAE businesses already saving on legal costs while getting better service.
          </p>
          <button
            onClick={onOpenModal}
            className="btn-solid px-10 py-4 text-lg bg-white text-purple-600 hover:bg-purple-50"
          >
            Talk to a Lawyer Now
          </button>
        </div>
      </div>
    </section>
  );
}

