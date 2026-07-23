import { Play, Clock, CheckCircle2, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const lessons = [
  { id: 1, title: "Why Trees Matter", duration: "5 min", thumbnail: "🌳", progress: 100, unlocked: true },
  { id: 2, title: "Water – Our Lifeline", duration: "5 min", thumbnail: "💧", progress: 60, unlocked: true },
  { id: 3, title: "The Magic of Composting", duration: "5 min", thumbnail: "♻️", progress: 0, unlocked: true },
  { id: 4, title: "Air Pollution & You", duration: "5 min", thumbnail: "🌬️", progress: 0, unlocked: false },
  { id: 5, title: "Save Energy, Save Earth", duration: "5 min", thumbnail: "⚡", progress: 0, unlocked: false },
  { id: 6, title: "Biodiversity Around Us", duration: "5 min", thumbnail: "🦋", progress: 0, unlocked: false },
];

const Learn = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-900 text-foreground">Learn</h1>
        <p className="text-muted-foreground text-sm mt-1">Watch, understand, then prove your knowledge 🎥</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <Link key={lesson.id} to={lesson.unlocked ? `/learn/${lesson.id}` : "#"} className={!lesson.unlocked ? "pointer-events-none" : ""}>
          <Card className={`group overflow-hidden transition-all hover:shadow-leaf ${!lesson.unlocked ? "opacity-60" : "cursor-pointer"}`}>
            <div className="relative h-32 gradient-meadow flex items-center justify-center text-5xl">
              {lesson.thumbnail}
              {lesson.unlocked ? (
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                  <Play className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" size={36} />
                </div>
              ) : (
                <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                  <Lock className="text-primary-foreground" size={28} />
                </div>
              )}
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display font-bold text-sm text-foreground">{lesson.title}</h3>
                {lesson.progress === 100 && <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={12} />
                {lesson.duration}
              </div>
              {lesson.unlocked && (
                <div className="space-y-1">
                  <Progress value={lesson.progress} className="h-1.5" />
                  <p className="text-xs text-muted-foreground">{lesson.progress}% complete</p>
                </div>
              )}
              {lesson.progress === 100 && (
                <Link to="/quiz" className="inline-block">
                  <Badge className="gradient-forest text-primary-foreground text-xs cursor-pointer">Take Quiz →</Badge>
                </Link>
              )}
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Learn;
