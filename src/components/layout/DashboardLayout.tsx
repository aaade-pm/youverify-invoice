import { useState } from "react";
import { SidebarNav } from "./SidebarNav";
import { Topbar } from "./Topbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export function DashboardLayout({
  title = "INVOICE",
  children,
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNav className="hidden lg:flex fixed left-0 top-0 h-screen" />
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarNav />
        </SheetContent>
      </Sheet>
      <div className="bg-ghost-blue flex-1 flex flex-col lg:ml-60 xl:ml-72 h-screen">
        <Topbar
          title={title}
          onMenuClick={() => setMobileMenuOpen(true)}
          className="fixed top-0 right-0 left-0 lg:left-60 xl:left-72 z-10"
        />
        <ScrollArea className="flex-1" style={{ marginTop: "73px" }}>
          <main className="px-4 sm:px-6 py-6 sm:py-10 bg-ghost-blue">
            {children}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
