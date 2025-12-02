"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized position (-0.5 to 0.5)
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform mouse values to opposite movement for parallax (Slower, smoother)
  const x1 = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const y1 = useTransform(mouseY, [-0.5, 0.5], [15, -15]);

  const x2 = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const y2 = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  // Grid parallax - moves opposite to mouse, faster/more dynamic
  const gridX = useTransform(mouseX, [-0.5, 0.5], [60, -60]);
  const gridY = useTransform(mouseY, [-0.5, 0.5], [60, -60]);

  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-black overflow-hidden">
      {/* Grid with slow pulse and movement */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          backgroundPosition: ["0px 0px", "24px 24px"],
        }}
        transition={{
          opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          backgroundPosition: {
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="absolute -inset-[100px] bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px]"
      />

      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"
      />

      <motion.div
        style={{ x: x2, y: y2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[120px]"
      />
    </div>
  );
}
