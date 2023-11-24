import { Logo } from "@/components/logo";
import { AdminSidebarItems } from "./admin-sidebar-items";
import { LucideIcon } from "lucide-react";

interface AdminSidebarContentProps {
  routes: { href: string; icon: LucideIcon; label: string }[];
}

export const AdminSidebarContent = ({ routes }: AdminSidebarContentProps) => (
  <div className="h-full w-full border-r flex flex-col overflow-y-auto bg-white">
    <div className="flex flex-col w-full">
      <div className="md:hidden h-14 flex justify-start items-center pl-7">
        <Logo goRoot />
      </div>
      {routes.map((route) => (
        <AdminSidebarItems
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  </div>
);
