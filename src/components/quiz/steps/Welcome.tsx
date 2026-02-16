"use client";

import { useQuiz } from "../QuizContext";
import { ArrowRight, Clock, Calculator, Gift, Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const Welcome = () => {
  const { nextStep } = useQuiz();

  const benefits = [
    { icon: Clock, text: "Takes only 2 minutes", color: "text-blue-400" },
    { icon: Target, text: "Get personalized recommendation", color: "text-emerald-400" },
    { icon: Calculator, text: "See exact pricing for your needs", color: "text-purple-400" },
    { icon: Gift, text: "Receive free consultation offer", color: "text-pink-400" },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 py-4 md:py-8">
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl"
      >
        <Sparkles className="w-8 h-8 text-white" />
      </motion.div>

      <div className="space-y-4 max-w-lg">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Find Your Perfect <br />
          <span className="text-neutral-400">
            Website Solution
          </span>
        </h2>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Answer 6 quick questions to discover which service fits your business best.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 text-left group hover:bg-white/10 transition-colors"
          >
            <benefit.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors shrink-0" />
            <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
              {benefit.text}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="pt-4 flex flex-col gap-4 w-full max-w-sm"
      >
        <button
          onClick={nextStep}
          className="w-full py-4 rounded-xl bg-white text-black font-black text-lg uppercase tracking-widest hover:bg-neutral-200 transition-all active:scale-95 flex items-center justify-center gap-2 group"
        >
          Start Quiz <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-xs text-neutral-500 font-medium">
          No commitment required
        </p>
      </motion.div>
    </div>
  );
};
