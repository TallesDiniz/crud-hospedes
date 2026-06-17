import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema de Reserva de Hotel",
  description: "CRUD de Hóspedes",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100 text-gray-800">
        <header className="bg-navy text-white px-6 py-4">
          <h1 className="text-xl font-semibold">Sistema de Reserva de Hotel</h1>
          <p className="text-xs opacity-70 mt-1">CRUD de Hóspedes</p>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-5">
          {children}
        </main>
      </body>
    </html>
  )
}