import { CheckCircle, XCircle } from "lucide-react";
import React from "react";

function ConformationModal({
  isOpen,
  handleSubmit,
  setIsOpen,
  agreed,
  setAgreed,
}: any) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl h-[90vh] sm:h-auto sm:max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-gray-900">
                Terms and Conditions
              </h3>
              <button type="button" onClick={() => setIsOpen(false)}>
                <XCircle className="w-6 h-6 mr-1 text-gray-600" />
              </button>
            </div>

            {/* ==================================================
              3. SCROLLABLE CONTENT AREA (The 'Terms' itself)
              ==================================================
            */}
            <div className="flex-grow p-5 overflow-y-auto custom-scrollbar">
              {/* Content text (duplicated for scroll effect) */}
              <div className="text-sm text-gray-700 space-y-4">
                The following Terms constitute a binding agreement between you
                as the Client and the Service Provider with regard to the
                provision of the Service as described hereinafter. Service
                15-minute advice session on criminal issues in the UAE Service
                Provider Rashid Khalil Obaid Advocates and Legal Consultancy
                represented by Mr. Khaled Ebid
                <p className="font-bold text-lg">Service Standards</p>
                The Service Provider confirms that they are duly registered and
                licensed to provide the Service to the Client. The Service
                Provider will perform, provide and execute the Service with
                diligence and exercise reasonable care and skill. All work which
                the Service Provider carries out for the Client will be in
                accordance with the current professional guidance and practice,
                and based on the interpretation of the existing legislation
                relevant to the Service. Understanding the importance of the due
                and timely delivery of the Service, the Service Provider will
                use reasonable efforts to ensure the due and satisfactory
                execution and completion of the Service in accordance with the
                time-limit set for the same. Deliverables
                <p className="font-bold text-lg">Deliverables</p>
                The deliverables including but not limited to any documents,
                research, consultations, advice or any other communication, will
                be prepared by the Service Provider solely for the use of those
                to whom they are addressed and only for the purpose set out in
                the Service Description. The Service Provider accepts no
                liability or responsibility to any third party to whom the
                deliverables are shown or into whose hands they may come. The
                Service Provider owns all rights in the deliverables including,
                without limitation, any copyright. The Client may make copies of
                the deliverables for own internal use but the Client must not
                provide the deliverables, or copies of them, to any third party,
                including Client’s probable other advisors without first
                obtaining the Service Provider’s written consent so that the
                Service Provider has an opportunity to consider the context in
                which their advice is being used. Whether or not the Service
                Provider has given their consent, the Service Provider will not
                accept any liability or responsibility to any third party who
                may gain access to the deliverables.
                <p className="font-bold text-lg">Client’s Responsibility</p>
                The Client confirms his/her legal capacity to enter into an
                agreement regarding the Service with the Service Provider under
                this Terms of Service. Prior to commencing the Service, the
                Service Provider will require certain information and documents
                from the Client. The actual commencement of the Service will be
                once all the required information and documents are provided by
                the Client and duly received by the Service Provider. The Client
                undertakes to provide the Service Provider with all the relevant
                information and documents concerning the Service, to cooperate
                with the Service Provider, promptly deliver documents and
                information, respond to the Service Provider’s communications
                (letters, telephone calls, emails or other forms of electronic
                communication) as soon as possible and to perform other acts
                necessary for timely provision of the Service by the Service
                Provider. In certain situations and when requested, the Client
                shall provide to the Service Provider a power of attorney for
                performing the Service. The Client shall be honest and disclose
                to the Service Provider in a timely and complete manner all the
                facts, circumstances and information, documented or otherwise,
                in the Client’s possession, which have a bearing on the issues
                involved and could affect the provision of the Service by the
                Service Provider. It is the Client’s responsibility to consider
                comments and opinion of the Service Provider and make his/her
                own decisions based on the information available to the Client.
              </div>
            </div>

            {/* ==================================================
              4. FIXED BOTTOM FOOTER SECTION 
                 (Uses flex-shrink-0 to prevent scrolling and fixed bottom effect)
              ==================================================
            */}
            <div className="flex-shrink-0 p-5 border-t border-gray-200 bg-white">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                {/* Checkbox */}
                <div className="flex items-center">
                  <input
                    id="agreement-checkbox"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="agreement-checkbox"
                    className="ml-3 text-sm font-medium text-gray-900"
                  >
                    I have read and agree to the **Terms and Conditions**
                  </label>
                </div>

                <div className="flex space-x-3">
                  {/* Purple Submit Button (Primary Action) */}
                  <button
                    type="submit"
                    disabled={!agreed} // DISABLE when agreed is FALSE
                    className={`flex-1 flex items-center justify-center py-3 rounded-lg text-white font-semibold transition duration-150 shadow-md
                      ${
                        agreed
                          ? "bg-purple-600 hover:bg-purple-700" // ENABLED state (Purple)
                          : "bg-gray-400 cursor-not-allowed" // DISABLED state
                      }`}
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Accept and Submit
                  </button>

                  {/* Cancel/Close Button (Secondary Action) */}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConformationModal;
