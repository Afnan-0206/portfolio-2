"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  // Calculate opacity for each section
  const section1Opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const section1Y = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  const section2Opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [0, 1, 0]);
  const section2X = useTransform(scrollYProgress, [0.2, 0.4], [-200, 0]);

  const section3Opacity = useTransform(scrollYProgress, [0.5, 0.7, 0.8], [0, 1, 0]);
  const section3X = useTransform(scrollYProgress, [0.5, 0.7], [200, 0]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{ height: "500vh" }}
    >
      {/* Section 1: Hero */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none"
        style={{
          opacity: section1Opacity,
          y: section1Y,
        }}
      >
        <div className="text-center px-4">
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Afnan B R
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI Engineer & Full-Stack Developer
          </motion.p>
        </div>
      </motion.div>

      {/* Section 2: Left aligned */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen flex items-center pointer-events-none"
        style={{
          opacity: section2Opacity,
          y: scrollYProgress,
        }}
      >
        <motion.div
          className="px-8 md:px-16 max-w-lg"
          style={{ x: section2X }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI-powered</span> solutions
          </h2>
          <p className="text-gray-400 text-lg">
            Multi-agent systems, machine learning, and full-stack development at scale.
          </p>
        </motion.div>
      </motion.div>

      {/* Section 3: Right aligned */}
      <motion.div
        className="fixed top-0 right-0 w-full h-screen flex items-center justify-end pointer-events-none"
        style={{
          opacity: section3Opacity,
          y: scrollYProgress,
        }}
      >
        <motion.div
          className="px-8 md:px-16 max-w-lg text-right"
          style={{ x: section3X }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">LLMs</span> & Cloud Engineering
          </h2>
          <p className="text-gray-400 text-lg">
            Specialized in Vertex AI, LangGraph, and enterprise-grade cloud infrastructure.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
