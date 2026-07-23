import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import LessonDetail from "./pages/LessonDetail";
import Tasks from "./pages/Tasks";
import Leaderboard from "./pages/Leaderboard";
import Badges from "./pages/Badges";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/learn" element={<AppLayout><Learn /></AppLayout>} />
          <Route path="/learn/:id" element={<AppLayout><LessonDetail /></AppLayout>} />
          <Route path="/quiz" element={<AppLayout><Quiz /></AppLayout>} />
          <Route path="/tasks" element={<AppLayout><Tasks /></AppLayout>} />
          <Route path="/leaderboard" element={<AppLayout><Leaderboard /></AppLayout>} />
          <Route path="/badges" element={<AppLayout><Badges /></AppLayout>} />
          <Route path="/events" element={<AppLayout><Events /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
