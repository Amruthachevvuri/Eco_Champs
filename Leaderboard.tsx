import { Trophy, Medal, TrendingUp, School, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const studentRankings = [
  { rank: 1, name: "Aarav Sharma", school: "Green Valley", points: 2450, trend: "up" },
  { rank: 2, name: "Priya Patel", school: "Eco Academy", points: 2380, trend: "up" },
  { rank: 3, name: "Rohan Kumar", school: "Green Valley", points: 2200, trend: "same" },
  { rank: 4, name: "Ananya Singh", school: "Nature's Way", points: 2150, trend: "down" },
  { rank: 5, name: "Kabir Jain", school: "Eco Academy", points: 2080, trend: "up" },
  { rank: 6, name: "Meera Gupta", school: "Sunrise School", points: 1950, trend: "same" },
  { rank: 7, name: "You", school: "Green Valley", points: 1820, trend: "up", isUser: true },
];

const schoolRankings = [
  { rank: 1, name: "Green Valley School", students: 120, points: 48500 },
  { rank: 2, name: "Eco Academy", students: 95, points: 42300 },
  { rank: 3, name: "Nature's Way School", students: 80, points: 35600 },
  { rank: 4, name: "Sunrise School", students: 110, points: 33200 },
];

const rankColors = ["text-yellow-500", "text-gray-400", "text-amber-600"];

const Leaderboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-900 text-foreground flex items-center gap-2">
          <Trophy className="text-secondary" size={24} /> Leaderboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Mega-League Season 1 Rankings</p>
      </div>

      <Card className="gradient-forest text-primary-foreground">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Your Position</p>
            <p className="font-display text-3xl font-900">#7</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Your Points</p>
            <p className="font-display text-3xl font-900">1,820</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">To next rank</p>
            <p className="font-display text-lg font-bold flex items-center gap-1">
              <TrendingUp size={16} /> 130 pts
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="students">
        <TabsList className="w-full">
          <TabsTrigger value="students" className="flex-1 gap-1"><Users size={14} /> Students</TabsTrigger>
          <TabsTrigger value="schools" className="flex-1 gap-1"><School size={14} /> Schools</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-2 mt-4">
          {studentRankings.map((s) => (
            <Card key={s.rank} className={s.isUser ? "border-primary bg-primary/5" : ""}>
              <CardContent className="p-3 flex items-center gap-3">
                <span className={`font-display font-900 text-lg w-8 text-center ${rankColors[s.rank - 1] || "text-muted-foreground"}`}>
                  {s.rank <= 3 ? <Medal size={20} className={rankColors[s.rank - 1]} /> : `#${s.rank}`}
                </span>
                <div className="flex-1">
                  <p className="font-display font-bold text-sm text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.school}</p>
                </div>
                <span className="font-display font-bold text-sm text-foreground">{s.points.toLocaleString()} pts</span>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="schools" className="space-y-2 mt-4">
          {schoolRankings.map((s) => (
            <Card key={s.rank}>
              <CardContent className="p-3 flex items-center gap-3">
                <span className={`font-display font-900 text-lg w-8 text-center ${rankColors[s.rank - 1] || "text-muted-foreground"}`}>
                  {s.rank <= 3 ? <Medal size={20} className={rankColors[s.rank - 1]} /> : `#${s.rank}`}
                </span>
                <div className="flex-1">
                  <p className="font-display font-bold text-sm text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.students} students</p>
                </div>
                <span className="font-display font-bold text-sm text-foreground">{s.points.toLocaleString()} pts</span>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;
