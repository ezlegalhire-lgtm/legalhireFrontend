// TestimonialsSection.tsx
import React from 'react';
import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "We moved all corporate retainers here. Transparent, fast, and our team loves the dashboard.",
      author: "Ahmed Al Noor",
      role: "CEO, Noor Trading LLC"
    },
    {
      quote: "The integrated CRM and video meetings made legal work effortless for our HR and finance.",
      author: "Fatima Khan",
      role: "HR Head, Gulf SME"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-neo p-8 hover-lift"
            >
              <Quote className="w-10 h-10 text-purple-600 mb-4" />
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.author[0]}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

