import { DashboardSidebarItems } from "./dashboard-sidebar-items";
import { LucideIcon } from "lucide-react";

interface DashboardSidebarContentProps {
  routes: { href: string; icon: LucideIcon; label: string }[];
}

export const DashboardSidebarContent = ({ routes }: DashboardSidebarContentProps) => (
  <div className="h-full w-full border-r flex flex-col overflow-y-auto bg-white">
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <DashboardSidebarItems
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  </div>
);
