"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Clipboard, ClipboardCheck, Menu, Users } from "lucide-react";
import { DashboardSidebarContent } from "./dashboard-sidebar-content";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const DashboardSidebar = () => {
  const { data: session } = useSession();

  const isAdmin = useMemo(() => session?.user.role === "ADMIN", [session]);
  const routes = [
    {
      icon: Users,
      label: "Colaboradores",
      href: "/admin/colaboradores",
    },
    {
      icon: ClipboardCheck,
      label: "Inspecciones",
      href: "/admin/inspecciones",
    },
    {
      icon: Clipboard,
      label: "Informes",
      href: "/admin/informes",
    },
  ];
  return (
    <>
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-56">
          <DashboardSidebarContent routes={routes} />
        </SheetContent>
      </Sheet>

      <div className="w-56 h-full min-h-screen hidden absolute left-0 top-[54px]">
        <DashboardSidebarContent routes={routes} />
      </div>
    </>
  );
};
