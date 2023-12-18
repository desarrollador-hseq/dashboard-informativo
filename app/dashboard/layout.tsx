import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { DashboardNavbar } from "./_components/navbar/dashboard-navbar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { DashboardRequiredError } from "@/lib/exceptions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { ScrollUp } from "@/components/scroll-up";
import { Loader2 } from "lucide-react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.role) {
    redirect("/");
  }

  return (
    <div className="">
      <main className="relative flex flex-col h-full m-0 p-0 w-full min-h-screen">
        <DashboardNavbar />
        <div className="relative mt-1 min-h-screen w-full max-w-[1500px] mx-auto">
          <div className="Loader w-full h-[calc(100vh-64px)] flex justify-center items-center absolute top-0 left-0 z-0">
            <Loader2 className="w-10 h-10 animate-spin text-secondary" />
          </div>
          {/* {children} */}
        </div>
        <ScrollUp />
      </main>
    </div>
  );
};

export default DashboardLayout;
