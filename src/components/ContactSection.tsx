"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Sparkles, GraduationCap } from "lucide-react";
import { useMemo, useState } from "react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

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
    <label className="group relative block overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] px-4 pt-6 pb-2 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]">
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
          className="peer h-12 w-full bg-transparent text-sm text-slate-100 outline-none transition duration-300 placeholder:text-transparent focus:ring-0"
        />
      )}
      <span className="pointer-events-none absolute left-4 top-5 origin-left -translate-y-1/2 text-sm text-slate-500 transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-slate-500 peer-focus:top-3 peer-focus:text-xs peer-focus:text-slate-300">
        {label}
      </span>
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="mt-2 text-xs text-rose-400"
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

  const contactLinks = [
    {
      name: "Email",
      value: "brafnan26@gmail.com",
      href: "mailto:brafnan26@gmail.com",
      icon: Mail,
      color: "group-hover:text-white",
      bgHover: "hover:bg-white/[0.04]",
      borderHover: "hover:border-white/10",
      glow: "hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]",
    },
    {
      name: "LinkedIn",
      value: "Afnan",
      href: "https://www.linkedin.com/in/afnan-391912363",
      icon: LinkedinIcon,
      color: "group-hover:text-white",
      bgHover: "hover:bg-white/[0.04]",
      borderHover: "hover:border-white/10",
      glow: "hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]",
    },
    {
      name: "GitHub",
      value: "@Afnan-0206",
      href: "https://github.com/Afnan-0206",
      icon: GithubIcon,
      color: "group-hover:text-white",
      bgHover: "hover:bg-white/[0.04]",
      borderHover: "hover:border-white/10",
      glow: "hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]",
    },
    {
      name: "Professional",
      value: "B.Tech CSE(AI/ML) at NIAT",
      href: "#",
      icon: GraduationCap,
      color: "group-hover:text-white",
      bgHover: "hover:bg-white/[0.04]",
      borderHover: "hover:border-white/10",
      glow: "hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]",
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0a0a] px-4 py-24 sm:px-6 lg:px-8">
      {/* Refined, subtle ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">
        
        {/* Left Side: Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-12"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-widest text-slate-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-slate-400" />
              Available for Work
            </div>

            <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-tight">
              Let's build <br className="hidden sm:block" />
              <span className="text-slate-400">something great.</span>
            </h2>

            <p className="max-w-md text-base leading-relaxed text-slate-400">
              I design and build premium web experiences for modern teams and startups. Send a message to turn your idea into reality.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactLinks.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                target={item.name !== "Email" && item.name !== "Location" ? "_blank" : undefined}
                rel={item.name !== "Email" && item.name !== "Location" ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative flex items-center gap-4 rounded-3xl border border-white/5 bg-white/[0.01] p-4 transition-all duration-300 ${item.bgHover} ${item.borderHover} ${item.glow} hover:-translate-y-0.5 overflow-hidden`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 transition-colors duration-300 group-hover:bg-white/[0.08]">
                  <item.icon className={`h-5 w-5 text-slate-400 transition-colors duration-300 ${item.color}`} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-300 group-hover:text-slate-400">{item.name}</p>
                  <p className="mt-0.5 truncate text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-white">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-xl sm:p-10"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
          
          <div className="relative space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                Send a message
              </h3>
              <p className="text-sm text-slate-400">
                Share a brief overview of your project and I’ll get back to you soon.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
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

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? "Sending..." : "Send Message"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {status ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 w-full max-w-sm rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-xl sm:right-8 ${
              status.type === "success"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                : "border-rose-500/20 bg-rose-500/10 text-rose-200"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">{status.type === "success" ? "Message sent" : "Submission failed"}</p>
                <p className="mt-1 text-sm text-current/80">{status.message}</p>
              </div>
              <button
                type="button"
                onClick={() => setStatus(null)}
                className="rounded-full bg-white/5 p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

