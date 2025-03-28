"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { City, Collaborator } from "@prisma/client";
import {
  Backpack,
  CalendarIcon,
  Loader2,
  ThumbsUp,
  User,
  UserPlus,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconBadge } from "@/components/ui/icon-badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteCollaborator } from "./delete-collaborator";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { FormattedNumberInput } from "./formatted-input-form";

interface AddCollaboratorFormProps {
  collaborator?: Collaborator | null;
  cities: City[];
}

const formSchema = z.object({
  fullname: z.string().min(1, {
    message: "Nombre requerido",
  }),
  numDoc: z.string().min(1, {
    message: "Número de documento requerido",
  }),
  cityId: z.string().min(1, "Seleccione una ciudad"),
  startDate: z.date().or(z.string()),
  endDate: z.date().or(z.string()),
  percentage: z.number().min(0).max(100, {
    message: "Porcentaje debe ser un número entre 0 y 100",
  }),
  certificateUrl: z.string().optional(),
  isVirtual: z.boolean().default(false),
  byArl: z.boolean().default(false),
  // evaluationPass: z.boolean().default(false),
});

export const AddCollaboratorForm = ({
  collaborator,
  cities,
}: AddCollaboratorFormProps) => {
  const router = useRouter();
  const isEdit = useMemo(() => collaborator, [collaborator]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: collaborator ? collaborator.startDate : undefined,
    to: collaborator ? collaborator.endDate : addDays(new Date(), 1),
  });

  if (isEdit && !collaborator) {
    router.replace("/admin/colaboradores/");
    toast.error("Colaborador no encontrado, redirigiendo...");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: collaborator?.fullname || "",
      numDoc: collaborator?.numDoc
        ? new Intl.NumberFormat("es-ES").format(
            Number(collaborator.numDoc.toString().replace(/\./g, ""))
          )
        : "",
      cityId: collaborator?.cityId || "",
      startDate: collaborator?.startDate || undefined,
      endDate: collaborator?.endDate || undefined,
      percentage: collaborator?.percentage || 0,
      certificateUrl: collaborator?.certificateUrl || undefined,
      isVirtual: collaborator?.isVirtual || undefined,
      byArl: collaborator?.byArl || undefined,
      // evaluationPass: !!collaborator?.evaluationPass || false,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const { setValue, setError } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { fullname, numDoc, ...valuesRes } = values;
    const fullnameClean = fullname.trim();
    const numDocClean = numDoc.replaceAll(".", "").trim();
    setValue("fullname", fullnameClean, { shouldValidate: true });
    setValue("numDoc", numDocClean, { shouldValidate: true });
    try {
      if (isEdit) {
        await axios.patch(`/api/collaborators/${collaborator?.id}`, {
          ...valuesRes,
          fullname: fullnameClean,
          numDoc: numDocClean,
        });
        toast.success("Colaborador actualizado");
      } else {
        const { data } = await axios.post(`/api/collaborators/`, values);
        router.push(`/admin/colaboradores/${data.id}`);
        toast.success("Colaborador creado");
      }
      // router.push(`/admin/colaboradores`);
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverResponse = error.response;
        if (serverResponse && serverResponse.status === 400) {
          const errorMessage = serverResponse.data;
          if (
            typeof errorMessage === "string" &&
            errorMessage.includes("Número de documento ya registrado")
          ) {
            setError("numDoc", {
              type: "manual",
              message: "Número de documento ya registrado",
            });
          } else {
            toast.error(errorMessage);
          }
        } else {
          toast.error("Ocurrió un error inesperado");
        }
      } else {
        console.error(error);
        toast.error("Ocurrió un error inesperado");
      }
    }
  };

  useEffect(() => {
    if (date?.from !== undefined && date.to !== undefined) {
      setValue("startDate", date.from!, { shouldValidate: true });
      setValue("endDate", date.to!, { shouldValidate: true });
    }
  }, [calendarOpen, setDate, date?.from, date?.to, setValue]);

  const handleCityChange = (event: string) => {
    const selectedCityId = event;
    setValue("cityId", selectedCityId, { shouldValidate: true });
  };

  const handleEvaluation = (e: CheckedState) => {
    setValue("isVirtual", !!e, { shouldValidate: true });
  };
  const handleArl = (e: CheckedState) => {
    setValue("byArl", !!e, { shouldValidate: true });
  };
  return (
    <div className="max-w-[1500px] h-full mx-auto bg-white rounded-md shadow-sm overflow-y-hidden p-3 ">
      <div className="flex justify-between items-center gap-x-2 bg-white">
        <div className="flex items-center">
          <IconBadge icon={isEdit ? User : UserPlus} />
          <h2 className="text-2xl font-semibold">
            {isEdit ? (
              <>
                <p>
                  Editar usuario:{" "}
                  <span className="font-semibold text-lg text-primary/70">
                    {collaborator?.fullname}
                  </span>
                </p>
              </>
            ) : (
              "Crear colaborador"
            )}
          </h2>
        </div>

        {isEdit && <DeleteCollaborator collaborator={collaborator!} />}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center mt-8 p-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1 mb-7 w-full">
            <div className="space-y-4">
              <div>
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold" htmlFor="fullName">
                        Nombre completo
                      </FormLabel>

                      <FormControl>
                        <Input
                          id="fullName"
                          disabled={isSubmitting}
                          className="text-lg font-semibold"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="ml-6 text-[0.8rem] text-red-500 font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                {/* <FormField
                  control={form.control}
                  name="numDoc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold" htmlFor="numDoc">
                        Número de documento
                      </FormLabel>
                      <FormControl>
                        <Input id="numDoc" disabled={isSubmitting} {...field} />
                      </FormControl>
                      <FormMessage className="ml-6 text-[0.8rem] text-red-500 font-medium" />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="numDoc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Cédula</FormLabel>
                      <FormControl>
                        <FormattedNumberInput
                          field={field}
                          className="text-lg font-semibold"
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
                  name="cityId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <Select
                        onValueChange={(e) => handleCityChange(e)}
                        defaultValue={
                          field.value ? field.value.toString() : undefined
                        }
                      >
                        <FormControl>
                          <SelectTrigger className="bg-slate-100 border-slate-300 text-lg font-semibold">
                            <SelectValue
                              className="text-red-500"
                              placeholder="Selecciona la ciudad del colaborador"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem
                              key={city.id}
                              value={city.id.toString()}
                              className="text-lg font-semibold"
                            >
                              {city.realName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="ml-6 text-[0.8rem] text-red-500 font-medium" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold">
                        Fechas de formación
                      </FormLabel>
                      <Popover
                        open={calendarOpen}
                        onOpenChange={setCalendarOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "h-11 w-full justify-start text-left bg-slate-100 hover:bg-slate-200 text-lg font-semibold",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "dd LLLL y", {
                                    locale: es,
                                  })}{" "}
                                  -{" "}
                                  {format(date.to, "dd LLLL y", { locale: es })}
                                </>
                              ) : (
                                format(date.from, "dd LLLL y", { locale: es })
                              )
                            ) : (
                              <span>Selecciona un rango de fechas</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={new Date()}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                            locale={es}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="ml-6 text-[0.8rem] text-red-500 font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-6 flex border-2 p-2 gap-2">
                {/* <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="isVirtual"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel
                          className="font-bold"
                          htmlFor="evaluationPass"
                        >
                          ¿Modalidad virtual?
                        </FormLabel>
                        <div
                          // onClick={() => handleEvaluation(!!!field.value)}
                          className={cn(
                            "w-full h-11 flex gap-3 justify-between items-center bg-slate-100 space-y-0 rounded-md border p-4 hover:cursor-pointer",
                            field.value && "bg-blue-600"
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
                                "font-semibold text-sm",

                                field.value && "text-white"
                              )}
                            >
                              {field.value
                                ? "La formación es virtual"
                                : "La Formación no es virtual"}
                            </span>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div> */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="byArl"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel
                          className="font-bold"
                          htmlFor="evaluationPass"
                        >
                          ¿Por ARL?
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
                                onCheckedChange={(e) => handleArl(e)}
                                className={cn("")}
                              />
                            </FormControl>
                            <span
                              className={cn(
                                "font-semibold text-sm",
                                field.value && "text-white"
                              )}
                            >
                              {field.value
                                ? "Este colaborador está por ARL"
                                : "Este colaborador no está por ARL"}
                            </span>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="mb-3">
                {isEdit && (
                  <div>
                    <FormField
                      control={form.control}
                      name="percentage"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-bold" htmlFor="percentage">
                            % Nota de evaluación
                          </FormLabel>
                          <div className="flex gap-3 items-center space-x-3 space-y-0 rounded-md border bg-slate-100 p-4">
                            <FormControl>
                              <Slider
                                id="percentage"
                                defaultValue={[field.value]}
                                max={100}
                                step={10}
                                className={cn("w-full accent-slate-100")}
                                onValueChange={(vals) => {
                                  field.onChange(vals[0]);
                                }}
                                color="red"
                              />
                            </FormControl>
                            {field.value === 100 ? (
                              <ThumbsUp className="w-6 h-6 text-green-600" />
                            ) : (
                              <span className="font-bold">{field.value}%</span>
                            )}
                          </div>
                          <FormMessage className="ml-6 text-[0.8rem] text-red-500 font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
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
