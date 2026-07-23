import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import BittuWidget from "@/components/mascot/BittuWidget";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b border-border px-4 lg:hidden">
            <SidebarTrigger />
          </header>
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
      <BittuWidget />
    </SidebarProvider>
  );
};

export default AppLayout;
