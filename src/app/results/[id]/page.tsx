"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { DPPResult } from "@/lib/types";
import { loadResult } from "@/lib/utils";
import DPPCard from "@/components/DPPCard";
import ResultsTabs from "@/components/ResultsTabs";
import PDFExport from "@/components/PDFExport";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<DPPResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const data = loadResult(id);
    if (data) {
      setResult(data);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-4 border-primary-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
        <div className="card max-w-md mx-auto text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0H9.75m3 0H9.75m6.75 0V21m-5.25 0h5.25M6 6.375v15.75c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V6.375m-12 0A1.125 1.125 0 017.125 5.25h9.75A1.125 1.125 0 0118 6.375m-12 0v-.75A2.25 2.25 0 018.25 3.375h7.5A2.25 2.25 0 0118 5.625v.75"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Produktpass hittades inte
          </h2>
          <p className="text-gray-600 mb-6">
            Det digitala produktpasset kunde inte hittas. Det kan ha tagits
            bort eller sa ar lanken felaktig.
          </p>
          <Link href="/quiz" className="btn-primary">
            Skapa nytt produktpass
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-primary-50/30 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link
              href="/"
              className="hover:text-primary-600 transition-colors"
            >
              Hem
            </Link>
            <span>/</span>
            <span className="text-gray-900">Produktpass</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Digitalt Produktpass
              </h1>
              <p className="text-gray-500 mt-1">
                {result.quizData.productName} &middot; {result.dppId}
              </p>
            </div>
            <Link
              href="/quiz"
              className="btn-secondary text-sm py-2 px-4 self-start"
            >
              Skapa nytt produktpass
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: DPP Card */}
          <div className="lg:col-span-1 space-y-4">
            <DPPCard result={result} />
            <PDFExport result={result} />
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2">
            <div className="card">
              <ResultsTabs result={result} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
