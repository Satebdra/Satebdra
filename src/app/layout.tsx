import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jewellery Management System",
  description: "Material tracking system for jewellery manufacturing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <h1 className="text-2xl font-bold">Jewellery Management System</h1>
                </div>
                <div className="hidden md:flex space-x-1">
                  <a href="/" className="nav-link hover:bg-blue-700">Dashboard</a>
                  <a href="/materials" className="nav-link hover:bg-blue-700">Materials</a>
                  <a href="/suppliers" className="nav-link hover:bg-blue-700">Suppliers</a>
                  <a href="/artisans" className="nav-link hover:bg-blue-700">Artisans</a>
                  <a href="/issues" className="nav-link hover:bg-blue-700">Issues</a>
                  <a href="/returns" className="nav-link hover:bg-blue-700">Returns</a>
                  <a href="/audit" className="nav-link hover:bg-blue-700">Audit Log</a>
                </div>
                <div className="md:hidden">
                  <button className="p-2 rounded-lg hover:bg-blue-700">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold">Jewellery Management System</h3>
                  <p className="text-gray-400">Efficient material tracking and management</p>
                </div>
                <div className="flex space-x-4">
                  <a href="/help" className="hover:text-blue-400">Help</a>
                  <a href="/contact" className="hover:text-blue-400">Contact</a>
                  <a href="/privacy" className="hover:text-blue-400">Privacy</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 