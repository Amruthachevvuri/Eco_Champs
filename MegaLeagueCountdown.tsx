import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MegaLeagueCountdown = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 47); // 47 days remaining

  const [timeLeft, setTimeLeft] = useState({ days: 47, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.mins },
    { label: "Secs", value: timeLeft.secs },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="gradient-forest rounded-2xl p-6 text-primary-foreground relative overflow-hidden"
    >
      <div className="absolute top-3 right-3 opacity-10">
        <Trophy size={80} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Trophy size={20} className="text-eco-sun" />
          <h3 className="font-display text-lg font-bold">Mega-League Q2 2026</h3>
        </div>
        <p className="text-primary-foreground/70 text-sm mb-4">Inter-school eco-competition is live!</p>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {units.map((u) => (
            <div key={u.label} className="text-center bg-primary-foreground/10 rounded-xl p-2">
              <div className="font-display text-2xl font-900">{String(u.value).padStart(2, "0")}</div>
              <div className="text-xs text-primary-foreground/60">{u.label}</div>
            </div>
          ))}
        </div>

        <Button className="w-full bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground font-display font-bold rounded-xl border border-primary-foreground/10">
          View Leaderboard <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default MegaLeagueCountdown;
