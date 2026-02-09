"use client";

import { useState } from "react";
import Link from "next/link";

interface ToggleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function ToggleSection({
  title,
  children,
  defaultOpen = false,
}: ToggleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-5 pt-0 bg-white border-t border-gray-100">
          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OmProduktpassPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-primary-50/30 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link
            href="/"
            className="hover:text-primary-600 transition-colors"
          >
            Hem
          </Link>
          <span>/</span>
          <span className="text-gray-900">Om digitala produktpass</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-200 mb-4">
            Kunskapsbank
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Om digitala produktpass
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            En sammanfattning av EU:s krav p&aring; digitala produktpass, vad de
            inneb&auml;r f&ouml;r svenska f&ouml;retag och hur du kan f&ouml;rbereda
            dig.
          </p>
        </div>

        {/* Article Sections */}
        <div className="space-y-4">
          <ToggleSection title="Vad &auml;r digitala produktpass?" defaultOpen>
            <p className="mb-4">
              Digitala produktpass (DPP) &auml;r ett centralt verktyg i EU:s gr&ouml;na
              omst&auml;llning och utg&ouml;r en grundl&auml;ggande del av den cirkul&auml;ra
              ekonomin. Ett digitalt produktpass &auml;r en elektronisk registrering av
              information om en produkts materialsammans&auml;ttning, ursprung,
              milj&ouml;p&aring;verkan, reparerbarhet och &aring;tervinningsbarhet. Syftet
              &auml;r att &ouml;ka transparensen genom hela v&auml;rdekedjan &ndash; fr&aring;n
              r&aring;varuutvinning till produktens slutliga hantering.
            </p>
            <p>
              EU-kommissionen introducerade konceptet genom f&ouml;rordningen om
              ekodesign f&ouml;r h&aring;llbara produkter (Ecodesign for Sustainable
              Products Regulation, ESPR) som antogs den 13 juni 2024.
              F&ouml;rordningen kr&auml;ver att produkter som saluf&ouml;rs inom EU ska f&ouml;rses
              med digitala produktpass, med start fr&aring;n 2027 beroende p&aring;
              produktkategori (Europaparlamentet och Europeiska unionens r&aring;d,
              2024).
            </p>
          </ToggleSection>

          <ToggleSection title="Regelverk och tidslinje">
            <h4 className="font-semibold text-gray-900 mb-3">
              EU-f&ouml;rordningar
            </h4>
            <p className="mb-4">
              Digitala produktpass regleras fr&auml;mst genom tv&aring;
              EU-f&ouml;rordningar:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-3">
              <li>
                <strong>Ekodesignf&ouml;rordningen (ESPR):</strong> Ers&auml;tter det
                tidigare ekodesigndirektivet och utvidgar kraven till att
                omfatta n&auml;stan alla fysiska produkter p&aring; EU-marknaden.
                F&ouml;rordningen fastst&auml;ller minimikrav f&ouml;r produkters
                milj&ouml;prestanda och kr&auml;ver digitala produktpass f&ouml;r
                sp&aring;rbarhet (Europaparlamentet och Europeiska unionens r&aring;d,
                2024).
              </li>
              <li>
                <strong>Batterif&ouml;rordningen (EU 2023/1542):</strong> Den f&ouml;rsta
                produktkategorin som omfattas av krav p&aring; digitala produktpass.
                Fr&aring;n februari 2027 m&aring;ste alla batterier &ouml;ver 2 kWh som s&auml;ljs
                inom EU ha digitala produktpass med information om batteriets
                sammans&auml;ttning, &aring;tervinningsbarhet och koldioxidavtryck
                (Europeiska kommissionen, 2023).
              </li>
            </ul>

            <h4 className="font-semibold text-gray-900 mb-3">
              Tidsplan f&ouml;r implementering
            </h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-900">
                      &Aring;r
                    </th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-900">
                      Produktkategori
                    </th>
                    <th className="text-left py-3 font-semibold text-gray-900">
                      Krav
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 pr-4 font-medium">2027</td>
                    <td className="py-3 pr-4">Batterier</td>
                    <td className="py-3">
                      Obligatoriska DPP f&ouml;r industribatterier och
                      elfordonsbatterier
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">2027</td>
                    <td className="py-3 pr-4">Textilier</td>
                    <td className="py-3">
                      DPP-krav f&ouml;r textilprodukter (delegerad akt under
                      beredning)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">2028&ndash;2029</td>
                    <td className="py-3 pr-4">Elektronik</td>
                    <td className="py-3">
                      DPP f&ouml;r smartphones, surfplattor och b&auml;rbara datorer
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">2029&ndash;2030</td>
                    <td className="py-3 pr-4">Bygg &amp; konstruktion</td>
                    <td className="py-3">
                      DPP f&ouml;r byggmaterial och konstruktionsprodukter
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500">
              K&auml;lla: Europeiska kommissionen (2024). <em>Digital Product
              Passport implementation roadmap.</em>
            </p>
          </ToggleSection>

          <ToggleSection title="Betydelse f&ouml;r svenska f&ouml;retag">
            <h4 className="font-semibold text-gray-900 mb-3">
              Ekonomisk p&aring;verkan
            </h4>
            <p className="mb-4">
              Inf&ouml;randet av digitala produktpass inneb&auml;r b&aring;de utmaningar och
              m&ouml;jligheter f&ouml;r svenska f&ouml;retag. Implementeringskostnaden f&ouml;r
              sm&aring; och medelstora f&ouml;retag bed&ouml;ms variera beroende p&aring; bransch
              och nuvarande dokumentationsniv&aring;. Dessa kostnader omfattar:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-1">
              <li>Kartl&auml;ggning av leverant&ouml;rskedjan</li>
              <li>Datainsamling och verifiering</li>
              <li>IT-system f&ouml;r datahantering</li>
              <li>Utbildning av personal</li>
            </ul>
            <p className="mb-4">
              Samtidigt &ouml;ppnar digitala produktpass nya aff&auml;rsm&ouml;jligheter.
              F&ouml;retag som ligger i framkant kan differentiera sig genom
              transparens och h&aring;llbarhet, vilket &ouml;kar attraktionskraften hos
              milj&ouml;medvetna konsumenter och f&ouml;retagskunder.
            </p>

            <h4 className="font-semibold text-gray-900 mb-3">
              Regionala perspektiv
            </h4>
            <p>
              F&ouml;r sm&aring;l&auml;ndska tillverkningsf&ouml;retag, som ofta verkar inom
              m&ouml;bel-, textil- och maskinindustrin, inneb&auml;r DPP-kraven
              s&auml;rskilda utmaningar kopplade till komplexa leverant&ouml;rskedjor.
              Sm&aring; tillverkare med begr&auml;nsade administrativa resurser riskerar att
              hamna p&aring; efterk&auml;lken om de inte f&aring;r tillg&aring;ng till digitala
              verktyg som f&ouml;renklar processen. Handelskamrarna i J&ouml;nk&ouml;ping,
              V&auml;xj&ouml; och Kalmar har inlett samarbeten f&ouml;r att st&ouml;dja regionala
              f&ouml;retag i implementeringen genom r&aring;dgivning och seminarier.
            </p>
          </ToggleSection>

          <ToggleSection title="Teknisk implementering">
            <h4 className="font-semibold text-gray-900 mb-3">
              Dataformat och standarder
            </h4>
            <p className="mb-4">
              EU arbetar f&ouml;r att harmonisera dataformat f&ouml;r digitala produktpass
              genom europeiska standardiseringsorganisationer (CEN och CENELEC).
              Viktigaste standarderna inkluderar:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-1">
              <li>
                <strong>ISO 59000-serien:</strong> Standarder f&ouml;r cirkul&auml;r
                ekonomi, inklusive ISO 59004:2024 f&ouml;r terminologi och
                v&auml;gledning, samt ISO 59020:2024 f&ouml;r m&auml;tning av cirkul&auml;r
                prestanda
              </li>
              <li>
                <strong>GS1 Digital Link:</strong> QR-kodsstandard f&ouml;r
                produktidentifiering och sp&aring;rbarhet
              </li>
              <li>
                <strong>JSON-LD:</strong> Strukturerat dataformat f&ouml;r
                maskinl&auml;sbarhet
              </li>
            </ul>
            <p className="mb-4">
              Produktpasset ska vara tillg&auml;ngligt via en QR-kod eller liknande
              digital identifierare och inneh&aring;lla b&aring;de maskinl&auml;sbar data
              (f&ouml;r automatiserad bearbetning) och l&auml;sbar information f&ouml;r
              konsumenter.
            </p>

            <h4 className="font-semibold text-gray-900 mb-3">
              Dataskydd och integritet
            </h4>
            <p>
              F&ouml;retag m&aring;ste s&auml;kerst&auml;lla att produktpassdata hanteras i
              enlighet med EU:s dataskyddsf&ouml;rordning (GDPR). K&auml;nslig
              aff&auml;rsinformation kan skyddas genom olika &aring;tkomstniv&aring;er &ndash;
              konsumenter f&aring;r tillg&aring;ng till grundl&auml;ggande milj&ouml;information
              medan myndigheter och certifieringsorgan kan f&aring; mer detaljerade
              uppgifter om leverant&ouml;rskedjan.
            </p>
          </ToggleSection>

          <ToggleSection title="Finansiering och st&ouml;d">
            <h4 className="font-semibold text-gray-900 mb-3">
              Offentliga st&ouml;dprogram
            </h4>
            <p className="mb-4">
              Svenska myndigheter erbjuder flera st&ouml;dformer f&ouml;r f&ouml;retag som
              genomf&ouml;r digitaliserings- och h&aring;llbarhetsprojekt, vilka kan
              anv&auml;ndas f&ouml;r att f&ouml;rbereda implementering av digitala produktpass:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-3">
              <li>
                <strong>Tillv&auml;xtverket:</strong> Erbjuder r&aring;dgivning och
                finansiering genom regionala tillv&auml;xtprogram. St&ouml;d kan ges f&ouml;r
                digitaliseringsprojekt inom ramen f&ouml;r h&aring;llbar
                f&ouml;retagsutveckling.
              </li>
              <li>
                <strong>Energimyndigheten:</strong> Ger st&ouml;d f&ouml;r
                klimat&aring;tg&auml;rder i produktionen, vilket kan inkludera
                kartl&auml;ggning av koldioxidavtryck som underlag f&ouml;r produktpass.
              </li>
              <li>
                <strong>Vinnova:</strong> Finansierar innovationsprojekt som
                utvecklar nya l&ouml;sningar f&ouml;r cirkul&auml;r ekonomi och
                produktsp&aring;rbarhet.
              </li>
              <li>
                <strong>Almi F&ouml;retagspartner:</strong> Erbjuder r&aring;dgivning och
                l&aring;n f&ouml;r investeringar i digitalisering och
                h&aring;llbarhetsarbete.
              </li>
            </ul>

            <h4 className="font-semibold text-gray-900 mb-3">
              Europeiska program
            </h4>
            <p>
              EU:s Horisont Europa-program finansierar forsknings- och
              innovationsprojekt inom cirkul&auml;r ekonomi. Svenska f&ouml;retag kan
              ans&ouml;ka om medel f&ouml;r utveckling av l&ouml;sningar i samarbete med
              forskningsinstitutioner.
            </p>
          </ToggleSection>

          <ToggleSection title="Ekonomiska effekter av cirkul&auml;r ekonomi">
            <h4 className="font-semibold text-gray-900 mb-3">
              Makroekonomiskt perspektiv
            </h4>
            <p className="mb-4">
              &Ouml;verg&aring;ngen till cirkul&auml;r ekonomi, d&auml;r digitala produktpass
              spelar en central roll, f&ouml;rv&auml;ntas skapa betydande ekonomiska
              f&ouml;rdelar. Ellen MacArthur Foundation (2023) uppskattar att cirkul&auml;r
              ekonomi kan generera 1,8 biljoner euro i ekonomiska f&ouml;rdelar f&ouml;r
              Europa till 2030 genom:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-1">
              <li>Minskad r&aring;varuberoende</li>
              <li>
                Nya aff&auml;rsmodeller (uthyrning, &aring;tertillverkning,
                &aring;tervinning)
              </li>
              <li>&Ouml;kad resurss&auml;kerhet</li>
              <li>
                Nya arbetstillf&auml;llen inom reparations- och
                &aring;tervinningssektorn
              </li>
            </ul>
            <p>
              F&ouml;r Sverige, med en stark tillverkningsindustri och h&ouml;g
              exportandel, inneb&auml;r detta potential f&ouml;r global
              konkurrenskraft inom h&aring;llbara produkter.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-3">
              Incitament p&aring; f&ouml;retagsniv&aring;
            </h4>
            <p className="mb-2">
              P&aring; f&ouml;retagsniv&aring; kan digitala produktpass bidra till:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Kostnadsbesparingar:</strong> B&auml;ttre materialsp&aring;rning
                minskar svinn och underl&auml;ttar &aring;tervinning
              </li>
              <li>
                <strong>Varum&auml;rkesv&auml;rde:</strong> Transparens st&auml;rker
                f&ouml;rtroendet hos konsumenter
              </li>
              <li>
                <strong>Regelefterlevnad:</strong> F&ouml;renklar rapportering till
                myndigheter
              </li>
              <li>
                <strong>Produktutveckling:</strong> Data fr&aring;n produktpass kan
                v&auml;gleda ekodesignarbetet
              </li>
            </ul>
          </ToggleSection>

          <ToggleSection title="Framtidsutsikter">
            <p className="mb-4">
              Digitala produktpass &auml;r ett f&ouml;rsta steg i en bredare digital
              omvandling av produktinformation. Framtida utveckling omfattar:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                <strong>Blockkedjeintegration:</strong> S&auml;ker och transparent
                sp&aring;rning av produkter genom hela livscykeln
              </li>
              <li>
                <strong>AI-baserad analys:</strong> Automatiserad bed&ouml;mning av
                produkters milj&ouml;p&aring;verkan
              </li>
              <li>
                <strong>
                  Koppling till gr&auml;nsjusteringsmekanismen f&ouml;r koldioxid
                  (CBAM):
                </strong>{" "}
                Integration med EU:s koldioxidtullar vid import
              </li>
              <li>
                <strong>Utvidgat producentansvar:</strong> Tillverkare f&aring;r
                st&ouml;rre ansvar f&ouml;r produktens hela livscykel
              </li>
            </ul>
          </ToggleSection>

          <ToggleSection title="Anv&auml;ndbara resurser">
            <h4 className="font-semibold text-gray-900 mb-3">
              Myndigheter och organisationer
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <strong>Naturv&aring;rdsverket</strong> &ndash; V&auml;gledning om
                cirkul&auml;r ekonomi och produktpass
                <br />
                <span className="text-sm text-primary-600">
                  naturvardsverket.se
                </span>
              </li>
              <li>
                <strong>Tillv&auml;xtverket</strong> &ndash; St&ouml;d f&ouml;r f&ouml;retag i
                h&aring;llbarhetsarbete
                <br />
                <span className="text-sm text-primary-600">
                  tillvaxtverket.se
                </span>
              </li>
              <li>
                <strong>Kemikalieinspektionen</strong> &ndash; Information om
                kemikaliekrav i produkter
                <br />
                <span className="text-sm text-primary-600">kemi.se</span>
              </li>
              <li>
                <strong>Business Sweden</strong> &ndash; V&auml;gledning f&ouml;r export
                och internationell handel
                <br />
                <span className="text-sm text-primary-600">
                  business-sweden.se
                </span>
              </li>
            </ul>

            <h4 className="font-semibold text-gray-900 mb-3">EU-resurser</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <strong>Europeiska kommissionen</strong> &ndash; Ekodesign
                <br />
                <span className="text-sm text-primary-600">
                  commission.europa.eu/ecodesign
                </span>
              </li>
              <li>
                <strong>Europeiska kommissionen</strong> &ndash; Handlingsplan
                f&ouml;r cirkul&auml;r ekonomi
                <br />
                <span className="text-sm text-primary-600">
                  ec.europa.eu/circulareconomy
                </span>
              </li>
            </ul>

            <h4 className="font-semibold text-gray-900 mb-3">
              Branschorganisationer
            </h4>
            <ul className="space-y-3">
              <li>
                <strong>Svensk Handel</strong> &ndash; V&auml;gledning f&ouml;r handeln
                <br />
                <span className="text-sm text-primary-600">
                  svenskhandel.se
                </span>
              </li>
              <li>
                <strong>Svenskt N&auml;ringsliv</strong> &ndash;
                F&ouml;retagsperspektiv p&aring; h&aring;llbarhet
                <br />
                <span className="text-sm text-primary-600">
                  svensktnaringsliv.se
                </span>
              </li>
              <li>
                <strong>Teknikf&ouml;retagen</strong> &ndash; Branschspecifik
                v&auml;gledning f&ouml;r tillverkningsindustrin
                <br />
                <span className="text-sm text-primary-600">
                  teknikforetagen.se
                </span>
              </li>
            </ul>
          </ToggleSection>

          <ToggleSection title="Referenser">
            <p className="text-sm text-gray-700 leading-relaxed space-y-2">
              <span className="block mb-2">
                Ellen MacArthur Foundation. (2023).{" "}
                <em>The circular economy opportunity for Europe.</em>{" "}
                ellenmacarthurfoundation.org
              </span>
              <span className="block mb-2">
                Europeiska kommissionen. (2023). F&ouml;rordning (EU) 2023/1542 om
                batterier och f&ouml;rbrukade batterier. Bryssel: EU.
              </span>
              <span className="block mb-2">
                Europeiska kommissionen. (2024a).{" "}
                <em>
                  Ecodesign for Sustainable Products Regulation (ESPR).
                </em>{" "}
                Bryssel: EU.
              </span>
              <span className="block mb-2">
                Europeiska kommissionen. (2024b).{" "}
                <em>Digital Product Passport implementation roadmap.</em>{" "}
                Bryssel: EU.
              </span>
              <span className="block mb-2">
                Europeiska kommissionen. (2024c).{" "}
                <em>
                  Horizon Europe Work Programme 2024&ndash;2025: Climate, energy
                  and mobility.
                </em>{" "}
                Bryssel: EU.
              </span>
              <span className="block mb-2">
                Europaparlamentet och Europeiska unionens r&aring;d. (2024).
                F&ouml;rordning (EU) 2024/1781 om fastst&auml;llande av en ram f&ouml;r att
                utforma h&aring;llbara produkter.{" "}
                <em>Europeiska unionens officiella tidning,</em> L 2024/1781.
              </span>
              <span className="block mb-2">
                GS1. (2024).{" "}
                <em>
                  GS1 Digital Link: Provisional Standard for Digital Product
                  Passports.
                </em>{" "}
                gs1.org
              </span>
              <span className="block mb-2">
                ISO. (2024). ISO 59004:2024 &ndash;{" "}
                <em>
                  Circular economy &mdash; Vocabulary, principles and guidance
                  for implementation.
                </em>{" "}
                iso.org
              </span>
              <span className="block mb-2">
                ISO. (2024). ISO 59020:2024 &ndash;{" "}
                <em>
                  Circular economy &mdash; Measuring and assessing circularity
                  performance.
                </em>{" "}
                iso.org
              </span>
            </p>
          </ToggleSection>
        </div>

        {/* Footer note */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-500">
            Senast uppdaterad: Februari 2026 &middot; K&auml;lla:
            digitalaproduktpass.se
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link href="/quiz" className="btn-primary text-lg px-8 py-4">
            Skapa ditt produktpass nu &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
