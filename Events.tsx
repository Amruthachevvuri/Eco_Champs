import { Calendar, MapPin, Users, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const upcomingEvents = [
  { id: 1, title: "School Tree Planting Drive", date: "Apr 5, 2026", location: "Green Valley Campus", participants: 45, type: "offline", bridge: false },
  { id: 2, title: "River Cleanup Day", date: "Apr 12, 2026", location: "Yamuna Ghat", participants: 80, type: "offline", bridge: false },
  { id: 3, title: "Eco Art Workshop", date: "Apr 18, 2026", location: "Community Hall", participants: 25, type: "bridge", bridge: true },
];

const pastEvents = [
  { title: "World Water Day Rally", date: "Mar 22, 2026", participants: 120, participated: true, points: 40 },
  { title: "Seed Ball Making", date: "Mar 15, 2026", participants: 60, participated: true, points: 30 },
  { title: "Bird Watching Trip", date: "Mar 8, 2026", participants: 35, participated: false, points: 0 },
];

const Events = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-900 text-foreground flex items-center gap-2">
          <Calendar className="text-secondary" size={24} /> Events
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Join eco-events and earn bonus points 📅</p>
      </div>

      <h2 className="font-display text-lg font-bold text-foreground">Upcoming Events</h2>
      <div className="space-y-3">
        {upcomingEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-sm text-foreground">{event.title}</h3>
                    {event.bridge && <Badge variant="secondary" className="text-[10px]">Bridge Event</Badge>}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={10} /> {event.location}</span>
                    <span className="flex items-center gap-1"><Users size={10} /> {event.participants} joining</span>
                  </div>
                </div>
                <Button size="sm" className="gradient-forest text-primary-foreground rounded-xl text-xs shrink-0">
                  Register
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="font-display text-lg font-bold text-foreground">Past Events</h2>
      <div className="space-y-2">
        {pastEvents.map((event, i) => (
          <Card key={i}>
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.date} · {event.participants} attended</p>
              </div>
              {event.participated ? (
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary text-xs">+{event.points} pts</Badge>
                  <CheckCircle2 size={14} className="text-primary" />
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">Missed</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
