import { QuizState, DPPResult } from "./types";

const STORAGE_KEY = "dpp-quiz-state";
const RESULTS_KEY = "dpp-results";

export function saveQuizState(state: QuizState): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function loadQuizState(): QuizState | null {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return null;
}

export function clearQuizState(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function saveResult(result: DPPResult): void {
  if (typeof window !== "undefined") {
    const existing = loadResults();
    existing.push(result);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(existing));
  }
}

export function loadResults(): DPPResult[] {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(RESULTS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return [];
}

export function loadResult(id: string): DPPResult | null {
  const results = loadResults();
  return results.find((r) => r.id === id) || null;
}

export function generateDPPId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, "0");
  return `DPP-SE-${year}-${random}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function getCategoryLabel(value: string): string {
  const categories: Record<string, string> = {
    mobel: "Möbler",
    textil: "Textilier",
    elektronik: "Elektronik",
    maskiner: "Maskiner & Verktyg",
    forpackningar: "Förpackningar",
    ovrigt: "Övrigt",
  };
  return categories[value] || value;
}

export function getCountryLabel(value: string): string {
  const countries: Record<string, string> = {
    sverige: "Sverige",
    eu: "EU-land",
    "utanfor-eu": "Utanför EU",
  };
  return countries[value] || value;
}

export function getScoreColor(score: number): string {
  if (score >= 75) return "text-primary-600";
  if (score >= 50) return "text-accent-600";
  return "text-red-600";
}

export function getScoreBgColor(score: number): string {
  if (score >= 75) return "bg-primary-500";
  if (score >= 50) return "bg-accent-500";
  return "bg-red-500";
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return "Utmärkt";
  if (score >= 75) return "Mycket bra";
  if (score >= 60) return "Bra";
  if (score >= 40) return "Godkänt";
  return "Behöver förbättras";
}
