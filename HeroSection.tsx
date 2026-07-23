import { motion } from "framer-motion";
import { ArrowRight, Leaf, TreePine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import chikkuImg from "@/assets/chikku-mascot.png";
import bittuImg from "@/assets/bittu-mascot.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--eco-forest))] via-[hsl(var(--eco-forest)/0.7)] to-background" />

      {/* Floating leaves decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20"
            initial={{ y: -20, x: Math.random() * 100 + "%", rotate: 0 }}
            animate={{
              y: "110vh",
              rotate: 360,
              x: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          >
            <Leaf size={20 + Math.random() * 20} />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <Sparkles size={16} className="text-eco-sun" />
              <span className="text-primary-foreground/90">Gamified Environmental Education</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-900 leading-tight text-primary-foreground">
              Learn, Act,{" "}
              <span className="relative">
                <span className="text-eco-sun">Protect</span>
              </span>
              <br />
              Our Planet
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg font-body leading-relaxed">
              Join thousands of students on eco-missions. Watch, learn, compete, and make a real difference — guided by your friends Chikku & Bittu!
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="gradient-forest text-primary-foreground font-display font-bold text-lg px-8 py-6 rounded-2xl shadow-leaf hover:scale-105 transition-transform"
              >
                <Link to="/dashboard">
                  Start Your Journey
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="glass text-primary-foreground border-primary-foreground/20 font-display font-bold text-lg px-8 py-6 rounded-2xl hover:scale-105 transition-transform"
              >
                <Link to="/learn">
                  <TreePine className="mr-2" size={20} />
                  Explore Missions
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              {[
                { label: "Students", value: "10K+" },
                { label: "Trees Planted", value: "5K+" },
                { label: "Schools", value: "200+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl font-900 text-eco-sun">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Mascots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center items-end"
          >
            {/* Chikku */}
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={chikkuImg}
                alt="Chikku the Tree - Your eco mentor"
                width={320}
                height={320}
                className="drop-shadow-2xl"
              />
              {/* Speech bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-4 -right-4 glass-strong rounded-2xl rounded-bl-sm p-3 max-w-[180px]"
              >
                <p className="text-sm font-display font-bold text-foreground">
                  Ready to save the planet? Let's go! 🌍
                </p>
              </motion.div>
            </motion.div>

            {/* Bittu */}
            <motion.div
              className="relative z-20 -ml-12"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <img
                src={bittuImg}
                alt="Bittu the Squirrel - Your fun companion"
                width={220}
                height={220}
                className="drop-shadow-2xl"
              />
              {/* Speech bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute -top-2 -left-8 glass-strong rounded-2xl rounded-br-sm p-3 max-w-[170px]"
              >
                <p className="text-sm font-display font-bold text-foreground">
                  Wait… do trees sleep? 🤔
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
