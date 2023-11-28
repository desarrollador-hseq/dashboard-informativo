"use client";

import axios from "axios";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inspection } from "@prisma/client";
import {
  CalendarIcon,
  Check,
  Clipboard,
  ClipboardList,
  Loader2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CheckedState } from "@radix-ui/react-checkbox";
import { cn, formatDate } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IconBadge } from "@/components/ui/icon-badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteInspection } from "./delete-inspection";

interface AddInspectionFormProps {
  inspection?: Inspection | null;
}

const formSchema = z.object({
  city: z.string().min(1, {
    message: "Nombre requerido",
  }),
  date: z.date().or(z.string()),
  isExecuted: z.boolean().nullable().default(false),
});

export const AddInspectionForm = ({ inspection }: AddInspectionFormProps) => {
  const router = useRouter();
  const isEdit = useMemo(() => inspection, [inspection]);

  if (isEdit && !inspection) {
    router.replace("/admin/informes");
    toast.error("Colaborador no encontrado, redirigiendo...");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: inspection?.city || "",
      date: inspection?.date || "",
      isExecuted: inspection?.isExecuted || false,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const { setValue, setError } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEdit) {
        await axios.patch(`/api/inspections/${inspection?.id}`, values);
        toast.success("Inspección actualizada");
      } else {
        const { data } = await axios.post(`/api/inspections/`, values);
        toast.success("Inspección programada");
      }
      router.push(`/admin/inspecciones/`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error inesperado");
    }
  };

  const handleEvaluation = (e: CheckedState) => {
    setValue("isExecuted", !!e);
    return
  };

  return (
    <div className=" max-w-[1500px] mx-auto shadow-sm bg-white overflow-hidden p-3">
      <div className="flex justify-between items-center gap-x-2 bg-white">
        <div className="flex items-center">
          <IconBadge icon={isEdit ? ClipboardList : Clipboard} />
          <h2 className="text-2xl font-semibold">
            {isEdit ? (
              <>
                <p>
                  Editar Inspección:{" "}
                  <span className="font-normal text-base">
                    <span className="capitalize">{inspection?.city}</span> -{" "}
                    {formatDate(inspection?.date!)}
                  </span>
                </p>
              </>
            ) : (
              "Programar Inspección"
            )}
          </h2>
        </div>
        <div>{isEdit && <DeleteInspection inspection={inspection!} />}</div>
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center mt-8 px-2"
        >
          <div className="grid grid-cols-1  gap-6 mt-1 mb-7 w-full max-w-[900px]">
            <div className="space-y-8 ">
              <div>
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-slate-100 border-slate-300">
                            <SelectValue
                              className="text-red-500"
                              placeholder="Selecciona la ciudad del colaborador"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="barranquilla">
                            Barranquilla
                          </SelectItem>
                          <SelectItem value="bogota">Bogotá</SelectItem>
                          <SelectItem value="cartagena">Cartagena</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="ml-6 text-[0.8rem] text-red-500 font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de ejecución</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-slate-100",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(
                                  new Date(field.value),
                                  "dd 'de' LLLL 'de' y",
                                  { locale: es }
                                )
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            // disabled={(date) =>
                            //   date > new Date() || date < new Date("1900-01-01")
                            // }
                            initialFocus
                            locale={es}
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isEdit && (
                <div>
                  <FormField
                    control={form.control}
                    name="isExecuted"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel
                          className="font-bold"
                          htmlFor="evaluationPass"
                        >
                          ¿Ejecutada?
                        </FormLabel>
                        <div
                          //  onClick={() => handleEvaluation(!!!field.value)}
                          className={cn(
                            "w-full h-11 flex gap-3 justify-between items-center bg-slate-100 space-y-0 rounded-md border p-4 hover:cursor-pointer",
                            field.value && "bg-green-600"
                          )}
                        >
                          <div className="flex gap-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value || false}
                                // onCheckedChange={field.onChange}
                                onCheckedChange={(e) => handleEvaluation(e)}
                                className={cn("")}
                              />
                            </FormControl>
                            <span
                              className={cn(
                                "text-zinc-900 font-bold",
                                field.value && "text-white"
                              )}
                            >
                              {field.value ? "Sí" : "No"}
                            </span>
                          </div>
                          <div className=" space-y-1 leading-none flex justify-between">
                            <FormDescription
                              className={`${field.value && "text-white"}`}
                            >
                              {!field.value ? (
                                <span className="w-full flex gap-3 justify-between">
                                  {" "}
                                  Aún no ha sido ejecutada
                                  <X className="w-5 h-5 text-red-400" />{" "}
                                </span>
                              ) : (
                                <span className="w-full flex gap-3 justify-between">
                                  Ya fue ejecutada
                                  <Check className="w-5 h-5" />{" "}
                                </span>
                              )}
                            </FormDescription>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </div>

          <Button
            disabled={isSubmitting || !isValid}
            className="w-full max-w-[500px] gap-3"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEdit ? "Actualizar" : "Crear"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
