import MascotGreeting from "@/components/dashboard/MascotGreeting";
import WeeklyTaskCard from "@/components/dashboard/WeeklyTaskCard";
import MegaLeagueCountdown from "@/components/dashboard/MegaLeagueCountdown";
import LeaderboardMini from "@/components/dashboard/LeaderboardMini";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <MascotGreeting />
      <div className="grid lg:grid-cols-2 gap-6">
        <WeeklyTaskCard />
        <div className="space-y-6">
          <MegaLeagueCountdown />
          <LeaderboardMini />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
