import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digitala Produktpass | Skapa EU-kompatibla produktpass",
  description:
    "Skapa digitala produktpass för EU-compliance på minuter. Gratis verktyg för svenska tillverkare. Följ EU:s nya krav på produkttransparens.",
  keywords: [
    "digital product passport",
    "digitalt produktpass",
    "EU compliance",
    "hållbarhet",
    "tillverkning",
    "Sverige",
    "Småland",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className={inter.className}>
        <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-white"
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
                <span className="text-lg font-bold text-gray-900">
                  Digitala Produktpass
                </span>
              </a>
              <div className="hidden sm:flex items-center gap-6">
                <a
                  href="/#om"
                  className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Om verktyget
                </a>
                <a
                  href="/#eu-krav"
                  className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                >
                  EU-krav
                </a>
                <a href="/quiz" className="btn-primary text-sm py-2 px-4">
                  Skapa produktpass
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <footer className="border-t border-gray-100 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary-600 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-white"
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
                <span className="text-sm font-semibold text-gray-900">
                  Digitala Produktpass
                </span>
              </div>
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Digitala Produktpass. Gratis
                verktyg for svenska tillverkare.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
