// ContactModal.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  prefillPlan: string;
}

export default function ContactModal({ open, onClose, prefillPlan }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState('');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setPlan(prefillPlan || '');
  }, [prefillPlan]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, email, message, company, phone, plan };
    console.log('Lead Submitted', payload);
    alert('Thank you! Our team will contact you shortly.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900">
            Book a Free Consultation
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name *"
              className="input"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address *"
              className="input"
            />
          </div>

          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us briefly about your legal need *"
            className="input min-h-[120px] resize-none"
          />

          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="text-sm font-semibold text-purple-600 hover:text-purple-700 underline"
          >
            {showMore ? 'Hide additional details' : 'Add company / phone / plan'}
          </button>

          {showMore && (
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company Name (optional)"
                className="input"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number (optional)"
                className="input"
              />
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="input sm:col-span-2"
              >
                <option value="">Plan Selected (optional)</option>
                <option>Starter</option>
                <option>Growth</option>
                <option>Corporate</option>
              </select>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 btn-solid py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
            >
              Submit Request
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border-2 border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

