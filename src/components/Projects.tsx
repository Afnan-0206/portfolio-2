"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  repoUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AutoFix AI Incidents",
    description:
      "Autonomous DevOps agent using Manager–Researcher–Analyst architecture to automate incident detection, analysis, and remediation with Vertex AI and LangGraph.",
    tags: ["Vertex AI", "LangGraph", "Multi-Agent", "DevOps", "Python"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    repoUrl: "https://github.com/Afnan-0206/autofix-ai-incidents",
  },
  {
    id: 2,
    title: "F1 Race Predictor",
    description:
      "Predicts Formula 1 race positions with advanced data preprocessing and machine learning using historical datasets from 1950–2022.",
    tags: ["Machine Learning", "Pandas", "NumPy", "Python", "Data Science"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    repoUrl: "https://github.com/Afnan-0206/f1-race-prediction",
  },
  {
    id: 3,
    title: "Cloud Incident OpenEnv",
    description:
      "AI-powered incident management environment that combines cloud monitoring, reasoning workflows, and autonomous response across distributed infrastructure.",
    tags: ["Google Cloud", "Vertex AI", "Multi-Agent", "Reasoning", "Python"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    repoUrl: "https://github.com/Afnan-0206/cloud-incident-openenv",
  },
  {
    id: 4,
    title: "FormGenius",
    description:
      "Dynamic form-building platform with real-time validation and analytics, built using React.js, Node.js, and Firebase for a polished user experience.",
    tags: ["React.js", "Node.js", "Firebase", "Tailwind CSS", "Full-Stack"],
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    repoUrl: "https://github.com/Afnan-0206/formgenius",
  },
];

interface CardProps {
  project: Project;
  index: number;
}

interface ProjectsProps {}

function ProjectCard({ project, index }: CardProps) {
  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />
      <div
        className="pointer-events-none absolute -right-10 top-8 h-48 w-48 rounded-full blur-3xl opacity-30 transition-all duration-500 group-hover:opacity-70"
        style={{ background: project.gradient }}
      />
      <div className="pointer-events-none absolute -left-12 bottom-8 h-40 w-40 rounded-full blur-3xl opacity-20 transition-all duration-500 group-hover:opacity-50"
        style={{ background: project.gradient }}
      />

      <div className="relative z-10 flex min-h-[26rem] flex-col justify-between gap-8 p-6 sm:p-8">
        <div className="space-y-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="grid h-14 w-14 place-items-center rounded-3xl border border-white/10 bg-white/5 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-[0_15px_40px_-25px_rgba(56,189,248,0.8)]"
                style={{ background: project.gradient }}
              >
                {initials}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Project</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {project.title}
                </h3>
              </div>
            </div>
            <span className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200/90">
              Source
            </span>
          </div>

          <p className="text-sm leading-7 text-slate-300 sm:text-base">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-200/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <motion.a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          className="inline-flex w-full items-center justify-between gap-3 rounded-[1.75rem] border border-cyan-400/10 bg-slate-900/85 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_80px_-40px_rgba(56,189,248,0.3)] transition duration-300 hover:border-cyan-300/40 hover:bg-slate-900/95"
        >
          <span className="inline-flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-cyan-300"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.336-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.685-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.698 1.028 1.592 1.028 2.685 0 3.85-2.339 4.695-4.566 4.943.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
            </svg>
            <span>GitHub Source Code</span>
          </span>
          <motion.span className="flex items-center text-cyan-200 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </div>
    </motion.article>
  );
}

export default function Projects({}: ProjectsProps) {
  return (
    <section className="relative z-20 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.45em] text-cyan-300/80">
            Featured Work
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Premium projects built for AI, cloud, and product-scale execution.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            These project highlights combine polished frontend interfaces, cloud automation, and intelligent workflows for startup-ready applications.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
