
export default function HowItWorksSection() {
  return (
    <section id="how" className="bg-gradient-to-b from-white to-slate-50 pb-10">
      <div className="container">
        <h2 className="text-4xl anton tracking-wider text-center text-slate-900 mb-6">
          How can you Book Legal Services?
        </h2>

        <div className="grid-2-col items-stretch">
          {/* Left: Table Structure */}

          <div className="grid items-stretch gap-3 h-full">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">
             ONE-TIME SERVICE 
            </h3>
            <div className="card-neo px-3 py-3 flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-yellow-500 text-4xl">➕</div>
              <div className="text-left">
                <h4 className="font-bold text-yellow-600 text-2xl">Select</h4>
                <p className="text-slate-600 text-md">
                 Browse from a wide range of one-time legal services based on your specific requirement.
                </p>
              </div>
            </div>

            <div className="card-neo  px-3 py-3  flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-orange-500 text-4xl">💳</div>
              <div className="text-left">
                <h4 className="font-bold text-orange-600 text-2xl">Pay</h4>
                <p className="text-slate-600 text-lg">
                  Complete your payment online using a secure checkout. You will receive confirmation once your request is submitted.
                </p>
              </div>
            </div>

            <div className="card-neo  px-3 py-3  flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-pink-500 text-4xl">🗓️</div>
              <div className="text-left">
                <h4 className="font-bold text-pink-600 text-2xl">Manage</h4>
                <p className="text-slate-600 text-lg">
                Schedule consultations, join video calls, and upload or receive documents securely from your dashboard.
                </p>
              </div>
            </div>

            <div className="card-neo   px-3 py-3  flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-fuchsia-500 text-4xl">🎧</div>
              <div className="text-left">
                <h4 className="font-bold text-fuchsia-600 text-2xl">Support</h4>
                <p className="text-slate-600 text-lg">
                  Continue communication and receive updates or clarifications related to your service directly through the platform.
                </p>
              </div>
            </div>
          </div>
          <div className="grid items-stretch gap-3">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">
              MONTHLY RETAINER PLANS
            </h3>
            <div className="card-neo px-3 py-3 flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-yellow-500 text-4xl">🏠</div>
              <div className="text-left">
                <h4 className="font-bold text-2xl text-yellow-600">
                  Plan Selection
                </h4>
                <p className="text-slate-600 text-md">
                  Select from Starter, Growth, or Corporate plans based on the level of ongoing legal support you require.
                </p>
              </div>
            </div>
            <div className="card-neo px-3 py-3 flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-yellow-500 text-4xl">💰</div>
              <div className="text-left">
                <h4 className="font-bold text-xl sm:text-2xl text-orange-600">
                  Billing & Activation
                </h4>
                <p className="text-slate-600 text-sm">
                  Your retainer is activated upon subscription, with clear monthly billing and service limits as per the selected plan.
                </p>
              </div>
            </div>
            <div className="card-neo px-3 py-3 flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-yellow-500 text-4xl">⚙️</div>
              <div className="text-left">
                <h4 className="font-bold text-xl sm:text-2xl text-red-600">
                  Centralized Legal Management
                </h4>
                <p className="text-slate-600 text-sm">
                  Access consultations, document reviews, notices, and ongoing advice through a single dashboard without repeated payments
                </p>
              </div>
            </div>
            <div className="card-neo px-3 py-3 flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-yellow-500 text-4xl">🎧</div>
              <div className="text-left">
                <h4 className="font-bold text-xl sm:text-2xl text-fuchsia-600">
                 Priority Assistance
                </h4>
                <p className="text-slate-600 text-sm">
                  Retainer clients receive priority handling and structured response timelines based on the plan selected.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Integrated Secure Video */}
          {/* <div className="rounded-[22px] bg-gradient-to-br from-purple-500 to-violet-600 p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-white/25 flex items-center justify-center shadow">
                <Video className="w-6 h-6 text-white" />
              </span>
              <h3 className="text-heading-3 font-extrabold">
                Integrated Secure HD Video
              </h3>
            </div>

            <p className="mb-6 text-violet-50 leading-relaxed">
              Join calls instantly from your dashboard. Screen sharing &
              document sharing available.
            </p>

            <div
              className="rounded-[18px] p-6 mb-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.05))",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), 0 0 0 1px rgba(255,255,255,0.2)",
              }}
            >
              <div
                className="rounded-[14px] h-[360px] sm:h-[300px] flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #2563eb 40%, #4f46e5 100%)",
                }}
              >
                <div className="text-center text-violet-100">
                  <Video className="w-12 h-12 mx-auto mb-3 opacity-75" />
                  <div className="text-sm opacity-90">
                    Secure video consultation preview
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
