"use client";

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
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inspection, Report } from "@prisma/client";
import {
  CalendarIcon,
  Check,
  ClipboardEditIcon,
  FilePlus,
  Loader2,
  ThumbsUp,
  UserCog,
  UserPlus,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { addDays, format } from "date-fns";
import { cn, formatDate } from "@/lib/utils";

import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckedState } from "@radix-ui/react-checkbox";

interface AddInspectionFormProps {
  report?: Report | null;
}

const formSchema = z.object({
  deliveryDate: z.date().or(z.string()),
  conformity: z.boolean().default(false),
});

export const AddReportForm = ({ report }: AddInspectionFormProps) => {
  const router = useRouter();
  const isEdit = useMemo(() => report, [report]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryDate: report?.deliveryDate || "",
      conformity: report?.conformity || false,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const { setValue, setError } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEdit) {
        await axios.patch(`/api/reports/${report?.id}`, values);
        toast.success("informe actualizado");
      } else {
        const { data } = await axios.post(`/api/reports/`, values);
        toast.success("informe registrado");
      }
      router.push(`/admin/informes/`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error inesperado");
    }
  };

  const handleEvaluation = (e: CheckedState) => {
    setValue("conformity", !!e);
  };

  return (
    <div className=" max-w-[1500px] mx-auto">
      <div className="flex items-center gap-x-2">
        <IconBadge icon={isEdit ? ClipboardEditIcon : FilePlus} />
        <h2 className="text-2xl font-semibold">
          {isEdit ? (
            <p>
              Editar Informe:{" "}
              <span className="font-normal">
                {formatDate(report?.deliveryDate!)}
              </span>
            </p>
          ) : (
            "Registrar informe"
          )}
        </h2>
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center mt-8 "
        >
          <div className="grid grid-cols-1  gap-6 mt-1 mb-7 w-full max-w-[900px]">
            <div className="space-y-8 ">
   
              <div>
                <FormField
                  control={form.control}
                  name="deliveryDate"
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
                                format(new Date(field.value),  "dd 'de' LLLL 'de' y", { locale: es })
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

             {
              isEdit && (
                <div>
                <FormField
                  control={form.control}
                  name="conformity"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold" htmlFor="evaluationPass">
                        ¿Conformidad?
                      </FormLabel>
                      <div
                        // onClick={() => handleEvaluation(!!!field.value)}
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
                          <span>{field.value ? "Sí" : "No"}</span>
                          </div>
                        <div className=" space-y-1 leading-none flex justify-between">
                          <FormDescription
                            className={`${field.value && "text-white"}`}
                          >
                            {!field.value ? (
                              <span className="w-full flex gap-3 justify-between">
                                {" "}
                              sin conformidad
                                <X className="w-5 h-5 text-red-400" />{" "}
                              </span>
                            ) : (
                              <span className="w-full flex gap-3 justify-between">
                                informe aceptado
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
              )
             }
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
