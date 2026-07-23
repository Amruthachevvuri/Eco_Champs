import { motion } from "framer-motion";
import { BookOpen, Camera, CheckCircle, Star, Trophy, RefreshCw } from "lucide-react";

const steps = [
  { icon: BookOpen, label: "Learn", desc: "Watch animated eco-lessons", color: "bg-primary" },
  { icon: Camera, label: "Act", desc: "Complete real-world missions", color: "bg-secondary" },
  { icon: CheckCircle, label: "Prove", desc: "Upload photo/video proof", color: "bg-eco-sky" },
  { icon: Star, label: "Earn", desc: "Gain points & badges", color: "bg-eco-sun" },
  { icon: Trophy, label: "Compete", desc: "Climb the leaderboard", color: "bg-eco-meadow" },
  { icon: RefreshCw, label: "Repeat", desc: "Keep the streak alive!", color: "bg-primary" },
];

const LoopSection = () => {
  return (
    <section id="how" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-900 text-foreground mb-4">
            The EcoChamps <span className="text-gradient-meadow">Loop</span>
          </h2>
          <p className="text-muted-foreground text-lg">A closed-loop system that keeps you engaged and the planet happy.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${step.color} flex items-center justify-center shadow-leaf group-hover:scale-110 transition-transform`}>
                <step.icon size={36} className="text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-foreground text-lg">{step.label}</span>
              <span className="text-sm text-muted-foreground text-center max-w-[120px]">{step.desc}</span>
              {i < steps.length - 1 && (
                <span className="hidden md:block absolute text-muted-foreground/30 text-3xl font-bold" style={{ transform: "translateX(60px)" }}>→</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoopSection;
