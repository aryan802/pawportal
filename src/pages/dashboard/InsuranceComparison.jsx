import React, { useState } from "react";

const mockPlans = [
  {
    id: 1,
    provider: "PetSecure India",
    plan: "Basic Care",
    premium: "₹2,000/year",
    coverage: "Accidents, Illnesses, Hospitalization",
    exclusions: "Pre-existing conditions, Routine checkups",
    claimProcess: "Online, 48hr approval",
    contact: "1800-111-222, support@petsecure.in",
    rating: 4.5,
    features: [
      "Covers all breeds",
      "Cashless at partner clinics",
      "24x7 helpline",
    ],
    link: "https://petsecure.in/basic-care",
  },
  {
    id: 2,
    provider: "Pawsure",
    plan: "Premium Shield",
    premium: "₹3,500/year",
    coverage: "Accidents, Illnesses, Surgeries, Vaccinations",
    exclusions: "Cosmetic procedures, Breeding",
    claimProcess: "App-based, 24hr approval",
    contact: "1800-333-444, care@pawsure.com",
    rating: 4.8,
    features: [
      "Vaccination cover",
      "Annual health checkup",
      "No co-pay for claims",
    ],
    link: "https://pawsure.com/premium-shield",
  },
  {
    id: 3,
    provider: "InsureMyPet",
    plan: "Comprehensive",
    premium: "₹2,800/year",
    coverage: "Accidents, Illnesses, Theft/Loss, Third-party liability",
    exclusions: "Pregnancy, Dental care",
    claimProcess: "Email, 72hr approval",
    contact: "1800-555-666, hello@insuremypet.in",
    rating: 4.3,
    features: [
      "Covers theft/loss",
      "Third-party liability",
      "Multi-pet discount",
    ],
    link: "https://insuremypet.in/comprehensive",
  },
];

const InsuranceComparison = () => {
  const [plans] = useState(mockPlans);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-yellow-50 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full flex flex-col items-center relative">
        <h1 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          Pet Insurance Comparisons
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-pink-50 border border-pink-200 rounded-xl p-4 flex flex-col items-center shadow"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-1">{plan.provider}</h2>
              <div className="text-pink-700 font-semibold mb-1">{plan.plan}</div>
              <div className="text-gray-600 mb-1">Premium: {plan.premium}</div>
              <div className="text-green-700 mb-1 font-medium">Coverage: {plan.coverage}</div>
              <div className="text-red-500 mb-1 text-sm">Exclusions: {plan.exclusions}</div>
              <div className="text-blue-700 mb-1 text-sm">Claim: {plan.claimProcess}</div>
              <div className="text-gray-700 mb-1 text-sm">Contact: {plan.contact}</div>
              <div className="text-yellow-600 mb-1">Rating: {plan.rating} ⭐</div>
              <ul className="list-disc ml-5 text-gray-700 text-sm mb-2">
                {plan.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition mt-2"
              >
                View Details / Buy
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsuranceComparison;