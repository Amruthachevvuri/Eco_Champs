import { motion } from "framer-motion";
import chikkuImg from "@/assets/chikku-mascot.png";
import bittuImg from "@/assets/bittu-mascot.png";

const MascotGreeting = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6"
    >
      <div className="flex items-end -space-x-4">
        <motion.img
          src={chikkuImg}
          alt="Chikku"
          width={80}
          height={80}
          className="drop-shadow-lg"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.img
          src={bittuImg}
          alt="Bittu"
          width={60}
          height={60}
          className="drop-shadow-lg relative z-10"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h2 className="font-display text-2xl font-bold text-foreground">
          {greeting}, EcoChamp! 🌱
        </h2>
        <div className="mt-2 space-y-1">
          <p className="text-muted-foreground">
            🌳 <span className="font-semibold text-primary">Chikku:</span> "You've completed 3 missions this week. Keep going!"
          </p>
          <p className="text-muted-foreground">
            🐿️ <span className="font-semibold text-secondary">Bittu:</span> "3 missions? I can't even remember to water my acorn 😅"
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-primary/10">
        <span className="font-display text-3xl font-900 text-primary">12</span>
        <span className="text-xs text-muted-foreground font-medium">Day Streak 🔥</span>
      </div>
    </motion.div>
  );
};

export default MascotGreeting;
