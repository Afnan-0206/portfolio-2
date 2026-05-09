"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Eye, X } from "lucide-react";
import { useEffect, useState } from "react";

interface CertificateItem {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  thumbnail: string;
  fullImage: string;
  certificate: string;
  certificateIssuer: string;
  certificateDate: string;
}

interface CertificatePreviewModalProps {
  open: boolean;
  item: CertificateItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CertificatePreviewModal({ open, item, onClose, onNext, onPrev }: CertificatePreviewModalProps) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!open) {
      setZoomed(false);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, onNext, onPrev]);

  if (!item) return null;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/90 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="relative mx-4 w-full max-w-6xl rounded-[2.5rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.75)] backdrop-blur-3xl"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
          >
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-[1.5rem] bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 opacity-80" />
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="lg:flex-1 lg:min-w-[320px]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Certificate preview</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{item.certificate}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {item.certificateIssuer} • Issued {item.certificateDate}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-slate-200 transition hover:border-cyan-400/50 hover:text-white"
                    aria-label="Close certificate preview"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setZoomed((state) => !state)}
                    className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-400/40 hover:bg-slate-900"
                  >
                    <Eye className="h-4 w-4 text-cyan-300" />
                    {zoomed ? "Zoom Out" : "Zoom In"}
                  </button>
                  <a
                    href={item.fullImage}
                    download
                    className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                  <a
                    href={item.fullImage}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:border-violet-400/40 hover:bg-slate-900"
                  >
                    View Credential
                  </a>
                </div>
              </div>

              <div className="relative lg:flex-1">
                <motion.div
                  className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-[0_35px_90px_-35px_rgba(0,0,0,0.9)]"
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.img
                    src={item.fullImage}
                    alt={item.certificate}
                    className="aspect-[4/3] w-full object-contain bg-slate-950"
                    initial={{ scale: 1 }}
                    animate={{ scale: zoomed ? 1.12 : 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ cursor: zoomed ? "zoom-out" : "zoom-in" }}
                    onClick={() => setZoomed((state) => !state)}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/80" />
                </motion.div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-400">Swipe down or press ESC to close</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onPrev}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-cyan-400/40 hover:bg-slate-900"
                      aria-label="Previous certificate"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-cyan-400/40 hover:bg-slate-900"
                      aria-label="Next certificate"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
