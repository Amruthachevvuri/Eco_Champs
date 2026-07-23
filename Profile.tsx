import { User, Star, Flame, Target, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import bittuMascot from "@/assets/bittu-mascot.png";
import chikkuMascot from "@/assets/chikku-mascot.png";

const Profile = () => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="glass overflow-hidden">
        <div className="h-20 gradient-forest" />
        <CardContent className="p-6 -mt-10">
          <div className="flex items-end gap-4 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-card border-4 border-card flex items-center justify-center shadow-leaf">
              <User size={32} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display text-xl font-900 text-foreground">Eco Champ</h1>
              <p className="text-sm text-muted-foreground">Green Valley School · Grade 8</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-muted">
              <p className="font-display font-900 text-lg text-foreground">1,820</p>
              <p className="text-xs text-muted-foreground">Total Points</p>
            </div>
            <div className="p-3 rounded-xl bg-muted">
              <p className="font-display font-900 text-lg text-foreground">#7</p>
              <p className="text-xs text-muted-foreground">Rank</p>
            </div>
            <div className="p-3 rounded-xl bg-muted">
              <p className="font-display font-900 text-lg text-foreground flex items-center justify-center gap-1">
                <Flame size={16} className="text-secondary" /> 5
              </p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="font-display font-bold text-sm text-foreground">Progress Summary</h2>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Lessons Completed</span>
                <span className="font-bold text-foreground">1/6</span>
              </div>
              <Progress value={16} className="h-1.5" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Tasks Completed</span>
                <span className="font-bold text-foreground">5/12</span>
              </div>
              <Progress value={41} className="h-1.5" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Badges Earned</span>
                <span className="font-bold text-foreground">3/9</span>
              </div>
              <Progress value={33} className="h-1.5" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Events Attended</span>
                <span className="font-bold text-foreground">2/5</span>
              </div>
              <Progress value={40} className="h-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-display font-bold text-sm text-foreground mb-3">Recent Badges</h2>
          <div className="flex gap-3">
            {["🌱", "🌳", "🧠"].map((emoji, i) => (
              <div key={i} className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl shadow-sm">
                {emoji}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-secondary/30 bg-secondary/5">
        <CardContent className="p-4 flex items-center gap-3">
          <img src={bittuMascot} alt="Bittu" className="w-12 h-12 rounded-full" />
          <div>
            <p className="text-sm font-bold text-foreground">Bittu says:</p>
            <p className="text-sm text-muted-foreground italic">"You're doing great! Just 130 points to rank up. Let's gooo! 🚀"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
