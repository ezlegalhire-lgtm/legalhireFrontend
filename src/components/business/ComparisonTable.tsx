import React from 'react';

export default function ComparisonTable() {
  const rows = [
    ['Dedicated CRM Dashboard', '✅ Included', '❌ None', '⚠️ Limited'],
    ['Retainer Hour Tracking', '✅ Live tracker', '❌ Manual invoices', '⚠️ Approximate'],
    ['Integrated Video Meetings', '✅ Built-in', '⚠️ Separate apps', '⚠️ Limited'],
    ['Document Vault & E‑Sign', '✅ Secure uploads & signing', '⚠️ Manual exchange', '⚠️ Some'],
    ['Transparent Monthly Pricing', '✅ Fixed packages', '❌ Hourly rates', '⚠️ Hidden fees'],
    ['Dedicated Account Manager', '✅ Yes', '⚠️ Optional', '❌ None'],
    ['Client Chat & Notifications', '✅ Built-in chat', '❌ Phone/email only', '⚠️ Partial'],
    ['AI Document Automation', '✅ Yes', '❌ None', '⚠️ Limited'],
    ['UAE Law Expertise', '✅ Licensed locally', '✅', '⚠️ Outsourced'],
    ['Calendar & Meeting Sync', '✅ Google/Outlook', '❌ Manual', '⚠️ External tools'],
    ['Confidential UAE Hosting', '✅ Yes', '⚠️ Variable', '❌ No guarantee']
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            How We Compare
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            The only UAE portal combining CRM, video, calendar, and secure docs — all-in-one.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-2xl border-2 border-slate-200 shadow-xl">
              <table className="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left bg-slate-50">
                      <span className="text-sm font-bold text-slate-700">Feature</span>
                    </th>
                    <th className="px-6 py-4 text-left bg-gradient-to-r from-purple-600 to-fuchsia-600">
                      <span className="text-sm font-bold text-white">Online Legal UAE</span>
                    </th>
                    <th className="px-6 py-4 text-left bg-slate-50">
                      <span className="text-sm font-bold text-slate-700">Traditional Firms</span>
                    </th>
                    <th className="px-6 py-4 text-left bg-slate-50">
                      <span className="text-sm font-bold text-slate-700">Other Portals</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {rows.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        {row[0]}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-700 bg-green-50">
                        {row[1]}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {row[2]}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {row[3]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            <span className="font-semibold text-slate-900">Legend:</span>{' '}
            ✅ = Full feature included | ⚠️ = Partial or limited | ❌ = Not available
          </p>
        </div>
      </div>
    </section>
  );
}