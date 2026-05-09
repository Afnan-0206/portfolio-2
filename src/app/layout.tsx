import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afnan B R | AI Engineer & Full-Stack Developer",
  description: "Portfolio of Afnan B R - AI Engineer specializing in multi-agent systems, Vertex AI, LangGraph, and full-stack development. CSE student at NxtWave NIAT.",
  keywords: ["AI", "Machine Learning", "LLM", "Vertex AI", "Full-Stack Developer", "Cloud Engineer", "React", "Node.js"],
  openGraph: {
    title: "Afnan B R | AI Engineer & Full-Stack Developer",
    description: "AI-powered solutions, multi-agent systems, and full-stack applications",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark antialiased">
        {children}
      </body>
    </html>
  );
}
