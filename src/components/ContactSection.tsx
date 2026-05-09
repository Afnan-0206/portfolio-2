"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GithubIcon, Linkedin, Mail, Phone, MapPin, Clock3, FileText, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function FloatingField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  textarea?: boolean;
}) {
  return (
    <label className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 px-4 pt-6 pb-2 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.8)] transition hover:border-cyan-400/50">
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          rows={5}
          placeholder=" "
          className="peer h-36 w-full resize-none bg-transparent text-sm text-slate-100 outline-none transition duration-300 placeholder:text-transparent focus:ring-0"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          placeholder=" "
          className="peer h-14 w-full bg-transparent text-sm text-slate-100 outline-none transition duration-300 placeholder:text-transparent focus:ring-0"
        />
      )}
      <span className="pointer-events-none absolute left-4 top-5 origin-left -translate-y-1/2 text-sm text-slate-500 transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-slate-500 peer-focus:top-3 peer-focus:text-xs peer-focus:text-cyan-300">
        {label}
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 transition duration-300 group-focus-within:opacity-100" />
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-2 text-xs text-rose-300"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </label>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const errors = useMemo(() => {
    const fieldErrors: Record<string, string> = {};
    if (!form.name.trim()) fieldErrors.name = "Full name is required.";
    if (!form.email.trim()) fieldErrors.email = "Email address is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) fieldErrors.email = "Enter a valid email.";
    if (!form.subject.trim()) fieldErrors.subject = "Subject is required.";
    if (!form.message.trim()) fieldErrors.message = "Message is required.";
    return fieldErrors;
  }, [form]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setTouched({});
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(errors).length > 0) {
      setStatus({ type: "error", message: "Please complete all fields before sending." });
      return;
    }

    setLoading(true);
    setStatus(null);

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
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to submit message.");
      }

      setStatus({ type: "success", message: "Message sent — I’ll reply shortly." });
      resetForm();
    } catch (submissionError) {
      setStatus({
        type: "error",
        message:
          submissionError instanceof Error
            ? submissionError.message
            : "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#020617] px-4 py-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl mix-blend-screen" />
      <div className="pointer-events-none absolute right-0 top-16 h-[260px] w-[260px] rounded-full bg-violet-500/10 blur-3xl mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.08),_transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[length:64px_64px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 shadow-sm shadow-cyan-500/10">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Available for new projects & collaborations
            </span>
          </div>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Get in touch</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Let’s Build Something Amazing Together
            </h2>
            <p className="max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              I design and build premium web experiences for startups, AI-first products, and modern teams. Send a message and let’s turn your idea into a polished digital experience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Mail, label: "Email", value: "brafnan26@gmail.com" },
              { icon: Phone, label: "Phone", value: "+91 95134 45522" },
              { icon: MapPin, label: "Location", value: "Bengaluru, India" },
              { icon: Clock3, label: "Response Time", value: "Within 24 hours" },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-300 shadow-[0_16px_50px_-35px_rgba(34,211,238,0.8)]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-5 shadow-[0_40px_120px_-80px_rgba(15,23,42,0.9)] backdrop-blur-3xl"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Connect instantly</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="mailto:brafnan26@gmail.com"
                className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-400/40 hover:bg-slate-900"
              >
                <Mail className="h-4 w-4 text-cyan-300" />
                Email
              </a>
              <a
                href="https://github.com/Afnan-0206"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:border-violet-400/40 hover:bg-slate-900"
              >
                <Github className="h-4 w-4 text-slate-100" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/afnan-391912363"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:border-sky-400/40 hover:bg-slate-900"
              >
                <Linkedin className="h-4 w-4 text-slate-100" />
                LinkedIn
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:border-emerald-400/40 hover:bg-slate-900"
              >
                <FileText className="h-4 w-4 text-slate-100" />
                Resume
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_50px_140px_-55px_rgba(0,0,0,0.9)] backdrop-blur-3xl sm:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-400 to-slate-300 opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.1),_transparent_30%)]" />
          <div className="relative space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">Contact form</p>
              <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Send a message
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                Share a brief overview of your project and I’ll get back to you with next steps.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <FloatingField
                  id="contact-name"
                  label="Full Name"
                  value={form.name}
                  onChange={(value) => handleChange("name", value)}
                  onBlur={() => handleBlur("name")}
                  error={touched.name ? errors.name : undefined}
                />
                <FloatingField
                  id="contact-email"
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(value) => handleChange("email", value)}
                  onBlur={() => handleBlur("email")}
                  error={touched.email ? errors.email : undefined}
                />
              </div>
              <FloatingField
                id="contact-subject"
                label="Subject"
                value={form.subject}
                onChange={(value) => handleChange("subject", value)}
                onBlur={() => handleBlur("subject")}
                error={touched.subject ? errors.subject : undefined}
              />
              <FloatingField
                id="contact-message"
                label="Message"
                textarea
                value={form.message}
                onChange={(value) => handleChange("message", value)}
                onBlur={() => handleBlur("message")}
                error={touched.message ? errors.message : undefined}
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_80px_-40px_rgba(34,211,238,0.9)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_110px_-40px_rgba(56,189,248,0.75)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="mr-3 text-sm">Send Message</span>
                  <span className="inline-flex h-3 w-3 rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,0.45)]" />
                </button>
                <p className="text-xs text-slate-500">Typically replies within 24 hours.</p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {status ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 w-full max-w-sm rounded-3xl border px-5 py-4 shadow-2xl backdrop-blur-xl sm:right-8 ${
              status.type === "success"
                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                : "border-rose-400/20 bg-rose-400/10 text-rose-100"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{status.type === "success" ? "Message sent" : "Submission failed"}</p>
                <p className="mt-1 text-sm leading-6 text-current/80">{status.message}</p>
              </div>
              <button
                type="button"
                onClick={() => setStatus(null)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
