"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import QuizStep from "@/components/QuizStep";
import {
  QuizState,
  initialQuizState,
  CATEGORIES,
  MATERIALS,
  COUNTRIES,
  CERTIFICATIONS,
  RECYCLABILITY_OPTIONS,
} from "@/lib/types";
import { saveQuizState, loadQuizState } from "@/lib/utils";

const TOTAL_STEPS = 10;

export default function QuizPage() {
  const router = useRouter();
  const [state, setState] = useState<QuizState>(initialQuizState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = loadQuizState();
    if (saved) {
      setState(saved);
    }
  }, []);

  useEffect(() => {
    saveQuizState(state);
  }, [state]);

  const updateState = (updates: Partial<QuizState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (state.step < TOTAL_STEPS - 1) {
      updateState({ step: state.step + 1 });
    }
  };

  const prevStep = () => {
    if (state.step > 0) {
      updateState({ step: state.step - 1 });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    saveQuizState(state);
    router.push("/processing");
  };

  const toggleArrayItem = (
    field: keyof QuizState,
    value: string
  ) => {
    const current = state[field] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateState({ [field]: updated });
  };

  const renderStep = () => {
    switch (state.step) {
      case 0:
        return (
          <QuizStep
            title="Vilken kategori tillhor din produkt?"
            subtitle="Valj den kategori som bast beskriver din produkt."
            onNext={nextStep}
            isValid={state.category !== ""}
            isFirst
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => updateState({ category: cat.value })}
                  className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${
                    state.category === cat.value
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-primary-200 text-gray-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </QuizStep>
        );

      case 1:
        return (
          <QuizStep
            title="Vad heter din produkt?"
            subtitle="Ange produktens namn och en kort beskrivning."
            onNext={nextStep}
            onBack={prevStep}
            isValid={state.productName.trim() !== ""}
          >
            <div className="space-y-4">
              <div>
                <label className="label-text">Produktnamn *</label>
                <input
                  type="text"
                  value={state.productName}
                  onChange={(e) =>
                    updateState({ productName: e.target.value })
                  }
                  placeholder="T.ex. Ekbord Stockholm"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Kort beskrivning</label>
                <textarea
                  value={state.description}
                  onChange={(e) =>
                    updateState({ description: e.target.value })
                  }
                  placeholder="Beskriv din produkt kort (max 200 tecken)"
                  maxLength={200}
                  rows={3}
                  className="input-field resize-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {state.description.length}/200 tecken
                </p>
              </div>
            </div>
          </QuizStep>
        );

      case 2:
        return (
          <QuizStep
            title="Vilka material innehaller produkten?"
            subtitle="Valj alla material som ingar. Du kan valja flera."
            onNext={nextStep}
            onBack={prevStep}
            isValid={state.materials.length > 0}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {MATERIALS.map((material) => (
                  <button
                    key={material}
                    onClick={() => toggleArrayItem("materials", material)}
                    className={`p-3 rounded-xl border-2 text-left font-medium transition-all ${
                      state.materials.includes(material)
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 hover:border-primary-200 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                          state.materials.includes(material)
                            ? "border-primary-500 bg-primary-500"
                            : "border-gray-300"
                        }`}
                      >
                        {state.materials.includes(material) && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </div>
                      {material}
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="label-text">Ovriga material</label>
                <input
                  type="text"
                  value={state.customMaterial}
                  onChange={(e) =>
                    updateState({ customMaterial: e.target.value })
                  }
                  placeholder="Ange eventuella ovriga material"
                  className="input-field"
                />
              </div>
            </div>
          </QuizStep>
        );

      case 3:
        return (
          <QuizStep
            title="Var tillverkas produkten?"
            subtitle="Valj ursprungsland for tillverkning."
            onNext={nextStep}
            onBack={prevStep}
            isValid={state.originCountry !== ""}
          >
            <div className="space-y-3">
              {COUNTRIES.map((country) => (
                <button
                  key={country.value}
                  onClick={() =>
                    updateState({ originCountry: country.value })
                  }
                  className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center gap-3 ${
                    state.originCountry === country.value
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-primary-200 text-gray-700"
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      state.originCountry === country.value
                        ? "border-primary-500"
                        : "border-gray-300"
                    }`}
                  >
                    {state.originCountry === country.value && (
                      <div className="h-2.5 w-2.5 rounded-full bg-primary-500" />
                    )}
                  </div>
                  {country.label}
                </button>
              ))}
            </div>
          </QuizStep>
        );

      case 4:
        return (
          <QuizStep
            title="Har produkten nagon hallbarhetscertifiering?"
            subtitle="Valj alla certifieringar som produkten har."
            onNext={nextStep}
            onBack={prevStep}
            isValid={state.certifications.length > 0}
          >
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <button
                  key={cert.value}
                  onClick={() => {
                    if (cert.value === "inga") {
                      updateState({ certifications: ["inga"] });
                    } else {
                      const filtered = state.certifications.filter(
                        (c) => c !== "inga"
                      );
                      const updated = filtered.includes(cert.value)
                        ? filtered.filter((c) => c !== cert.value)
                        : [...filtered, cert.value];
                      updateState({ certifications: updated });
                    }
                  }}
                  className={`w-full p-3 rounded-xl border-2 text-left font-medium transition-all ${
                    state.certifications.includes(cert.value)
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-primary-200 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                        state.certifications.includes(cert.value)
                          ? "border-primary-500 bg-primary-500"
                          : "border-gray-300"
                      }`}
                    >
                      {state.certifications.includes(cert.value) && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      )}
                    </div>
                    {cert.label}
                  </div>
                </button>
              ))}
            </div>
          </QuizStep>
        );

      case 5:
        return (
          <QuizStep
            title="Hur latt ar produkten att reparera?"
            subtitle="Bedom hur enkelt det ar for en konsument att reparera produkten."
            onNext={nextStep}
            onBack={prevStep}
            isValid={true}
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Omojlig att reparera
                </span>
                <span className="text-sm text-gray-500">
                  Mycket latt
                </span>
              </div>
              <div className="flex justify-between gap-3">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() =>
                      updateState({ repairabilityScore: score })
                    }
                    className={`flex-1 py-4 rounded-xl border-2 text-center text-xl font-bold transition-all ${
                      state.repairabilityScore === score
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 hover:border-primary-200 text-gray-500"
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold text-primary-600">
                  {state.repairabilityScore === 1
                    ? "Omojlig att reparera"
                    : state.repairabilityScore === 2
                    ? "Svar att reparera"
                    : state.repairabilityScore === 3
                    ? "Medelsvar"
                    : state.repairabilityScore === 4
                    ? "Latt att reparera"
                    : "Mycket latt att reparera"}
                </span>
              </div>
            </div>
          </QuizStep>
        );

      case 6:
        return (
          <QuizStep
            title="Vad ar produktens forvantade livslangd?"
            subtitle="Ange i antal ar."
            onNext={nextStep}
            onBack={prevStep}
            isValid={state.lifespanYears.trim() !== ""}
          >
            <div className="space-y-4">
              <div>
                <label className="label-text">Forvantad livslangd (ar) *</label>
                <input
                  type="number"
                  value={state.lifespanYears}
                  onChange={(e) =>
                    updateState({ lifespanYears: e.target.value })
                  }
                  placeholder="T.ex. 10"
                  min="1"
                  max="100"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {["2", "5", "10", "25"].map((years) => (
                  <button
                    key={years}
                    onClick={() => updateState({ lifespanYears: years })}
                    className={`py-2 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                      state.lifespanYears === years
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 hover:border-primary-200 text-gray-600"
                    }`}
                  >
                    {years} ar
                  </button>
                ))}
              </div>
            </div>
          </QuizStep>
        );

      case 7:
        return (
          <QuizStep
            title="Hur atervinningsbar ar produkten?"
            subtitle="Valj alla alternativ som stammer."
            onNext={nextStep}
            onBack={prevStep}
            isValid={state.recyclability.length > 0}
          >
            <div className="space-y-3">
              {RECYCLABILITY_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleArrayItem("recyclability", option)}
                  className={`w-full p-3 rounded-xl border-2 text-left font-medium transition-all ${
                    state.recyclability.includes(option)
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-primary-200 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                        state.recyclability.includes(option)
                          ? "border-primary-500 bg-primary-500"
                          : "border-gray-300"
                      }`}
                    >
                      {state.recyclability.includes(option) && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      )}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </QuizStep>
        );

      case 8:
        return (
          <QuizStep
            title="Leverantorskedja"
            subtitle="Lista dina huvudleverantorer (valfritt men rekommenderas for compliance)."
            onNext={nextStep}
            onBack={prevStep}
            isValid={true}
          >
            <div>
              <label className="label-text">
                Huvudleverantorer (valfritt)
              </label>
              <textarea
                value={state.suppliers}
                onChange={(e) =>
                  updateState({ suppliers: e.target.value })
                }
                placeholder="T.ex.&#10;Tranemo Tra AB - Tra/virke&#10;Smalands Metall - Metallkomponenter&#10;Recycle AB - Atervinning"
                rows={5}
                className="input-field resize-none"
              />
              <p className="mt-2 text-xs text-gray-500">
                Ange en leverantor per rad. Inkludera garna vad de levererar.
              </p>
            </div>
          </QuizStep>
        );

      case 9:
        return (
          <QuizStep
            title="Foretagsinformation"
            subtitle="Ange ditt foretags kontaktuppgifter for produktpasset."
            onNext={handleSubmit}
            onBack={prevStep}
            isValid={
              state.companyName.trim() !== "" &&
              state.email.trim() !== ""
            }
            isLast
          >
            <div className="space-y-4">
              <div>
                <label className="label-text">Foretagsnamn *</label>
                <input
                  type="text"
                  value={state.companyName}
                  onChange={(e) =>
                    updateState({ companyName: e.target.value })
                  }
                  placeholder="T.ex. Smalands Mobler AB"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Organisationsnummer</label>
                <input
                  type="text"
                  value={state.orgNumber}
                  onChange={(e) =>
                    updateState({ orgNumber: e.target.value })
                  }
                  placeholder="T.ex. 556123-4567"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Kontaktperson</label>
                <input
                  type="text"
                  value={state.contactPerson}
                  onChange={(e) =>
                    updateState({ contactPerson: e.target.value })
                  }
                  placeholder="Fornamn Efternamn"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">E-postadress *</label>
                <input
                  type="email"
                  value={state.email}
                  onChange={(e) =>
                    updateState({ email: e.target.value })
                  }
                  placeholder="namn@foretag.se"
                  className="input-field"
                />
              </div>
            </div>
          </QuizStep>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-primary-50/30 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <ProgressBar currentStep={state.step} totalSteps={TOTAL_STEPS} />
        </div>
        <div className="card">{renderStep()}</div>
      </div>
    </div>
  );
}
