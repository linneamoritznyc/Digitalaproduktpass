export interface QuizState {
  step: number;
  category: string;
  productName: string;
  description: string;
  materials: string[];
  customMaterial: string;
  originCountry: string;
  certifications: string[];
  repairabilityScore: number;
  lifespanYears: string;
  recyclability: string[];
  suppliers: string;
  companyName: string;
  orgNumber: string;
  contactPerson: string;
  email: string;
}

export const initialQuizState: QuizState = {
  step: 0,
  category: "",
  productName: "",
  description: "",
  materials: [],
  customMaterial: "",
  originCountry: "",
  certifications: [],
  repairabilityScore: 3,
  lifespanYears: "",
  recyclability: [],
  suppliers: "",
  companyName: "",
  orgNumber: "",
  contactPerson: "",
  email: "",
};

export interface MaterialBreakdown {
  material: string;
  percentage: number;
}

export interface ComplianceItem {
  item: string;
  status: "complete" | "incomplete" | "required";
  details: string;
}

export interface DPPResponse {
  dppId: string;
  productSummary: string;
  materialBreakdown: MaterialBreakdown[];
  sustainabilityScore: number;
  sustainabilityAnalysis: string;
  complianceChecklist: ComplianceItem[];
  recommendations: string[];
  environmentalImpact: string;
  endOfLifeInstructions: string;
  repairabilityDetails: string;
}

export interface DPPResult {
  id: string;
  dppId: string;
  quizData: QuizState;
  aiResponse: DPPResponse;
  createdAt: string;
}

export const CATEGORIES = [
  { value: "mobel", label: "Möbler" },
  { value: "textil", label: "Textilier" },
  { value: "elektronik", label: "Elektronik" },
  { value: "maskiner", label: "Maskiner & Verktyg" },
  { value: "forpackningar", label: "Förpackningar" },
  { value: "ovrigt", label: "Övrigt" },
] as const;

export const MATERIALS = [
  "Trä",
  "Metall",
  "Plast",
  "Textil",
  "Glas",
  "Återvunnet material",
  "Komposit",
  "Keramik",
] as const;

export const COUNTRIES = [
  { value: "sverige", label: "Sverige" },
  { value: "eu", label: "EU-land" },
  { value: "utanfor-eu", label: "Utanför EU" },
] as const;

export const CERTIFICATIONS = [
  { value: "fsc", label: "FSC (Forest Stewardship Council)" },
  { value: "gots", label: "GOTS (Global Organic Textile Standard)" },
  { value: "eu-ecolabel", label: "EU Ecolabel" },
  { value: "nordic-swan", label: "Nordic Swan (Svanen)" },
  { value: "cradle-to-cradle", label: "Cradle to Cradle" },
  { value: "iso14001", label: "ISO 14001" },
  { value: "inga", label: "Inga certifieringar" },
] as const;

export const RECYCLABILITY_OPTIONS = [
  "Kan återvinnas helt",
  "Kan delvis återvinnas",
  "Innehåller farliga ämnen som kräver specialhantering",
  "Biologiskt nedbrytbar",
  "Kan demonteras för återvinning",
] as const;
