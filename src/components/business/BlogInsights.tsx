// BlogInsights.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BlogInsights() {
  const posts = [
    {
      title: 'New UAE Corporate Law Updates (2025)',
      description: 'Key changes every SME should know before renewing contracts.',
      link: '#'
    },
    {
      title: 'How Retainers Cut Legal Costs for SMEs',
      description: 'A practical guide with real examples from UAE businesses.',
      link: '#'
    },
    {
      title: 'Digital Transformation of Legal Services',
      description: 'Why integrated CRM + video + docs is the new normal.',
      link: '#'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Legal Insights & Updates
          </h2>
          <p className="text-lg text-slate-600">
            Expert articles for UAE businesses and individuals.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="card-neo p-6 hover-lift group"
            >
              <h3 className="font-bold text-slate-900 mb-3 leading-tight">
                {post.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {post.description}
              </p>
              <a
                href={post.link}
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
              >
                Read More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

