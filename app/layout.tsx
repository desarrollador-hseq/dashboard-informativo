import { Suspense } from "react";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import type { Metadata } from "next";

import "./globals.css";
import "simplebar-react/dist/simplebar.min.css";

const inter = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils";
import { ClientCookiesProvider } from "@/components/providers/cookies-provider";
import { NextAuthProvider } from "@/components/providers/nextauth-provider";
import { DashboardProvider } from "@/components/providers/dashboard-provider";
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
    <ClientCookiesProvider value={cookies().getAll()}>
      <html lang="es">
        <NextAuthProvider>
          <DashboardProvider>
            <body
              className={cn(
                inter.className,
                "min-h-screen bg-blue-100/50 font-sans antialiased grainy"
              )}
            >
              <Toaster richColors />
              <div className="min-h-screen transition">
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </div>
              {/* footer */}
              <footer className="footer h-10 w-full bg-primary flex items-center mt-5">
                <div className="w-[70%] mx-auto flex justify-center gap-1 text-white text-sm">
                  &copy;
                  <span>2023</span>
                  <span>
                    <a
                      href="https://grupohseq.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 font-bold"
                    >
                      Grupo HSEQ
                    </a>
                    .
                  </span>
                  <p className="text-sm">Todos los derechos reservados.</p>
                </div>
              </footer>
            </body>
          </DashboardProvider>
        </NextAuthProvider>
      </html>
    </ClientCookiesProvider>
  );
}
