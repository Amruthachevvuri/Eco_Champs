import { motion } from "framer-motion";
import { Camera, CheckCircle, Clock, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const tasks = [
  { id: 1, title: "Plant a sapling & take a selfie 🌱", status: "completed", points: 50 },
  { id: 2, title: "Reduce plastic use for a day 🚫", status: "completed", points: 30 },
  { id: 3, title: "Clean up your local park 🧹", status: "in_progress", points: 80 },
  { id: 4, title: "Make a compost bin tutorial 📹", status: "pending", points: 100 },
];

const statusStyles = {
  completed: "bg-primary/10 text-primary",
  in_progress: "bg-secondary/10 text-secondary",
  pending: "bg-muted text-muted-foreground",
};

const statusIcons = {
  completed: CheckCircle,
  in_progress: Clock,
  pending: Camera,
};

const WeeklyTaskCard = () => {
  const completed = tasks.filter((t) => t.status === "completed").length;
  const progress = (completed / tasks.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-strong rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl font-bold text-foreground">This Week's Missions</h3>
        <span className="text-sm font-medium text-muted-foreground">{completed}/{tasks.length} done</span>
      </div>

      <Progress value={progress} className="h-2 mb-6" />

      <div className="space-y-3">
        {tasks.map((task, i) => {
          const Icon = statusIcons[task.status as keyof typeof statusIcons];
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${statusStyles[task.status as keyof typeof statusStyles]}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {task.title}
                </p>
                <span className="text-xs text-eco-sun font-semibold">+{task.points} pts</span>
              </div>
              {task.status === "in_progress" && (
                <Button asChild size="sm" className="gradient-forest text-primary-foreground rounded-lg text-xs font-bold">
                  <Link to="/tasks">
                    <Upload size={14} className="mr-1" /> Upload
                  </Link>
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WeeklyTaskCard;
