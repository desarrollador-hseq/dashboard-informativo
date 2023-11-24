import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils";
import { ClientCookiesProvider } from "@/components/providers/cookies-provider";
import { NextAuthProvider } from "@/components/providers/nextauth-provider";
import { DashboardProvider } from "@/components/providers/dashboard-provider";
import { Suspense } from "react";
import { Loading } from "@/components/loading";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard sobre el avance del proyecto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <ClientCookiesProvider value={cookies().getAll()}>
        <NextAuthProvider>
          <DashboardProvider>
            <body className={cn(inter.className, "min-h-screen")}>
              <Toaster richColors />
              <div className="min-h-screen transition"><Suspense fallback={<Loading />} >{children}</Suspense></div>
              {/* footer */}
              <div className="footer h-10 w-full bg-primary flex items-center mt-5">
                <div className="w-[70%] mx-auto flex justify-center gap-4 text-white text-sm">
                  <span>2023</span>
                  <p className="text-sm">Todos los derechos reservados.</p>
                </div>
              </div>
            </body>
          </DashboardProvider>
        </NextAuthProvider>
      </ClientCookiesProvider>
    </html>
  );
}

