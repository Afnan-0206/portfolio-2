"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CertificatePreviewModal from "./CertificatePreviewModal";

const workshops = [
  {
    title: "Murf.AI Hackathon",
    subtitle: "Hands-on app building competition",
    description: "Built an AI-first experience featuring rapid prototyping and collaborative automation workflows.",
    accent: "from-cyan-400 to-blue-500",
    thumbnail: "/certificates/certificate-1.jpg",
    fullImage: "/certificates/certificate-1.jpg",
    certificate: "Murf.AI Hackathon Certificate",
    certificateIssuer: "Murf.AI x NxtWave",
    certificateDate: "26 Mar 2026",
  },
  {
    title: "Google Flows",
    subtitle: "Creative AI workshop",
    description: "Explored generative AI workflows and practical application design with S-VYASA and NIAT.",
    accent: "from-violet-500 to-fuchsia-500",
    thumbnail: "/certificates/certificate-2.jpg",
    fullImage: "/certificates/certificate-2.jpg",
    certificate: "Google Flows Workshop Certificate",
    certificateIssuer: "S-VYASA & NxtWave",
    certificateDate: "06 Mar 2026",
  },
  {
    title: "Base44 Workshop",
    subtitle: "Hands-on app-building course",
    description: "Designed polished UI components, interaction patterns, and performance-first delivery techniques.",
    accent: "from-emerald-400 to-teal-500",
    thumbnail: "/certificates/certificate-3.jpg",
    fullImage: "/certificates/certificate-3.jpg",
    certificate: "Base44 Workshop Certificate",
    certificateIssuer: "Base44 x NxtWave",
    certificateDate: "18 Nov 2025",
  },
  {
    title: "Autonomous Vehicle Workshop",
    subtitle: "AI systems for autonomous control",
    description: "Participated in robotics-led sessions hosted by the VP of Robotics, focused on autonomy and systems design.",
    accent: "from-pink-500 to-orange-400",
    thumbnail: "/certificates/certificate-4.jpg",
    fullImage: "/certificates/certificate-4.jpg",
    certificate: "Autonomous Vehicle Participation Certificate",
    certificateIssuer: "NxtWave Robotics",
    certificateDate: "15 Nov 2025",
  },
];

export default function WorkshopsCarousel() {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const openPreview = (index: number) => {
    setPreviewIndex(index);
  };

  const closePreview = () => {
    setPreviewIndex(null);
  };

  const showNext = () => {
    if (previewIndex === null) return;
    setPreviewIndex((previewIndex + 1) % workshops.length);
  };

  const showPrev = () => {
    if (previewIndex === null) return;
    setPreviewIndex((previewIndex + workshops.length - 1) % workshops.length);
  };

  const selectedItem = previewIndex !== null ? workshops[previewIndex] : null;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80 mb-4">Featured learning</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
            Workshops & Hackathons
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Premium experiences from live workshops, hackathons, and hands-on AI labs — designed for modern product builders.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/30 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.65)] backdrop-blur-3xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-slate-950 to-slate-950/0" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-slate-950 to-slate-950/0" />

          <div className="group relative">
            <div className="marquee relative flex items-stretch gap-6 px-6 py-8 sm:px-8" role="list">
              {[...workshops, ...workshops].map((workshop, index) => {
                const workshopIndex = index % workshops.length;
                return (
                  <motion.button
                    key={`${workshop.title}-${index}`}
                    type="button"
                    onClick={() => openPreview(workshopIndex)}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="group flex-shrink-0 min-w-[260px] sm:min-w-[300px] lg:min-w-[320px] h-[440px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 shadow-[0_22px_90px_-30px_rgba(0,0,0,0.5)] transition duration-300 ease-out hover:border-cyan-400/50 hover:shadow-[0_32px_140px_-40px_rgba(34,211,238,0.28)] focus:outline-none"
                  >

                  <div className="relative h-52 overflow-hidden rounded-[1.75rem] bg-slate-900 transition duration-700 ease-out group-hover:-translate-y-1">
                    <img
                      src={workshop.thumbnail}
                      alt={`${workshop.title} thumbnail`}
                      className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className={`absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t ${workshop.accent} opacity-50`} />
                    <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-slate-950/0 to-slate-950/90" />
                  </div>

                  <div className="flex h-[calc(100%-13rem)] flex-col justify-between p-5">
                    <div>
                      <span className="inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
                        {workshop.subtitle}
                      </span>
                      <h3 className="mt-4 text-xl font-semibold text-white tracking-tight">
                        {workshop.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {workshop.description}
                      </p>

                      <div className="mt-4 rounded-3xl border border-white/10 bg-slate-900/70 p-4 text-xs text-slate-300 shadow-inner">
                        <p className="font-semibold text-white">{workshop.certificate}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-slate-400">
                          {workshop.certificateIssuer}
                        </p>
                        <p className="mt-2 text-[11px] text-slate-500">Issued {workshop.certificateDate}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.6)]" />
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                          Verified experience
                        </p>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200 backdrop-blur-sm">
                        Tap to contact
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
            </div>
          </div>
        </div>
      </div>

      <CertificatePreviewModal
        open={previewIndex !== null}
        item={selectedItem}
        onClose={closePreview}
        onNext={showNext}
        onPrev={showPrev}
      />

      <style>{`
        .marquee {
          animation: marquee 28s linear infinite;
          will-change: transform;
        }

        .group:hover .marquee {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .marquee {
            animation-duration: 34s;
          }
        }
      `}</style>
    </section>
  );
}
