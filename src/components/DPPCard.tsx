"use client";

import { DPPResult } from "@/lib/types";
import {
  getCategoryLabel,
  getScoreColor,
  getScoreLabel,
} from "@/lib/utils";
import { useEffect, useRef } from "react";

interface DPPCardProps {
  result: DPPResult;
}

export default function DPPCard({ result }: DPPCardProps) {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate QR code on canvas
    generateQRCode();
  }, [result]);

  const generateQRCode = async () => {
    if (!qrCanvasRef.current) return;

    const canvas = qrCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 160;
    canvas.width = size;
    canvas.height = size;

    // Simple QR-style visual placeholder
    // In production, this uses the qrcode library
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://digitalaproduktpass.se";
    const url = `${baseUrl}/results/${result.id}`;

    try {
      // Try to use qrcode library if available
      const QRCode = (await import("qrcode")).default;
      await QRCode.toCanvas(canvas, url, {
        width: size,
        margin: 2,
        color: {
          dark: "#065f46",
          light: "#ffffff",
        },
      });
    } catch {
      // Fallback: draw a placeholder QR pattern
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#065f46";

      const cellSize = 4;
      const moduleCount = Math.floor(size / cellSize);

      // Draw position detection patterns (corners)
      const drawCorner = (x: number, y: number) => {
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 7; j++) {
            if (
              i === 0 || i === 6 || j === 0 || j === 6 ||
              (i >= 2 && i <= 4 && j >= 2 && j <= 4)
            ) {
              ctx.fillRect(
                (x + i) * cellSize,
                (y + j) * cellSize,
                cellSize,
                cellSize
              );
            }
          }
        }
      };

      drawCorner(2, 2);
      drawCorner(moduleCount - 9, 2);
      drawCorner(2, moduleCount - 9);

      // Draw random data pattern
      const seed = result.dppId
        .split("")
        .reduce((a, b) => a + b.charCodeAt(0), 0);
      let rng = seed;
      for (let i = 10; i < moduleCount - 2; i++) {
        for (let j = 10; j < moduleCount - 2; j++) {
          rng = (rng * 1103515245 + 12345) & 0x7fffffff;
          if (rng % 3 === 0) {
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }

      // Add text below
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(result.dppId, size / 2, size - 4);
    }
  };

  const downloadQR = () => {
    if (!qrCanvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${result.dppId}-qr.png`;
    link.href = qrCanvasRef.current.toDataURL("image/png");
    link.click();
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/results/${result.id}`
      : "";

  const copyLink = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      alert("Lank kopierad!");
    }
  };

  return (
    <div className="card bg-gradient-to-br from-primary-50/50 to-white">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary-600 mb-3">
          <svg
            className="h-7 w-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {result.quizData.productName}
        </h2>
        <p className="text-sm text-gray-500">
          {getCategoryLabel(result.quizData.category)}
        </p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center mb-4">
        <div className="bg-white p-3 rounded-xl shadow-sm">
          <canvas ref={qrCanvasRef} className="mx-auto" />
        </div>
      </div>

      {/* DPP ID */}
      <div className="text-center mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          Produktpass-ID
        </p>
        <p className="text-sm font-mono font-bold text-primary-800 bg-primary-50 rounded-lg py-2 px-4 inline-block">
          {result.dppId}
        </p>
      </div>

      {/* Score */}
      <div className="text-center mb-6">
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-20 h-20" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={
                result.aiResponse.sustainabilityScore >= 75
                  ? "#10b981"
                  : result.aiResponse.sustainabilityScore >= 50
                  ? "#f59e0b"
                  : "#ef4444"
              }
              strokeWidth="3"
              strokeDasharray={`${result.aiResponse.sustainabilityScore}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <span
            className={`absolute text-lg font-bold ${getScoreColor(
              result.aiResponse.sustainabilityScore
            )}`}
          >
            {result.aiResponse.sustainabilityScore}
          </span>
        </div>
        <p className="text-sm font-medium text-gray-600 mt-1">
          {getScoreLabel(result.aiResponse.sustainabilityScore)}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={downloadQR}
          className="w-full btn-primary text-sm py-2.5"
        >
          Ladda ner QR-kod
        </button>
        <button
          onClick={copyLink}
          className="w-full btn-secondary text-sm py-2.5"
        >
          Dela produktpass
        </button>
      </div>

      {/* Company info */}
      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          {result.quizData.companyName}
          {result.quizData.orgNumber &&
            ` | ${result.quizData.orgNumber}`}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Skapad{" "}
          {new Date(result.createdAt).toLocaleDateString("sv-SE")}
        </p>
      </div>
    </div>
  );
}
