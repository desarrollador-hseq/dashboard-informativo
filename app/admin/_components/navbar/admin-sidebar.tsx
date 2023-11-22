"use client";

import React, { useMemo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Compass, Layout, Menu, User2, Users2, UsersIcon } from "lucide-react";
import { AdminSidebarContent } from "./admin-sidebar-content";

const routes = [
  { icon: Layout, label: "Inicio", href: "/dashboard" },
  { icon: Compass, label: "Sistemas", href: "/dashboard/sistemas" },
  { icon: UsersIcon, label: "Usuarios", href: "/dashboard/usuarios" },
];

export const AdminSidebar = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-56">
          <AdminSidebarContent routes={routes} />
        </SheetContent>
      </Sheet>

      <div className="w-56 h-full min-h-screen hidden absolute left-0 top-[54px]">
        <AdminSidebarContent routes={routes} />
      </div>
    </>
  );
};
