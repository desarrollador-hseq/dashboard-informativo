"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export const Logo = ({ goRoot, className, height=40, width=70 }: { goRoot?: boolean, height?: number, width?: number, className?: string }) => {
  const pathname = usePathname();

  const isDashboard = useMemo(() => pathname.includes("dashboard"), [pathname]);

  const router = useRouter();

  const navigate = () => {
    if (!goRoot) return;

    router.push(!isDashboard ? "/" : "/dashboard");
  };

  return (
    <Image
      className={cn(goRoot && "cursor-pointer" , className)}
      onClick={navigate}
      src="/logo.svg"
      alt="logo "
      height={height}
      width={width}
    />
  );
};
