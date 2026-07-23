import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import bittuImg from "@/assets/bittu-mascot.png";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative gradient-forest rounded-3xl p-8 md:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            {[...Array(12)].map((_, i) => (
              <Leaf
                key={i}
                size={30 + Math.random() * 40}
                className="absolute text-primary-foreground"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-900 text-primary-foreground mb-4">
              Ready to Be an EcoChamp?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
              Join the movement. Every lesson learned, every tree planted, every mission completed makes a difference.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary font-display font-bold text-lg px-10 py-6 rounded-2xl hover:scale-105 transition-transform"
            >
              <Link to="/dashboard">
                Join EcoChamps Free
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>

          <motion.img
            src={bittuImg}
            alt="Bittu"
            width={120}
            height={120}
            className="absolute bottom-0 right-8 hidden md:block drop-shadow-xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
