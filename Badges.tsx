import { Lock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const badges = [
  { id: 1, name: "First Seed", emoji: "🌱", description: "Complete your first eco task", earned: true },
  { id: 2, name: "Tree Hugger", emoji: "🌳", description: "Plant 5 trees", earned: true },
  { id: 3, name: "Quiz Whiz", emoji: "🧠", description: "Score 100% on 3 quizzes", earned: true },
  { id: 4, name: "Water Warrior", emoji: "💧", description: "Complete all water conservation tasks", earned: false, progress: 60 },
  { id: 5, name: "Eco Streak", emoji: "🔥", description: "7-day activity streak", earned: false, progress: 42 },
  { id: 6, name: "Team Player", emoji: "🤝", description: "Participate in 3 school events", earned: false, progress: 33 },
  { id: 7, name: "Nature Artist", emoji: "🎨", description: "Submit 10 creative eco proofs", earned: false, progress: 20 },
  { id: 8, name: "Mega Champion", emoji: "🏆", description: "Win a Mega-League season", earned: false, progress: 0 },
  { id: 9, name: "Planet Protector", emoji: "🌍", description: "Reach 5000 lifetime points", earned: false, progress: 0 },
];

const milestones = [
  { label: "100 Points", reached: true },
  { label: "500 Points", reached: true },
  { label: "1000 Points", reached: true },
  { label: "2500 Points", reached: false },
  { label: "5000 Points", reached: false },
];

const Badges = () => {
  const earned = badges.filter((b) => b.earned).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-900 text-foreground flex items-center gap-2">
          <Star className="text-secondary" size={24} /> Badges & Achievements
        </h1>
        <p className="text-muted-foreground text-sm mt-1">{earned} of {badges.length} badges earned</p>
      </div>

      {/* Milestones */}
      <Card className="glass">
        <CardContent className="p-4">
          <p className="font-display font-bold text-sm mb-3">Point Milestones</p>
          <div className="flex items-center gap-1">
            {milestones.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${m.reached ? "gradient-forest text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {m.reached ? "✓" : i + 1}
                </div>
                <span className="text-[10px] text-muted-foreground text-center">{m.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <Card key={badge.id} className={`transition-all ${badge.earned ? "shadow-leaf" : "opacity-70"}`}>
            <CardContent className="p-4 text-center space-y-2">
              <div className="relative inline-block">
                <span className="text-4xl">{badge.emoji}</span>
                {!badge.earned && (
                  <Lock size={14} className="absolute -bottom-1 -right-1 text-muted-foreground" />
                )}
              </div>
              <h3 className="font-display font-bold text-sm text-foreground">{badge.name}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
              {!badge.earned && badge.progress !== undefined && badge.progress > 0 && (
                <div className="space-y-1">
                  <Progress value={badge.progress} className="h-1.5" />
                  <p className="text-[10px] text-muted-foreground">{badge.progress}%</p>
                </div>
              )}
              {badge.earned && (
                <span className="inline-block text-xs text-primary font-bold">✓ Earned</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Badges;
