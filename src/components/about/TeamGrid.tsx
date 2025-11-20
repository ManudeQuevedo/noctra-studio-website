"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TEAM_MEMBERS = [
  {
    name: "Manu",
    role: "Architecture & Strategy",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&q=80", // Placeholder
  },
  {
    name: "Partner Name",
    role: "Visual Design",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop&q=80", // Placeholder
  },
  {
    name: "Partner Name",
    role: "Full Stack Engineering",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop&q=80", // Placeholder
  },
];

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}>
    {children}
  </motion.div>
);

export function TeamGrid() {
  return (
    <div className="w-full border-t border-neutral-200 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {TEAM_MEMBERS.map((member, index) => (
          <div
            key={index}
            className={cn(
              "group relative aspect-[3/4] overflow-hidden border-b border-neutral-200",
              "border-r border-neutral-200 lg:last:border-r-0",
              // Remove right border for the last item in each row on tablet (2 cols)
              "md:even:border-r-0 lg:even:border-r",
              // Remove right border for the last item in each row on desktop (3 cols)
              "lg:[&:nth-child(3n)]:border-r-0"
            )}>
            {/* Image */}
            <div className="absolute inset-0 bg-neutral-100">
              {/* 
                NOTE: Using a standard img tag for now since we are using external placeholder URLs.
                In production, switch to Next.js Image component.
              */}
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover transition-all duration-500 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100"
              />
            </div>

            {/* Overlay Gradient (Subtle) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-mono text-neutral-300 uppercase tracking-wider">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
