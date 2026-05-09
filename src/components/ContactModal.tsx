"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, type FormEvent } from "react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  workshopTitle?: string | null;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactModal({ open, onClose, workshopTitle }: ContactModalProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validation = useMemo(() => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) {
      errors.name = "Full name is required.";
    }
    if (!form.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!form.subject.trim()) {
      errors.subject = "Subject is required.";
    }
    if (!form.message.trim()) {
      errors.message = "Message is required.";
    }
    return errors;
  }, [form]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const resetForm = () => {
    setForm(initialState);
    setTouched({});
    setError(null);
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    onClose();
  };

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(validation).length > 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/xlgzwykp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          workshop: workshopTitle || "General inquiry",
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const errorMessage = body?.error || "Unable to send message right now.";
        throw new Error(errorMessage);
      }

      setSuccess(true);
      resetForm();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-[18px]"
            onClick={handleClose}
            aria-label="Close contact form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-3xl sm:p-10"
            initial={{ y: 24, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Contact form</p>
                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  Send a message
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Reach out with details and I’ll get back to you within one business day.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
              >
                Close
              </button>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-200">
                  <span className="font-medium">Full Name</span>
                  <input
                    value={form.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="Afnan B R"
                    className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                  />
                  {touched.name && validation.name ? (
                    <p className="text-xs text-rose-400">{validation.name}</p>
                  ) : null}
                </label>
                <label className="space-y-2 text-sm text-slate-200">
                  <span className="font-medium">Email Address</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="hello@example.com"
                    className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                  />
                  {touched.email && validation.email ? (
                    <p className="text-xs text-rose-400">{validation.email}</p>
                  ) : null}
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-200">
                <span className="font-medium">Subject</span>
                <input
                  value={form.subject}
                  onChange={(event) => handleChange("subject", event.target.value)}
                  onBlur={() => handleBlur("subject")}
                  placeholder={workshopTitle ? `Inquiry about ${workshopTitle}` : "Project, collaboration or question"}
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                />
                {touched.subject && validation.subject ? (
                  <p className="text-xs text-rose-400">{validation.subject}</p>
                ) : null}
              </label>

              <label className="space-y-2 text-sm text-slate-200">
                <span className="font-medium">Message</span>
                <textarea
                  value={form.message}
                  onChange={(event) => handleChange("message", event.target.value)}
                  onBlur={() => handleBlur("message")}
                  rows={5}
                  placeholder="Tell me about your idea, timeline, or available budget."
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                />
                {touched.message && validation.message ? (
                  <p className="text-xs text-rose-400">{validation.message}</p>
                ) : null}
              </label>

              {error ? (
                <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
                  {error}
                </div>
              ) : null}
              {success ? (
                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                  Message sent successfully. I’ll review it shortly.
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_60px_-30px_rgba(56,189,248,0.8)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
                >
                  Close Modal
                </button>
              </div>
            </form>
            <AnimatePresence>
              {(success || error) && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  className={`mt-5 rounded-3xl border px-4 py-3 text-sm ${
                    success
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                      : "border-rose-500/20 bg-rose-500/10 text-rose-100"
                  }`}
                >
                  {success ? "Message sent successfully. I’ll review it shortly." : error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
