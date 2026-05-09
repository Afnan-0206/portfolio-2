"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

const TOTAL_FRAMES = 105;
const FRAME_PADDING = 3; // Pad with zeros (e.g., 000, 001)

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const images: HTMLImageElement[] = [];

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const paddedIndex = String(i).padStart(FRAME_PADDING, "0");
        const img = new Image();
        img.src = `/sequence/frame_${paddedIndex}_delay-0.067s.png`;

        await new Promise((resolve) => {
          img.onload = () => {
            images.push(img);
            resolve(null);
          };
          img.onerror = () => {
            console.warn(`Failed to load frame ${paddedIndex}`);
            resolve(null);
          };
        });
      }

      imagesRef.current = images;
      setIsLoaded(true);
    };

    preloadImages();
  }, []);

  // Draw current frame to canvas
  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const unsubscribe = frameIndex.on("change", (value: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const currentFrameIndex = Math.round(value);
      const img = imagesRef.current[currentFrameIndex];

      if (img) {
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image
        ctx.drawImage(img, 0, 0, img.width, img.height);
      }
    });

    return unsubscribe;
  }, [isLoaded, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-dark">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-dark">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Loading indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark">
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="w-12 h-12 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
              </div>
              <p className="text-gray-400 text-sm">Loading experience...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
