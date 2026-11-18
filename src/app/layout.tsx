import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseVitals - Performance & SEO Auditing",
  description: "Auditoria web de alta precisão para Performance e SEO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-[#05050A] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}