"use client";

import { useState } from "react";
import { DPPResult } from "@/lib/types";
import {
  getCategoryLabel,
  getCountryLabel,
  getScoreColor,
  getScoreBgColor,
} from "@/lib/utils";

interface ResultsTabsProps {
  result: DPPResult;
}

const TABS = [
  { id: "overview", label: "Oversikt" },
  { id: "materials", label: "Material" },
  { id: "sustainability", label: "Hallbarhet" },
  { id: "compliance", label: "Compliance" },
];

export default function ResultsTabs({ result }: ResultsTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { aiResponse, quizData } = result;

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Produktsammanfattning
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {aiResponse.productSummary}
              </p>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-primary-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-primary-700">
                  {aiResponse.sustainabilityScore}
                </p>
                <p className="text-xs text-primary-600 mt-1">
                  Hallbarhetspoang
                </p>
              </div>
              <div className="bg-secondary-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-secondary-700">
                  {quizData.repairabilityScore}/5
                </p>
                <p className="text-xs text-secondary-600 mt-1">
                  Reparerbarhet
                </p>
              </div>
              <div className="bg-accent-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-accent-700">
                  {quizData.lifespanYears}
                </p>
                <p className="text-xs text-accent-600 mt-1">
                  Ar livslangd
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-700">
                  {quizData.materials.length}
                </p>
                <p className="text-xs text-gray-600 mt-1">Material</p>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Rekommendationer
              </h3>
              <div className="space-y-2">
                {aiResponse.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-accent-50 rounded-lg p-3"
                  >
                    <svg
                      className="h-5 w-5 text-accent-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                      />
                    </svg>
                    <p className="text-sm text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "materials" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Materialkomposition
              </h3>
              {/* Bar chart */}
              <div className="space-y-3">
                {aiResponse.materialBreakdown.map((mat, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {mat.material}
                      </span>
                      <span className="text-sm text-gray-500">
                        {mat.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-primary-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${mat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {quizData.customMaterial && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Ovriga material
                </h4>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {quizData.customMaterial}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ursprung
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-secondary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Tillverkningsland
                    </p>
                    <p className="text-sm text-gray-600">
                      {getCountryLabel(quizData.originCountry)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {quizData.suppliers && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Leverantorer
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {quizData.suppliers}
                  </p>
                </div>
              </div>
            )}

            {quizData.certifications.length > 0 &&
              !quizData.certifications.includes("inga") && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Certifieringar
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {quizData.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-200"
                      >
                        {cert.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}

        {activeTab === "sustainability" && (
          <div className="space-y-6">
            {/* Score gauge */}
            <div className="text-center bg-gradient-to-br from-primary-50 to-white rounded-xl p-6">
              <div className="relative inline-flex items-center justify-center mb-3">
                <svg className="w-32 h-32" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={
                      aiResponse.sustainabilityScore >= 75
                        ? "#10b981"
                        : aiResponse.sustainabilityScore >= 50
                        ? "#f59e0b"
                        : "#ef4444"
                    }
                    strokeWidth="2.5"
                    strokeDasharray={`${aiResponse.sustainabilityScore}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <span
                    className={`text-3xl font-bold ${getScoreColor(
                      aiResponse.sustainabilityScore
                    )}`}
                  >
                    {aiResponse.sustainabilityScore}
                  </span>
                  <span className="block text-xs text-gray-500">/100</span>
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                Hallbarhetspoang
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hallbarhetsanalys
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {aiResponse.sustainabilityAnalysis}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Reparerbarhet
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-5 w-5 ${
                        star <= quizData.repairabilityScore
                          ? "text-accent-500"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {quizData.repairabilityScore}/5
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  {aiResponse.repairabilityDetails}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Miljopaverkan
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {aiResponse.environmentalImpact}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                End-of-Life
              </h3>
              <div className="bg-primary-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  {aiResponse.endOfLifeInstructions}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {quizData.recyclability.map((option) => (
                  <span
                    key={option}
                    className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-200"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                EU DPP Compliance-checklista
              </h3>
              <div className="space-y-3">
                {aiResponse.complianceChecklist.map((item, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-4 ${
                      item.status === "complete"
                        ? "bg-primary-50"
                        : item.status === "required"
                        ? "bg-accent-50"
                        : "bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {item.status === "complete" ? (
                        <svg
                          className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : item.status === "required" ? (
                        <svg
                          className="h-5 w-5 text-accent-600 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.item}
                        </p>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {item.details}
                        </p>
                      </div>
                      <span
                        className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
                          item.status === "complete"
                            ? "bg-primary-100 text-primary-700"
                            : item.status === "required"
                            ? "bg-accent-100 text-accent-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status === "complete"
                          ? "Komplett"
                          : item.status === "required"
                          ? "Kravs"
                          : "Saknas"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-primary-600">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {
                    aiResponse.complianceChecklist.filter(
                      (c) => c.status === "complete"
                    ).length
                  }{" "}
                  klara
                </span>
                <span className="flex items-center gap-1 text-accent-600">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                  {
                    aiResponse.complianceChecklist.filter(
                      (c) => c.status === "required"
                    ).length
                  }{" "}
                  att komplettera
                </span>
                <span className="flex items-center gap-1 text-red-600">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {
                    aiResponse.complianceChecklist.filter(
                      (c) => c.status === "incomplete"
                    ).length
                  }{" "}
                  saknas
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
