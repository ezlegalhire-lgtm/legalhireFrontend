
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
              Service Steps
            </h3>
            <div className="card-neo px-3 py-3 flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-yellow-500 text-4xl">➕</div>
              <div className="text-left">
                <h4 className="font-bold text-yellow-600 text-2xl">Select</h4>
                <p className="text-slate-600 text-md">
                  Choose from over 40+ different services tailored to your need.
                </p>
              </div>
            </div>

            <div className="card-neo  px-3 py-3  flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-orange-500 text-4xl">💳</div>
              <div className="text-left">
                <h4 className="font-bold text-orange-600 text-2xl">Pay</h4>
                <p className="text-slate-600 text-lg">
                  Securely pay using card checkout with instant confirmation.
                </p>
              </div>
            </div>

            <div className="card-neo  px-3 py-3  flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-pink-500 text-4xl">🗓️</div>
              <div className="text-left">
                <h4 className="font-bold text-pink-600 text-2xl">Manage</h4>
                <p className="text-slate-600 text-lg">
                  Schedule time, join video calls, and share documents securely.
                </p>
              </div>
            </div>

            <div className="card-neo   px-3 py-3  flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-fuchsia-500 text-4xl">🎧</div>
              <div className="text-left">
                <h4 className="font-bold text-fuchsia-600 text-2xl">Support</h4>
                <p className="text-slate-600 text-lg">
                  Follow up within your dashboard for ongoing legal assistance.
                </p>
              </div>
            </div>
          </div>
          <div className="grid items-stretch gap-3">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">
              Monthly Retainer Steps
            </h3>
            <div className="card-neo px-3 py-3 flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-yellow-500 text-4xl">🏠</div>
              <div className="text-left">
                <h4 className="font-bold text-2xl text-yellow-600">
                  Plan Selection
                </h4>
                <p className="text-slate-600 text-md">
                  Choose between Starter, Growth, or Corporate plans.Choose
                  between Starter,
                </p>
              </div>
            </div>
            <div className="card-neo px-3 py-3 flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-yellow-500 text-4xl">💰</div>
              <div className="text-left">
                <h4 className="font-bold text-xl sm:text-2xl text-orange-600">
                  Billing Flexibility
                </h4>
                <p className="text-slate-600 text-sm">
                  Choose between Starter, Growth, or Corporate plans.Choose
                  between Starter,
                </p>
              </div>
            </div>
            <div className="card-neo px-3 py-3 flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-yellow-500 text-4xl">⚙️</div>
              <div className="text-left">
                <h4 className="font-bold text-xl sm:text-2xl text-red-600">
                  CRM Integration
                </h4>
                <p className="text-slate-600 text-sm">
                  Choose between Starter, Growth, or Corporate plans.Choose
                  between Starter,
                </p>
              </div>
            </div>
            <div className="card-neo px-3 py-3 flex items-center gap-4  shadow-sm hover:shadow-md transition fade-in">
              <div className="text-yellow-500 text-4xl">🎧</div>
              <div className="text-left">
                <h4 className="font-bold text-xl sm:text-2xl text-fuchsia-600">
                  Priority Support
                </h4>
                <p className="text-slate-600 text-sm">
                  Choose between Starter, Growth, or Corporate plans.Choose
                  between Starter,
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
