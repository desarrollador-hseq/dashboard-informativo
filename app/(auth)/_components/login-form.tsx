"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loading } from "@/components/loading";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Usuario es requerido",
  }),
  password: z.string().min(5, {
    message: "digite al menos 5 caracteres",
  }),
});

export const LoginForm = () => {
  const [isClient, setIsClient] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewPass, setViewPass] = useState(false);

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsEditing(true);
    setViewPass(false);
    try {
      const signInResponse = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!signInResponse || signInResponse.ok !== true) {
        return toast.error("Usuario y/o Contraseña incorrectos", {
          description: "Por favor revisa los datos ingresados",
          position: "bottom-center",
        });
      }

      router.refresh();
      toast.success("Bienvenido");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
      console.log("errorr", error);
    } finally {
      setIsEditing(false);
    }
  };

  if (!isClient)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader2 className="w-7 h-7 animate-spin text-primary" />
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="usuario"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    type={viewPass ? "text" : "password"}
                    className="relative"
                    disabled={isSubmitting}
                    placeholder="•••••••••"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                {field.value && (
                  <div
                    onClick={() => setViewPass(!viewPass)}
                    className="absolute top-1 right-2 "
                  >
                    {!viewPass ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <Link href="/dashboard" className="w-full">
        Entrar
      </Link> */}
        <Button disabled={!isValid || isSubmitting} className="w-full">
          {isEditing && <Loader2 className="w-4 h-4 animate-spin" />}
          Entrar
        </Button>
        {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          ¿aun no tienes una cuenta?
          <Link
            href="/auth/registrarse"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Registrarse
          </Link>
        </p> */}
      </form>
    </Form>
  );
};
