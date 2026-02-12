"use client";

import { DPPResult } from "@/lib/types";
import { getCategoryLabel, getCountryLabel, getScoreLabel } from "@/lib/utils";

interface PDFExportProps {
  result: DPPResult;
}

export default function PDFExport({ result }: PDFExportProps) {
  const handleExport = async () => {
    try {
      const jsPDF = (await import("jspdf")).default;
      const doc = new jsPDF();
      const { aiResponse, quizData } = result;

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      // Header
      doc.setFillColor(5, 150, 105); // primary-600
      doc.rect(0, 0, pageWidth, 40, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("Digitalt Produktpass", margin, 18);

      doc.setFontSize(10);
      doc.text(`ID: ${result.dppId}`, margin, 28);
      doc.text(
        `Skapad: ${new Date(result.createdAt).toLocaleDateString("sv-SE")}`,
        margin,
        34
      );

      y = 55;

      // Product Info
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(18);
      doc.text(quizData.productName, margin, y);
      y += 8;

      doc.setFontSize(11);
      doc.setTextColor(107, 114, 128);
      doc.text(
        `${getCategoryLabel(quizData.category)} | ${quizData.companyName}`,
        margin,
        y
      );
      y += 12;

      // Summary
      doc.setFontSize(13);
      doc.setTextColor(31, 41, 55);
      doc.text("Produktsammanfattning", margin, y);
      y += 7;

      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99);
      const summaryLines = doc.splitTextToSize(
        aiResponse.productSummary,
        contentWidth
      );
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 5 + 8;

      // Score
      doc.setFillColor(236, 253, 245);
      doc.roundedRect(margin, y, contentWidth, 20, 3, 3, "F");

      doc.setFontSize(12);
      doc.setTextColor(5, 150, 105);
      doc.text(
        `Hållbarhetspoäng: ${aiResponse.sustainabilityScore}/100 - ${getScoreLabel(aiResponse.sustainabilityScore)}`,
        margin + 5,
        y + 8
      );
      doc.text(
        `Reparerbarhet: ${quizData.repairabilityScore}/5 | Livslängd: ${quizData.lifespanYears} år`,
        margin + 5,
        y + 15
      );
      y += 28;

      // Materials
      doc.setFontSize(13);
      doc.setTextColor(31, 41, 55);
      doc.text("Material & Ursprung", margin, y);
      y += 7;

      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99);
      aiResponse.materialBreakdown.forEach((mat) => {
        doc.text(`- ${mat.material}: ${mat.percentage}%`, margin + 2, y);
        y += 5;
      });

      doc.text(
        `Ursprung: ${getCountryLabel(quizData.originCountry)}`,
        margin + 2,
        y
      );
      y += 10;

      // Compliance checklist
      if (y > 230) {
        doc.addPage();
        y = margin;
      }

      doc.setFontSize(13);
      doc.setTextColor(31, 41, 55);
      doc.text("EU-kravlista", margin, y);
      y += 7;

      doc.setFontSize(10);
      aiResponse.complianceChecklist.forEach((item) => {
        if (y > 270) {
          doc.addPage();
          y = margin;
        }

        const icon =
          item.status === "complete"
            ? "[OK]"
            : item.status === "required"
            ? "[!]"
            : "[X]";

        if (item.status === "complete") doc.setTextColor(5, 150, 105);
        else if (item.status === "required") doc.setTextColor(217, 119, 6);
        else doc.setTextColor(220, 38, 38);

        doc.text(`${icon} ${item.item}: ${item.details}`, margin + 2, y);
        y += 6;
      });

      y += 5;

      // Recommendations
      if (y > 230) {
        doc.addPage();
        y = margin;
      }

      doc.setFontSize(13);
      doc.setTextColor(31, 41, 55);
      doc.text("Rekommendationer", margin, y);
      y += 7;

      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99);
      aiResponse.recommendations.forEach((rec) => {
        if (y > 270) {
          doc.addPage();
          y = margin;
        }
        const recLines = doc.splitTextToSize(`- ${rec}`, contentWidth - 5);
        doc.text(recLines, margin + 2, y);
        y += recLines.length * 5 + 2;
      });

      // Environmental impact
      if (y > 220) {
        doc.addPage();
        y = margin;
      }

      y += 5;
      doc.setFontSize(13);
      doc.setTextColor(31, 41, 55);
      doc.text("Miljöpåverkan", margin, y);
      y += 7;

      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99);
      const envLines = doc.splitTextToSize(
        aiResponse.environmentalImpact,
        contentWidth
      );
      doc.text(envLines, margin, y);
      y += envLines.length * 5 + 8;

      // End of life
      if (y > 240) {
        doc.addPage();
        y = margin;
      }

      doc.setFontSize(13);
      doc.setTextColor(31, 41, 55);
      doc.text("Instruktioner för uttjänt produkt", margin, y);
      y += 7;

      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99);
      const eolLines = doc.splitTextToSize(
        aiResponse.endOfLifeInstructions,
        contentWidth
      );
      doc.text(eolLines, margin, y);

      // Footer on all pages
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(156, 163, 175);
        doc.text(
          `Generated by Digitala Produktpass | digitalaproduktpass.se | Sida ${i}/${totalPages}`,
          pageWidth / 2,
          285,
          { align: "center" }
        );
      }

      doc.save(`${result.dppId}-produktpass.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Kunde inte skapa PDF. Försök igen.");
    }
  };

  return (
    <button onClick={handleExport} className="w-full btn-accent text-sm py-2.5">
      <span className="flex items-center justify-center gap-2">
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
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        Exportera som PDF
      </span>
    </button>
  );
}
