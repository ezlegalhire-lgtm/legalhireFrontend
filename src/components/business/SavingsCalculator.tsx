'use client';

import React, { useState } from 'react';
import { TrendingDown } from 'lucide-react';

interface SavingsCalculatorProps {
  onOpenModal: () => void;
}

export default function SavingsCalculator({ onOpenModal }: SavingsCalculatorProps) {
  const [hours, setHours] = useState(10);
  
  const hourlyRate = 750; // AED per hour
  const traditionalCost = hours * hourlyRate;
  const retainerCost = 1999; // Growth plan
  const savings = Math.max(0, traditionalCost - retainerCost);
  const savingsPercent = Math.max(0, Math.round((savings / Math.max(traditionalCost, 1)) * 100));

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Card */}
          <div className="card-neo p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 mb-4">
                <TrendingDown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                See How Much You Can Save
              </h2>
              <p className="text-slate-600">
                Estimate based on average UAE firm rate of AED {hourlyRate}/hour.
              </p>
            </div>

            {/* Slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Hours needed per month: <span className="text-purple-600">{hours}</span>
              </label>
              <input
                type="range"
                min="5"
                max="60"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                style={{
                  background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${((hours - 5) / 55) * 100}%, #e2e8f0 ${((hours - 5) / 55) * 100}%, #e2e8f0 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>5 hours</span>
                <span>60 hours</span>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {/* Traditional Firm */}
              <div className="p-6 rounded-xl border-2 border-red-200 bg-red-50">
                <div className="text-sm font-semibold text-red-900 mb-2">
                  Traditional Firm
                </div>
                <div className="text-3xl font-extrabold text-red-600">
                  AED {traditionalCost.toLocaleString()}
                </div>
                <div className="text-xs text-red-700 mt-1">
                  @{hourlyRate}/hour × {hours}h
                </div>
              </div>

              {/* Online Legal UAE */}
              <div className="p-6 rounded-xl border-2 border-green-200 bg-green-50">
                <div className="text-sm font-semibold text-green-900 mb-2">
                  Online Legal UAE
                </div>
                <div className="text-3xl font-extrabold text-green-600">
                  AED {retainerCost.toLocaleString()}
                </div>
                <div className="text-xs text-green-700 mt-1">
                  Growth Plan (fixed)
                </div>
              </div>

              {/* Savings */}
              <div className="p-6 rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-fuchsia-50">
                <div className="text-sm font-semibold text-purple-900 mb-2">
                  Your Savings
                </div>
                <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {savingsPercent}%
                </div>
                <div className="text-xs text-purple-700 mt-1">
                  Save AED {savings.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 mb-8">
              <h4 className="font-bold text-slate-900 mb-3">Annual Savings Breakdown:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Traditional annual cost:</span>
                  <span className="font-semibold text-slate-900">
                    AED {(traditionalCost * 12).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Retainer annual cost:</span>
                  <span className="font-semibold text-slate-900">
                    AED {(retainerCost * 12).toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-300 flex justify-between">
                  <span className="font-bold text-slate-900">Total annual savings:</span>
                  <span className="font-bold text-green-600">
                    AED {(savings * 12).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={onOpenModal}
                className="btn-solid px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
              >
                Book Your Retainer & Start Saving
              </button>
              <p className="text-sm text-slate-600 mt-4">
                No setup fees • Cancel anytime • Free consultation included
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}