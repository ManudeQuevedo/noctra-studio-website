"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Brain,
  FileText,
  BarChart3,
  Users,
  Zap,
  CheckCircle2,
  X,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { submitEarlyAccess } from "@/app/actions/forge";

/* ── Types ───────────────────────────────────────── */
interface Feature {
  icon: typeof Brain;
  title: string;
  description: string;
}

/* ── Data ────────────────────────────────────────── */
const features: Feature[] = [
  {
    icon: Brain,
    title: "Noctra AI integrado",
    description:
      "Insights automáticos, follow-ups sugeridos y alertas inteligentes basadas en el estado real de tu negocio.",
  },
  {
    icon: FileText,
    title: "Proposal Builder",
    description:
      "Crea propuestas con tu branding en minutos. El cliente las aprueba en línea con un solo click.",
  },
  {
    icon: BarChart3,
    title: "Pipeline Visual",
    description:
      "Visualiza cada oportunidad por etapa. Forecast de ingresos calculado automáticamente.",
  },
  {
    icon: Users,
    title: "Portal de Clientes",
    description:
      "Tus clientes ven el estado de su proyecto en tiempo real. Sin emails de seguimiento.",
  },
];

/* ── Animations ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* ── Components ──────────────────────────────────── */

// 1. Feature Card
const FeatureCard = ({ feature }: { feature: Feature }) => {
  const Icon = feature.icon;
  return (
    <motion.div
      variants={fadeUp}
      className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

// 2. Early Access Modal
const EarlyAccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const locale = window.location.pathname.split("/")[1] || "es";
      const result = await submitEarlyAccess({
        email,
        agencyName,
        locale,
      });

      if (result.error === "duplicate_email") {
        setError("Este correo ya está registrado en la lista de espera.");
      } else if (result.success) {
        setIsSuccess(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error("Error submitting early access:", err);
      setError(
        "Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors">
              <X size={20} />
            </button>

            <div className="p-8">
              {!isSuccess ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Zap size={20} fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Early Access
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono">
                        Noctra CRM — Beta privada
                      </p>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
                    Únete a las agencias que están moldeando el futuro de la
                    gestión digital.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Acceso antes del lanzamiento público",
                      "Precio de fundador — descuento permanente",
                      "Línea directa con el equipo de desarrollo",
                      "Tu feedback moldea el producto",
                    ].map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 text-sm text-neutral-300">
                        <CheckCircle2
                          size={16}
                          className="text-emerald-500 shrink-0 mt-0.5"
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest pl-1">
                        Email corporativo *
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@agencia.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/40 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest pl-1">
                        Nombre de la agencia
                      </label>
                      <input
                        type="text"
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                        placeholder="Ej. Noctra Studio"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/40 transition-colors"
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-lg">
                        {error}
                      </p>
                    )}

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-[0.98]">
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Solicitar Early Access
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-center font-mono text-neutral-500 uppercase tracking-widest mt-4">
                      Solo 20 spots disponibles · Sin tarjeta de crédito
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    ¡Estás en lista!
                  </h3>
                  <p className="text-neutral-400 leading-relaxed mb-8">
                    Te contactaremos en las próximas 48 horas con los detalles
                    de acceso.
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all border border-white/10">
                    Cerrar
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// 3. Main Section
export function MigrationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="noctra-crm"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#050505] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 mb-8">
            <Sparkles size={12} fill="currentColor" />
            CONSTRUIDO POR NOCTRA STUDIO
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">
            Nuestro producto insignia.
            <br />
            <span className="text-emerald-400">Noctra CRM</span> — el CRM que
            una agencia real necesita.
          </h2>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
            Construimos nuestra propia herramienta porque los CRMs existentes no
            se adaptaban a cómo trabajan las agencias digitales. Gestiona
            clientes, propuestas, proyectos y tu pipeline con inteligencia
            artificial — desde el primer día.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>

        {/* Early Access Block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-20">
          <div className="relative p-8 md:p-12 bg-emerald-500/[0.04] border border-emerald-500/20 rounded-[2.5rem] overflow-hidden group">
            {/* Subtle light effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-lg mb-6">
                  🚀 EARLY ACCESS
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Próximamente — Early Access
                </h3>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                  Estamos abriendo acceso anticipado para agencias que quieran
                  probar Noctra CRM antes del lanzamiento oficial, con precio de
                  fundador y línea directa para dar feedback que moldee el
                  producto.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2 group/btn active:scale-[0.98]">
                  Solicitar Early Access
                  <ArrowRight
                    size={20}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  Solo 20 spots disponibles · Sin tarjeta de crédito
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link
            href="/forge"
            className="flex items-center gap-2 px-8 py-3.5 border border-white/15 text-white font-bold rounded-xl hover:border-white/30 hover:bg-white/[0.03] transition-all group/cta">
            Conocer Noctra CRM
            <ArrowRight
              size={18}
              className="group-hover/cta:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href={"/forge#producto" as any}
            className="text-sm font-bold text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group/link">
            Ver cómo funciona
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </Link>
        </motion.div>
      </div>

      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
