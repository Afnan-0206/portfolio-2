"use client";

import { useEffect, useState } from "react";
import Projects from "@/components/Projects";
import WorkshopsCarousel from "@/components/WorkshopsCarousel";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isContactOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isContactOpen]);

  const openContactModal = (source?: string) => {
    setModalTitle(source ?? null);
    setIsContactOpen(true);
  };

  const closeContactModal = () => {
    setIsContactOpen(false);
    setModalTitle(null);
  };

  return (
    <main className="relative overflow-x-hidden bg-[#030712] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[url('/hero-background.jpg')] bg-cover bg-center brightness-110 contrast-110 saturate-110" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-slate-950/95" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-cyan-200 shadow-[0_0_30px_rgba(56,189,248,0.12)]">
              My portfolio
            </span>
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Afnan B R — Building premium AI products and modern web experiences.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
                Experienced full-stack and AI engineer creating polished applications, intelligent systems, and startup-quality products for fast-moving teams.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => openContactModal("Portfolio inquiry")}
                className="group inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:border-cyan-400/40 hover:bg-white/15 hover:shadow-[0_30px_90px_-40px_rgba(56,189,248,0.7)]"
              >
                <span className="mr-3">Get In Touch</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-200 transition duration-300 group-hover:bg-cyan-400/20">
                  →
                </span>
              </button>
              <a
                href="#workshops"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/80 px-7 py-4 text-sm text-slate-100 transition duration-300 hover:border-white/20 hover:bg-slate-900/95"
              >
                Explore Certificates
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Email", value: "brafnan26@gmail.com" },
                { label: "Professional", value: "Btech CSE(AI/ML) student at NIAT" },
                { label: "Location", value: "Bengaluru, India" },
                { label: "Response time", value: "Within 24 hours" },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-[0_20px_80px_-50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-sm font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_-70px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-cyan-400/10 bg-slate-950/85 p-6 shadow-[0_20px_60px_-35px_rgba(56,189,248,0.3)]">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Connect instantly</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Ready to collaborate?</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Share your project idea, timeline, or team goals — I’ll respond quickly with a polished plan.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Primary email</p>
                  <p className="mt-2 text-sm font-semibold text-white">brafnan26@gmail.com</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Preferred work</p>
                  <p className="mt-2 text-sm font-semibold text-white">AI product design, full-stack apps, cloud systems</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Availability</p>
                  <p className="mt-2 text-sm font-semibold text-white">Open for new remote and hybrid projects</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
        <Projects />
      </section>

      <section id="workshops" className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
        <WorkshopsCarousel />
      </section>

      <footer className="relative z-10 border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-slate-400">
          <p className="mb-3">B.Tech CSE at NxtWave NIAT. Building AI-powered systems and modern web applications.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <a href="mailto:brafnan26@gmail.com" className="hover:text-white transition">brafnan26@gmail.com</a>
            <span className="hidden sm:inline-block">•</span>
            <a href="https://github.com/Afnan-0206" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a>
            <span className="hidden sm:inline-block">•</span>
            <a href="https://www.linkedin.com/in/afnan-391912363" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
          </div>
          <p className="mt-6 text-slate-500">Built with Next.js, Framer Motion & Tailwind CSS. © 2026 Afnan B R. All rights reserved.</p>
        </div>
      </footer>

      <ContactModal open={isContactOpen} onClose={closeContactModal} workshopTitle={modalTitle} />
    </main>
  );
}
