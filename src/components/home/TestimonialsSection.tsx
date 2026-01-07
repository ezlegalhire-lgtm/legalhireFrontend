import React from 'react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'Seamless and professional.',
      content: 'Booking took 2 minutes and I had a consultation the same afternoon. Great advice and very clear next steps.',
      author: '— Ayesha Khan'
    },
    {
      quote: 'Transparent pricing.',
      content: 'No surprise fees. The fixed price made it easy to get approvals. Highly recommend for startups.',
      author: '— Omar Al Nuaimi'
    },
    {
      quote: 'The retainer is worth it.',
      content: 'We use the monthly plan with CRM access — everything is organized and response times are fast.',
      author: '— Priya Menon'
    }
  ];

  return (
    <section className="bg-white">
      <div className="container">
        <h2 className="text-4xl anton tracking-wider text-center text-slate-900 mb-6">
          What Our Clients Say
        </h2>

        <div className="grid-3-col">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card group"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <div className="font-bold text-slate-900 mb-2 text-base">
                &ldquo;{testimonial.quote}&rdquo;
              </div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {testimonial.content}
              </p>
              <div className="text-sm text-slate-600 font-medium">
                {testimonial.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}