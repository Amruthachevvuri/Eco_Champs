import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX } from "lucide-react";
import bittuImg from "@/assets/bittu-mascot.png";

const dialogues = [
  "If trees give oxygen, why don't we plant them everywhere? 🤔",
  "Do squirrels help plant trees or just eat them? 😄",
  "Is recycling just fancy sorting? 🗂️",
  "Your plant might be missing you 🌱",
  "Leaderboard update… drama alert 😎",
  "Wait, do fish drink water? 🐟",
  "If the sun is free energy, why do we pay for electricity? ⚡",
];

const BittuWidget = () => {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const nextDialogue = () => {
    setDialogueIndex((prev) => (prev + 1) % dialogues.length);
  };

  if (muted) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-muted flex items-center justify-center shadow-earth border border-border"
        onClick={() => setMuted(false)}
      >
        <VolumeX size={20} className="text-muted-foreground" />
      </motion.button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-strong rounded-2xl p-4 mb-3 w-72 shadow-leaf"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="font-display font-bold text-foreground text-sm">🐿️ Bittu says...</span>
              <div className="flex gap-1">
                <button onClick={() => setMuted(true)} className="text-muted-foreground hover:text-foreground p-1">
                  <Volume2 size={14} />
                </button>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground p-1">
                  <X size={14} />
                </button>
              </div>
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-3">{dialogues[dialogueIndex]}</p>
            <button
              onClick={nextDialogue}
              className="text-xs font-bold text-primary hover:underline"
            >
              Tell me more! →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full gradient-sunset shadow-lg flex items-center justify-center overflow-hidden border-2 border-card hover:scale-110 transition-transform"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={bittuImg} alt="Bittu" width={48} height={48} className="object-contain" />
      </motion.button>
    </div>
  );
};

export default BittuWidget;
