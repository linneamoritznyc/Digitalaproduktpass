import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-100/30 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary-100/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-200 mb-8">
            EU-krav 2026&ndash;2027 &middot; Var redo i tid
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 text-balance">
            Skapa digitala produktpass
            <br />
            <span className="text-primary-600">
              for EU-compliance pa minuter
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-600 max-w-2xl mx-auto text-balance">
            Folj EU:s nya krav pa produkttransparens. Svara pa 10 fragor om din
            produkt och fa ett komplett digitalt produktpass med QR-kod och
            PDF-export.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/quiz" className="btn-primary text-lg px-8 py-4">
              Borja skapa produktpass &rarr;
            </Link>
            <a href="#om" className="btn-secondary text-lg px-8 py-4">
              Las mer
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Gratis verktyg for svenska tillverkare
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="om" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Varfor Digitala Produktpass?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              EU krav att alla produkter ska ha digitala pass med information om
              material, hallbarhet och cirkularietet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-hover text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                EU-Compliant
              </h3>
              <p className="text-sm text-gray-600">
                Mot EU:s Digital Product Passport-krav som trader i kraft
                2026-2027. Automatisk compliance-kontroll.
              </p>
            </div>

            <div className="card-hover text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-secondary-100 flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-secondary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Snabbt &amp; Enkelt
              </h3>
              <p className="text-sm text-gray-600">
                Quiz-baserat verktyg. Svara pa 10 fragor, fa komplett
                produktpass pa minuter.
              </p>
            </div>

            <div className="card-hover text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-accent-100 flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-accent-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hallbarhetsanalys
              </h3>
              <p className="text-sm text-gray-600">
                AI-driven analys av din produkts miljopaverkan och
                forbattringsmojligheter.
              </p>
            </div>

            <div className="card-hover text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delbart &amp; Skannerbart
              </h3>
              <p className="text-sm text-gray-600">
                QR-koder for enkel delning. PDF-export for dokumentation och
                tryck.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Sa har fungerar det
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-primary-600 flex items-center justify-center mb-4 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Svara pa fragor
              </h3>
              <p className="text-gray-600">
                Besvara 10 enkla fragor om din produkt - material, tillverkning,
                hallbarhet och mer.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-primary-600 flex items-center justify-center mb-4 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI genererar pass
              </h3>
              <p className="text-gray-600">
                Var AI analyserar dina svar och genererar ett komplett digitalt
                produktpass med hallbarhetsbedomning.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-primary-600 flex items-center justify-center mb-4 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Exportera &amp; dela
              </h3>
              <p className="text-gray-600">
                Ladda ner som PDF, fa en QR-kod, och dela ditt produktpass med
                kunder och partners.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/quiz" className="btn-primary text-lg px-8 py-4">
              Borja nu &mdash; det ar gratis &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* EU Requirements Section */}
      <section id="eu-krav" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700 ring-1 ring-inset ring-accent-200 mb-4">
                EU-forordning 2024/1781
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                EU:s krav pa Digitala Produktpass
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fran 2026-2027 maste alla produkter som saljs inom EU ha ett
                digitalt produktpass. Kravet ar en del av EU:s Ecodesign for
                Sustainable Products Regulation (ESPR).
              </p>
              <ul className="space-y-4">
                {[
                  "Material och ursprung - Full transparens om vad produkten innehaller",
                  "Hallbarhet och miljopaverkan - Dokumenterad miljoanalys",
                  "Reparerbarhet - Information om reparationsmojligheter",
                  "Cirkular ekonomi - Atervinnings- och ateranvandningsinstruktioner",
                  "Leverantorskedja - Transparens genom hela vardekedjan",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-primary-500 flex-shrink-0 mt-0.5"
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
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Tidslinje
              </h3>
              <div className="space-y-6">
                {[
                  {
                    year: "2024",
                    title: "ESPR antagen",
                    desc: "EU:s Ecodesign for Sustainable Products Regulation antogs",
                  },
                  {
                    year: "2026",
                    title: "Forsta produktkategorier",
                    desc: "Batterier, textilier och elektronik omfattas forst",
                  },
                  {
                    year: "2027",
                    title: "Utvidgat krav",
                    desc: "Fler produktkategorier inkluderas successivt",
                  },
                  {
                    year: "2030",
                    title: "Full tacking",
                    desc: "Alla relevanta produktkategorier ska ha DPP",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-16 rounded-lg bg-primary-600 flex items-center justify-center text-sm font-bold text-white">
                        {item.year}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Redo att skapa ditt forsta produktpass?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Det tar bara nagra minuter. Svara pa fragor om din produkt och fa
            ett komplett digitalt produktpass med AI-driven analys.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-700 shadow-sm transition-all hover:bg-primary-50"
          >
            Skapa produktpass gratis &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
