import {
  AlertCircle,
  Check,
  ChevronDown,
  FileText,
  Info,
  Lock,
  RefreshCw,
} from "lucide-react";

function TabView({
  activeTab,
  howItWorks,
  faqs,
  service,
  setExpandedFaq,
  expandedFaq,
  features,
  whatsIncluded,
}: any) {
  return (
    <>
      {activeTab === "description" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Service Description
            </h2>
            {/* <p className="text-slate-700 leading-relaxed mb-6">
              {service.description ||
                "Professional legal consultation service provided by licensed UAE lawyers."}
            </p> */}
            <div className="rich-text-content">
              <div
                dangerouslySetInnerHTML={{ __html: service.description || "" }}
              />
            </div>
          </div>

          {whatsIncluded?.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                What&apos;s Included:
              </h3>
              <ul className="space-y-2">
                {whatsIncluded.map((item: any, index: any) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature: any, index: any) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-slate-700 font-medium">
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* How It Works Tab */}
      {activeTab === "how-it-works" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            How It Works
          </h2>
          {howItWorks?.length > 0 ? (
            <div className="space-y-6">
              {howItWorks.map((step: any) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600">
              Process information will be available soon.
            </p>
          )}
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          {faqs?.length > 0 ? (
            faqs.map((faq: any, index: any) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 transition-transform ${
                      expandedFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                    <p className="text-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-slate-600">No FAQs available at the moment.</p>
          )}
        </div>
      )}

      {/* Terms & Policy Tab */}
      {activeTab === "terms" && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              Terms & Conditions
            </h2>
            <div className="prose prose-sm max-w-none text-slate-700 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">
                1. Service Agreement
              </h3>
              <p>
                {service.metadata?.terms?.serviceAgreement ||
                  "By booking this service, you agree to these terms and conditions."}
              </p>

              <h3 className="text-lg font-semibold text-slate-900">
                2. Payment Terms
              </h3>
              <p>
                {service.metadata?.terms?.paymentTerms ||
                  "Full payment is required at the time of booking."}
              </p>

              <h3 className="text-lg font-semibold text-slate-900">
                3. Confidentiality
              </h3>
              <p>
                {service.metadata?.terms?.confidentiality ||
                  "All communications are protected by attorney-client privilege."}
              </p>

              <h3 className="text-lg font-semibold text-slate-900">
                4. Scope of Service
              </h3>
              <p>
                {service.metadata?.terms?.scopeOfService ||
                  "This service provides general legal advice based on the information you provide."}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-purple-600" />
              Cancellation & Refund Policy
            </h2>
            <div className="prose prose-sm max-w-none text-slate-700 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  Cancellation Timeframes
                </h4>
                <ul className="space-y-2 ml-7">
                  <li>
                    <strong>More than 48 hours:</strong>{" "}
                    {service.metadata?.cancellationPolicy?.moreThan48Hours ||
                      "Full refund minus 5% processing fee"}
                  </li>
                  <li>
                    <strong>24-48 hours:</strong>{" "}
                    {service.metadata?.cancellationPolicy
                      ?.between24And48Hours || "50% refund"}
                  </li>
                  <li>
                    <strong>Less than 24 hours:</strong>{" "}
                    {service.metadata?.cancellationPolicy?.lessThan24Hours ||
                      "No refund, but can reschedule once"}
                  </li>
                </ul>
              </div>

              <p>
                {service.metadata?.cancellationPolicy?.contactInfo ||
                  "To cancel or reschedule, please contact us."}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple-600" />
              Privacy & Data Protection
            </h2>
            <div className="prose prose-sm max-w-none text-slate-700 space-y-4">
              <p>
                {service.metadata?.privacyPolicy?.commitment ||
                  "We are committed to protecting your privacy and personal data."}
              </p>
              {service.metadata?.privacyPolicy?.protections &&
                service.metadata.privacyPolicy.protections.length > 0 && (
                  <ul className="space-y-2 ml-7">
                    {service.metadata.privacyPolicy.protections.map(
                      (protection: any, index: any) => (
                        <li key={index}>{protection}</li>
                      )
                    )}
                  </ul>
                )}
            </div>
          </div>

          {service.metadata?.disclaimer && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-violet-600" />
                Important Disclaimer
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {service.metadata.disclaimer}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default TabView;
