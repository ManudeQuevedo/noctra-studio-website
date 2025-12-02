"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LaunchCountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function LaunchCountdown({ targetDate }: LaunchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <span className="text-2xl md:text-4xl font-mono font-bold text-white tracking-tighter">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] md:text-xs text-neutral-500 font-mono uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );

  const Separator = () => (
    <span className="text-xl md:text-3xl text-neutral-700 font-mono mb-4">
      :
    </span>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex flex-col items-center mb-10">
      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] mb-4">
        Estimated Deployment
      </p>
      <div className="flex items-center justify-center p-4 rounded-xl bg-neutral-900/30 border border-white/5 backdrop-blur-sm">
        <TimeUnit value={timeLeft.days} label="Days" />
        <Separator />
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <Separator />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <Separator />
        <TimeUnit value={timeLeft.seconds} label="Sec" />
      </div>
    </motion.div>
  );
}
