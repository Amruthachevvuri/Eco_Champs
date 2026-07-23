import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-forest flex items-center justify-center">
            <Leaf size={20} className="text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-900 text-foreground">EcoChamps</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <Button asChild className="gradient-forest text-primary-foreground font-display font-bold rounded-xl">
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-strong border-t border-border"
          >
            <div className="p-4 space-y-3">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="block py-2 text-foreground font-medium" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <Button asChild className="w-full gradient-forest text-primary-foreground font-display font-bold rounded-xl">
                <Link to="/dashboard">Get Started</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
