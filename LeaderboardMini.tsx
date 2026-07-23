import { motion } from "framer-motion";
import { Medal } from "lucide-react";

const leaders = [
  { rank: 1, name: "Green Valley School", points: 12450, badge: "🥇" },
  { rank: 2, name: "Sunrise Academy", points: 11200, badge: "🥈" },
  { rank: 3, name: "Eco Springs High", points: 10800, badge: "🥉" },
  { rank: 4, name: "Nature's Way School", points: 9500, badge: "" },
  { rank: 5, name: "Your School", points: 8900, badge: "", highlight: true },
];

const LeaderboardMini = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-strong rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Medal size={20} className="text-eco-sun" />
        <h3 className="font-display text-xl font-bold text-foreground">Leaderboard</h3>
      </div>

      <div className="space-y-2">
        {leaders.map((l, i) => (
          <motion.div
            key={l.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              l.highlight ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
            }`}
          >
            <span className="font-display font-900 text-lg w-8 text-center">
              {l.badge || `#${l.rank}`}
            </span>
            <span className={`flex-1 font-medium text-sm ${l.highlight ? "text-primary font-bold" : "text-foreground"}`}>
              {l.name}
            </span>
            <span className="font-display font-bold text-sm text-eco-sun">{l.points.toLocaleString()}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LeaderboardMini;
