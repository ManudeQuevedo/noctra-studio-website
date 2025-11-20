"use client";

import {
  Code2,
  Database,
  Globe,
  Layers,
  Zap,
  Wind,
  Cloud,
  Server,
  Box,
  LayoutTemplate,
  Container,
} from "lucide-react";
import {
  SiPython,
  SiRedis,
  SiPrisma,
  SiShopify,
  SiPayloadcms,
  SiCloudflare,
  SiGithubactions,
  SiTerraform,
  SiFigma,
  SiAdobe,
  SiHotjar,
  SiTypescript,
} from "react-icons/si";
import { FaUserFriends, FaFlask } from "react-icons/fa";
import { motion } from "framer-motion";

const icons = [
  { icon: Globe, label: "Next.js" },
  { icon: Code2, label: "React" },
  { icon: SiFigma, label: "Figma" },
  { icon: Wind, label: "Tailwind" },
  { icon: Server, label: "Node.js" },
  { icon: Database, label: "PostgreSQL" },
  { icon: SiPython, label: "Python" },
  { icon: Zap, label: "Vercel" },
  { icon: Cloud, label: "AWS" },
  { icon: SiCloudflare, label: "Cloudflare" },
  { icon: SiPrisma, label: "Prisma" },
  { icon: SiRedis, label: "Redis" },
  { icon: Container, label: "Docker" },
  { icon: SiGithubactions, label: "GitHub Actions" },
  { icon: SiAdobe, label: "Adobe" },
  { icon: Layers, label: "GSAP" },
  { icon: SiShopify, label: "Shopify" },
  { icon: SiPayloadcms, label: "Payload" },
  { icon: Box, label: "Strapi" },
  { icon: Box, label: "Contentful" },
  { icon: SiTerraform, label: "Terraform" },
  { icon: SiTypescript, label: "TypeScript" },
];

export function TechMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-neutral-950 md:shadow-xl">
      <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <motion.div
          className="flex flex-none gap-12 py-4 pr-12"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}>
          {[...icons, ...icons].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300">
              <item.icon className="h-8 w-8" />
              <span className="text-sm font-mono uppercase tracking-wider hidden md:block">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
