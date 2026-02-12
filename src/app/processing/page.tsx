"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadQuizState, clearQuizState, saveResult, generateId } from "@/lib/utils";

const STEPS = [
  "Analyserar produktinformation...",
  "Bedömer material och hållbarhet...",
  "Kontrollerar EU-compliance...",
  "Genererar hållbarhetsanalys...",
  "Skapar digitalt produktpass...",
];

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const quizData = loadQuizState();
    if (!quizData || !quizData.productName) {
      router.push("/quiz");
      return;
    }

    // Animate through loading steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 1500);

    // Make API call
    const generateDPP = async () => {
      try {
        const response = await fetch("/api/generate-dpp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quizData),
        });

        if (!response.ok) {
          throw new Error("Kunde inte generera produktpass");
        }

        const data = await response.json();

        // Save result
        const resultId = generateId();
        saveResult({
          id: resultId,
          dppId: data.dppId,
          quizData,
          aiResponse: data.response,
          createdAt: new Date().toISOString(),
        });

        clearQuizState();

        // Navigate to results
        router.push(`/results/${resultId}`);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ett oväntat fel inträffade"
        );
        clearInterval(stepInterval);
      }
    };

    generateDPP();

    return () => clearInterval(stepInterval);
  }, [router]);

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
        <div className="card max-w-md mx-auto text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Något gick fel
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/quiz")}
            className="btn-primary"
          >
            Försök igen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
      <div className="max-w-md mx-auto text-center px-4">
        {/* Animated spinner */}
        <div className="relative mx-auto h-24 w-24 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 animate-spin" />
          <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-secondary-500 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Genererar ditt produktpass
        </h2>

        {/* Progress steps */}
        <div className="space-y-3 text-left">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 transition-all duration-500 ${
                index <= currentStep
                  ? "opacity-100"
                  : "opacity-30"
              }`}
            >
              {index < currentStep ? (
                <svg
                  className="h-5 w-5 text-primary-600 flex-shrink-0"
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
              ) : index === currentStep ? (
                <div className="h-5 w-5 flex-shrink-0">
                  <div className="h-5 w-5 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
                </div>
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
              )}
              <span
                className={`text-sm ${
                  index <= currentStep
                    ? "text-gray-900 font-medium"
                    : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
