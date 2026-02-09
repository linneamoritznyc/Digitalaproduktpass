import { NextRequest, NextResponse } from "next/server";
import { QuizState, DPPResponse } from "@/lib/types";
import { generateDPPId, getCategoryLabel, getCountryLabel } from "@/lib/utils";

const systemPrompt = `Du är en expert på EU:s Digital Product Passport-krav (ESPR - Ecodesign for Sustainable Products Regulation) och hållbarhetsanalyser för svenska tillverkare.

Generera ett komplett digitalt produktpass baserat på produktinformationen.

Du MÅSTE returnera giltig JSON med exakt denna struktur (inga andra nycklar, inga kommentarer):
{
  "productSummary": "2-3 meningars sammanfattning av produkten",
  "materialBreakdown": [{"material": "namn", "percentage": nummer}],
  "sustainabilityScore": nummer mellan 0-100,
  "sustainabilityAnalysis": "Detaljerad hållbarhetsanalys",
  "complianceChecklist": [{"item": "kravnamn", "status": "complete|incomplete|required", "details": "detaljer"}],
  "recommendations": ["rekommendation 1", "rekommendation 2"],
  "environmentalImpact": "Miljöpåverkansanalys",
  "endOfLifeInstructions": "Instruktioner för slutet av produktens livscykel",
  "repairabilityDetails": "Detaljerad info om reparerbarhet"
}

Hållbarhetspoängen (0-100) baseras på:
- Materialval (återvunna/hållbara material ger högre poäng)
- Reparerbarhet (1-5 skala, högre = bättre)
- Livslängd (längre = bättre)
- Återvinningsbarhet (fler alternativ = bättre)
- Certifieringar (fler = bättre)
- Ursprungsland (lokal produktion = bättre)

Compliance-checklistan ska inkludera dessa EU DPP-krav:
1. Materialdeklaration
2. Ursprungsinformation
3. Återvinningsinstruktioner
4. Säkerhetsinformation
5. Energieffektivitet (om relevant)
6. Hållbarhetsdata
7. Reparationsinformation
8. Leverantörskedja

Svara ALLTID på svenska. Returnera ENBART giltig JSON utan markdown-formatering.`;

function buildUserPrompt(data: QuizState): string {
  const certLabels: Record<string, string> = {
    fsc: "FSC",
    gots: "GOTS",
    "eu-ecolabel": "EU Ecolabel",
    "nordic-swan": "Nordic Swan",
    "cradle-to-cradle": "Cradle to Cradle",
    iso14001: "ISO 14001",
    inga: "Inga certifieringar",
  };

  const certs = data.certifications
    .map((c) => certLabels[c] || c)
    .join(", ");

  return `Produkt: ${data.productName}
Kategori: ${getCategoryLabel(data.category)}
Beskrivning: ${data.description || "Ej angiven"}
Material: ${data.materials.join(", ")}${data.customMaterial ? ", " + data.customMaterial : ""}
Ursprung: ${getCountryLabel(data.originCountry)}
Certifieringar: ${certs}
Reparerbarhet: ${data.repairabilityScore}/5
Förväntad livslängd: ${data.lifespanYears} år
Återvinningsbarhet: ${data.recyclability.join(", ")}
Leverantörer: ${data.suppliers || "Ej angivna"}
Företag: ${data.companyName}

Generera ett komplett Digital Product Passport.`;
}

export async function POST(request: NextRequest) {
  try {
    const quizData: QuizState = await request.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // Return mock data for development/demo when no API key is set
      const mockResponse: DPPResponse = generateMockDPP(quizData);
      return NextResponse.json({
        dppId: generateDPPId(),
        response: mockResponse,
      });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: buildUserPrompt(quizData),
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", error);
      // Fall back to mock data on API error
      const mockResponse: DPPResponse = generateMockDPP(quizData);
      return NextResponse.json({
        dppId: generateDPPId(),
        response: mockResponse,
      });
    }

    const result = await response.json();
    const content = result.content[0].text;

    let parsed: DPPResponse;
    try {
      parsed = JSON.parse(content);
    } catch {
      // Try extracting JSON from markdown code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1].trim());
      } else {
        throw new Error("Could not parse AI response as JSON");
      }
    }

    return NextResponse.json({
      dppId: generateDPPId(),
      response: parsed,
    });
  } catch (error) {
    console.error("Error generating DPP:", error);
    return NextResponse.json(
      { error: "Failed to generate product passport" },
      { status: 500 }
    );
  }
}

function generateMockDPP(data: QuizState): DPPResponse {
  const materialCount = data.materials.length;
  const evenPercentage = Math.floor(100 / Math.max(materialCount, 1));
  const materialBreakdown = data.materials.map((m, i) => ({
    material: m,
    percentage:
      i === materialCount - 1
        ? 100 - evenPercentage * (materialCount - 1)
        : evenPercentage,
  }));

  let score = 50;
  if (data.repairabilityScore >= 4) score += 10;
  if (data.repairabilityScore >= 5) score += 5;
  if (parseInt(data.lifespanYears) >= 10) score += 10;
  if (data.materials.includes("Återvunnet material")) score += 10;
  if (data.certifications.length > 1 && !data.certifications.includes("inga"))
    score += 10;
  if (data.originCountry === "sverige") score += 5;
  if (data.recyclability.includes("Kan återvinnas helt")) score += 5;
  if (data.recyclability.includes("Biologiskt nedbrytbar")) score += 5;
  score = Math.min(score, 100);

  return {
    dppId: generateDPPId(),
    productSummary: `${data.productName} är en ${getCategoryLabel(data.category).toLowerCase()}-produkt tillverkad ${getCountryLabel(data.originCountry) === "Sverige" ? "i Sverige" : "inom " + getCountryLabel(data.originCountry)}. Produkten innehåller ${data.materials.join(", ").toLowerCase()} och har en förväntad livslängd på ${data.lifespanYears} år. ${data.description || ""}`,
    materialBreakdown,
    sustainabilityScore: score,
    sustainabilityAnalysis: `Produkten visar ${score >= 70 ? "god" : score >= 50 ? "acceptabel" : "bristfällig"} hållbarhetsprestanda. Reparerbarhet bedöms till ${data.repairabilityScore}/5 och livslängden på ${data.lifespanYears} år ${parseInt(data.lifespanYears) >= 10 ? "överstiger branschgenomsnittet" : "ligger inom normalt spann"}. ${data.materials.includes("Återvunnet material") ? "Användningen av återvunnet material bidrar positivt till den cirkulära ekonomin." : "Överväg att inkludera återvunna material för att förbättra hållbarhetspoängen."}`,
    complianceChecklist: [
      {
        item: "Materialdeklaration",
        status: data.materials.length > 0 ? "complete" : "incomplete",
        details:
          data.materials.length > 0
            ? "Material har deklarerats"
            : "Material saknas",
      },
      {
        item: "Ursprungsinformation",
        status: data.originCountry ? "complete" : "incomplete",
        details: `Tillverkningsland: ${getCountryLabel(data.originCountry)}`,
      },
      {
        item: "Återvinningsinstruktioner",
        status: data.recyclability.length > 0 ? "complete" : "incomplete",
        details:
          data.recyclability.length > 0
            ? "Återvinningsinformation angiven"
            : "Återvinningsinformation saknas",
      },
      {
        item: "Säkerhetsinformation",
        status: "required",
        details: "Komplettera med produktsäkerhetsdatablad",
      },
      {
        item: "Hållbarhetsdata",
        status: "complete",
        details: `Hållbarhetspoäng: ${score}/100`,
      },
      {
        item: "Reparationsinformation",
        status: "complete",
        details: `Reparerbarhet: ${data.repairabilityScore}/5`,
      },
      {
        item: "Leverantörskedja",
        status: data.suppliers ? "complete" : "incomplete",
        details: data.suppliers
          ? "Leverantörer har dokumenterats"
          : "Ange leverantörer för full compliance",
      },
      {
        item: "Certifieringar",
        status:
          data.certifications.length > 0 &&
          !data.certifications.includes("inga")
            ? "complete"
            : "incomplete",
        details:
          data.certifications.includes("inga")
            ? "Inga certifieringar - överväg att certifiera produkten"
            : `Certifieringar: ${data.certifications.join(", ")}`,
      },
    ],
    recommendations: [
      ...(data.materials.includes("Återvunnet material")
        ? []
        : ["Överväg att använda återvunna material för förbättrad hållbarhet"]),
      ...(data.certifications.includes("inga")
        ? [
            "Undersök möjligheten att erhålla relevanta hållbarhetscertifieringar som Nordic Swan eller EU Ecolabel",
          ]
        : []),
      ...(data.repairabilityScore < 4
        ? [
            "Förbättra produktens reparerbarhet genom modulär design och tillgängliga reservdelar",
          ]
        : []),
      ...(!data.suppliers
        ? [
            "Dokumentera leverantörskedjan för full EU DPP-compliance",
          ]
        : []),
      "Skapa en detaljerad reparationsguide som kan länkas via QR-koden",
      "Implementera spårbarhet genom hela leverantörskedjan",
    ],
    environmentalImpact: `Baserat på materialval (${data.materials.join(", ")}), tillverkning ${getCountryLabel(data.originCountry) === "Sverige" ? "i Sverige" : "utomlands"}, och en livslängd på ${data.lifespanYears} år bedöms produktens miljöpåverkan som ${score >= 70 ? "låg till medel" : score >= 50 ? "medel" : "medel till hög"}. ${data.recyclability.includes("Kan återvinnas helt") ? "Möjligheten att återvinna produkten helt bidrar till minskad miljöpåverkan." : "Ökad återvinningsbarhet skulle minska den totala miljöpåverkan."}`,
    endOfLifeInstructions: `Vid slutet av produktens livscykel: ${data.recyclability.join(". ")}. ${data.recyclability.includes("Innehåller farliga ämnen som kräver specialhantering") ? "OBS: Produkten innehåller ämnen som kräver specialhantering vid avfallssortering. Kontakta din kommun för information om mottagningsställen." : "Kontakta din lokala återvinningscentral för korrekt hantering."}`,
    repairabilityDetails: `Reparerbarhet bedömd till ${data.repairabilityScore}/5. ${data.repairabilityScore >= 4 ? "Produkten är designad för enkel reparation med tillgängliga reservdelar." : data.repairabilityScore >= 3 ? "Produkten kan repareras med viss teknisk kunskap." : "Produkten har begränsade reparationsmöjligheter. Överväg att förbättra designen för ökad reparerbarhet."}`,
  };
}
