"use client";

import { ReactNode } from "react";

interface QuizStepProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  isValid: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function QuizStep({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  isValid,
  isFirst = false,
  isLast = false,
}: QuizStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-gray-600">{subtitle}</p>
        )}
      </div>

      <div className="mb-8">{children}</div>

      <div className="flex justify-between items-center">
        {!isFirst ? (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Tillbaka
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white shadow-sm transition-all ${
            isValid
              ? "bg-primary-600 hover:bg-primary-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isLast ? "Generera produktpass" : "Nästa"}
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
