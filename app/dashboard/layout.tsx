import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { DashboardNavbar } from "./_components/navbar/dashboard-navbar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { DashboardRequiredError } from "@/lib/exceptions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { ScrollUp } from "@/components/scroll-up";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.role) {
    redirect("/");
  }

  return (
    <div>
      <main className="relative flex flex-col h-full min-h-screen m-0 p-0 ">
        <DashboardNavbar />
        <div className="mt-1 min-h-screen w-full max-w-[1500px] mx-auto">
          {children}
          </div>
          <ScrollUp />
      </main>
      
    </div>
  );
};

export default DashboardLayout;
