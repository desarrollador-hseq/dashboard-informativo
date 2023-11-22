import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoginForm } from "./_components/login-form";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Logo } from "@/components/logo";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session && session.user?.role) {
    console.log(session.user.role)
    redirect("/dashboard");
  }

  return (
    <div className="bg-white h-screen">
      <div className="relative p-1 border-b h-[55px] max-h-[70px] w-full bg-white shadow-sm flex items-center">
        <div className="mx-auto w-full max-w-[1500px] mt-1">
          <div className="mx-3 flex items-center justify-between">
            <div className="p-2 flex gap-1">
              <Logo  />
            </div>
          </div>
        </div>
      </div>
      <div className="container w-full flex items-start justify-center pt-14 h-fit">
        <Card className="p-3 w-[350px] space-y-4 md:space-y-6 rounded-sm">
          <CardHeader>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center md:text-2xl dark:text-white">
              Ingresar
            </h1>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
