"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export const WhatsAppFloatingButton = () => {
  const pathname = usePathname();

  // Don't show on contact page (handles both /contact and /[locale]/contact)
  const isContactPage = pathname?.endsWith("/contact");

  if (isContactPage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 left-6 z-[100] group">
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl">
        Chat with Manu
        {/* Tooltip Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-neutral-900" />
      </div>

      <a
        href="https://wa.me/524463731451?text=Hola%20Manu%2C%20me%20interesa%20hablar%20sobre%20mi%20proyecto"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-[52px] h-[52px] bg-[#25D366] rounded-full text-white shadow-lg hover:shadow-[#25D366]/20 hover:scale-110 transition-all duration-300">
        <FaWhatsapp className="w-6 h-6" />
      </a>
    </motion.div>
  );
};
