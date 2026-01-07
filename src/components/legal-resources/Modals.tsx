'use client';

import React, { useState } from 'react';
import { BRAND } from './SharedUI';

interface BlogItem {
  id: number;
  category: string;
  title: string;
  readTime: number;
  excerpt: string;
  content: string;
}

interface BlogModalProps {
  open: boolean;
  onClose: () => void;
  item: BlogItem | null;
}

export const BlogModal = ({ open, onClose, item }: BlogModalProps) => {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 max-h-[80vh] flex flex-col">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 text-lg">{item.title}</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"
          >
            ✕
          </button>
        </div>
        <div className="p-5 text-slate-700 text-sm overflow-y-auto flex-1" dangerouslySetInnerHTML={{ __html: item.content || '<p>Full blog content coming from API…</p>' }}></div>
        <div className="px-5 pb-5 border-t border-slate-200 pt-4">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface AskModalProps {
  open: boolean;
  onClose: () => void;
}

export const AskModal = ({ open, onClose }: AskModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with your endpoint, e.g. POST /api/questions
      // await fetch('/api/questions', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,question}) });
      await new Promise((res) => setTimeout(res, 600)); // demo delay
      alert('Thank you! Your question has been submitted.');
      setName('');
      setEmail('');
      setQuestion('');
      onClose();
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 text-lg">Ask a Legal Question</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"
          >
            ✕
          </button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <textarea
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question…"
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          ></textarea>
          <div className="pt-2 flex gap-2">
            <button
              disabled={loading}
              className="rounded-md px-4 py-2 text-white disabled:opacity-60 transition-opacity hover:opacity-90"
              style={{ background: BRAND.accent }}
            >
              {loading ? 'Submitting…' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
