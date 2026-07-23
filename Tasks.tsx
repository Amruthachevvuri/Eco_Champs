import { Upload, CheckCircle2, Clock, Camera, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const weeklyTasks = [
  { id: 1, title: "Plant a sapling", description: "Plant any sapling and water it daily for a week", points: 50, status: "completed", dueIn: "Done" },
  { id: 2, title: "Reduce plastic for a day", description: "Go one full day without single-use plastic", points: 30, status: "pending", dueIn: "3 days" },
  { id: 3, title: "Compost kitchen waste", description: "Collect kitchen waste and start a compost pile", points: 40, status: "not_started", dueIn: "5 days" },
  { id: 4, title: "Nature walk & journal", description: "Take a 30-minute nature walk and journal 5 observations", points: 25, status: "not_started", dueIn: "6 days" },
];

const pastSubmissions = [
  { task: "Planted a mango tree", date: "Mar 20", points: 50, verified: true },
  { task: "Cleaned school garden", date: "Mar 14", points: 40, verified: true },
  { task: "Made a bird feeder", date: "Mar 8", points: 35, verified: false },
];

const Tasks = () => {
  const completed = weeklyTasks.filter((t) => t.status === "completed").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-900 text-foreground">Eco Tasks</h1>
        <p className="text-muted-foreground text-sm mt-1">Complete missions, upload proof, earn points 🌱</p>
      </div>

      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-foreground">Weekly Progress</span>
            <span className="text-sm text-muted-foreground">{completed}/{weeklyTasks.length} tasks</span>
          </div>
          <Progress value={(completed / weeklyTasks.length) * 100} className="h-2" />
        </CardContent>
      </Card>

      <div className="space-y-3">
        {weeklyTasks.map((task) => (
          <Card key={task.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-sm text-foreground">{task.title}</h3>
                    {task.status === "completed" && <CheckCircle2 size={14} className="text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{task.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="outline" className="text-xs">+{task.points} pts</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={10} /> {task.dueIn}
                    </span>
                  </div>
                </div>
                {task.status !== "completed" && (
                  <Button size="sm" className="gradient-forest text-primary-foreground rounded-xl text-xs shrink-0">
                    <Upload size={14} className="mr-1" /> Upload
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-foreground mb-3">Submission History</h2>
        <div className="space-y-2">
          {pastSubmissions.map((sub, i) => (
            <Card key={i}>
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <ImageIcon size={14} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{sub.task}</p>
                    <p className="text-xs text-muted-foreground">{sub.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">+{sub.points}</Badge>
                  {sub.verified ? (
                    <Badge className="bg-primary/10 text-primary text-xs">Verified</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">Pending</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
