import { motion } from "framer-motion";
import { BookOpen, Camera, Trophy, Users, Leaf, Zap } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Lessons",
    description: "5-minute animated stories with Chikku & Bittu. Not lectures — adventures!",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Camera,
    title: "Eco-Proof Missions",
    description: "Complete real-world tasks and upload photo/video proof to earn rewards.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Trophy,
    title: "Mega-League",
    description: "Quarterly inter-school competitions with live leaderboards and prizes.",
    color: "bg-eco-sky/10 text-eco-sky",
  },
  {
    icon: Users,
    title: "Bridge Events",
    description: "Inclusive offline events for all students, with gradual digital onboarding.",
    color: "bg-eco-earth/10 text-eco-earth",
  },
  {
    icon: Leaf,
    title: "Real Impact",
    description: "Track trees planted, waste reduced, and your personal environmental footprint.",
    color: "bg-eco-meadow/10 text-eco-meadow",
  },
  {
    icon: Zap,
    title: "Smart Quizzes",
    description: "AI-powered quizzes based only on video content. Bittu's Doubt Mode included!",
    color: "bg-eco-sun/10 text-eco-sun",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-display font-bold text-sm mb-4">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-900 text-foreground mb-4">
            Learn → Act → Prove → <span className="text-gradient-forest">Earn</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete loop that turns environmental knowledge into real-world action.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-6 hover:shadow-leaf transition-all duration-300 group cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
