"use client";

import { useMemo, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collaborator } from "@prisma/client";
import {
  CalendarIcon,
  Loader2,
  ThumbsUp,
  UserCog,
  UserPlus,
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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

interface AddCollaboratorFormProps {
  collaborator?: Collaborator | null;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nombre requerido",
  }),
  lastname: z.string().min(1, {
    message: "Apellido requerido",
  }),
  docType: z.string().min(1, {
    message: "Tipo de documento requerido",
  }),
  numDoc: z.string().min(1, {
    message: "Número de documento requerido",
  }),
  city: z.string().min(1, {
    message: "Ciudad requerida",
  }),
  startDate: z.date().or(z.string()),
  endDate: z.date().or(z.string()),
  percentage: z.number().min(0).max(100, {
    message: "Porcentaje debe ser un número entre 0 y 100",
  }),
  // evaluationPass: z.boolean().default(false),
});

export const AddCollaboratorForm = ({
  collaborator,
}: AddCollaboratorFormProps) => {
  const router = useRouter();
  const isEdit = useMemo(() => collaborator, [collaborator]);
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
      name: collaborator?.name || "",
      lastname: collaborator?.lastname || "",
      docType: collaborator?.docType || "",
      numDoc: collaborator?.numDoc || "",
      city: collaborator?.city || "",
      startDate: collaborator?.startDate || undefined,
      endDate: collaborator?.endDate || undefined,
      percentage: collaborator?.percentage || 0,
      // evaluationPass: !!collaborator?.evaluationPass || false,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const { setValue, setError } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEdit) {
        await axios.patch(`/api/collaborators/${collaborator?.id}`, values);
        toast.success("Colaborador actualizado");
      } else {
        const { data } = await axios.post(`/api/collaborators/`, values);
        console.log({ data });
        toast.success("Colaborador creado");
      }
      router.push(`/admin/colaboradores`);
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

  const handleDate = (e: DateRange) => {
    if (!e) return;
    setDate(e);
    setValue("startDate", e.from!, { shouldValidate: true });
    setValue("endDate", e.to!, { shouldValidate: true });
    return true;
  };

  // const handleEvaluation = (e: CheckedState) => {
  //   setValue("evaluationPass", !!e);
  // }

  return (
    <div className=" max-w-[1500px] mx-auto bg-white rounded-md shadow-sm overflow-hidden p-3">
      <div className="flex justify-between items-center gap-x-2 bg-white">
        <div className="flex items-center">
          <IconBadge icon={isEdit ? UserCog : UserPlus} />
          <h2 className="text-2xl font-semibold">
            {isEdit ? (
              <>
                <p>
                  Editar usuario:{" "}
                  <span className="font-normal">
                    {collaborator?.name} {collaborator?.lastname}
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold" htmlFor="name">
                        Nombres
                      </FormLabel>

                      <FormControl>
                        <Input id="name" disabled={isSubmitting} {...field} />
                      </FormControl>
                      <FormMessage className="ml-6 text-[0.8rem] text-red-500 font-medium" />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold" htmlFor="lastname">
                        Apellidos
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="lastname"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="ml-6 text-[0.8rem] text-red-500 font-medium" />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="docType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de documento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-slate-100 border-slate-300">
                            <SelectValue
                              className="text-red-500"
                              placeholder="Selecciona el tipo de documento"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CC">
                            Cédula de Ciudadanía
                          </SelectItem>
                          <SelectItem value="CE">
                            Cédula de Extranjería
                          </SelectItem>
                          <SelectItem value="TI">
                            Tarjeta de Identidad
                          </SelectItem>
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
                />
              </div>
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
                          <SelectItem value="medellin">Medellín</SelectItem>
                          <SelectItem value="cartagena">Cartagena</SelectItem>
                          <SelectItem value="leticia">Leticia</SelectItem>
                          <SelectItem value="arauca">Arauca</SelectItem>
                          <SelectItem value="tunja">Tunja</SelectItem>
                          <SelectItem value="manizales">Manizales</SelectItem>
                          <SelectItem value="florencia">Florencia</SelectItem>
                          <SelectItem value="yopal">Yopal</SelectItem>
                          <SelectItem value="popayan">Popayán</SelectItem>
                          <SelectItem value="valledupar">Valledupar</SelectItem>
                          <SelectItem value="quibdo">Quibdó</SelectItem>
                          <SelectItem value="monteria">Montería</SelectItem>
                          <SelectItem value="bogota">Bogotá</SelectItem>
                          <SelectItem value="inirida">Inírida</SelectItem>
                          <SelectItem value="sanjosedelguaviare">
                            San José del Guaviare
                          </SelectItem>
                          <SelectItem value="cartagena">Neiva</SelectItem>
                          <SelectItem value="riohacha">Riohacha</SelectItem>
                          <SelectItem value="santamarta">
                            Santa Marta
                          </SelectItem>
                          <SelectItem value="cartagena">
                            Villavicencio
                          </SelectItem>
                          <SelectItem value="pasto">Pasto</SelectItem>
                          <SelectItem value="cucuta">Cúcuta</SelectItem>
                          <SelectItem value="mocoa">Mocoa</SelectItem>
                          <SelectItem value="armenia">Armenia</SelectItem>
                          <SelectItem value="pereira">Pereira</SelectItem>
                          <SelectItem value="sanandres">San Andrés</SelectItem>
                          <SelectItem value="bucaramanga">Bucaramanga</SelectItem>
                          <SelectItem value="sincelejo">Sincelejo</SelectItem>
                          <SelectItem value="ibague">Ibagué</SelectItem>
                          <SelectItem value="cali">Cali</SelectItem>
                          <SelectItem value="mitu">Mitú</SelectItem>
                          <SelectItem value="puertocarreño">
                            Puerto Carreño{" "}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="ml-6 text-[0.8rem] text-red-500 font-medium" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <div className="mb-3 ">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold">
                        Fechas de formación
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "h-11 w-full justify-start text-left font-normal bg-slate-100 hover:bg-slate-200",
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
                            onSelect={(e) => handleDate(e!)}
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

              <div className="mb-3 ">
                <FormField
                  control={form.control}
                  name="percentage"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold" htmlFor="percentage">
                        Porcentaje de formacion
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
              {/* <div>
                <FormField
                  control={form.control}
                  name="evaluationPass"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold" htmlFor="evaluationPass">
                        Evaluacion{" "}
                      </FormLabel>
                      <div
                        // onClick={() =>
                        //   handleEvaluation(!!!(field.value))
                        //   }
                        className={cn(
                          "w-full h-11 flex gap-3 justify-between items-center bg-slate-100 space-y-0 rounded-md border p-4 hover:cursor-pointer",
                          field.value && "bg-green-600"
                        )}
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            // onCheckedChange={field.onChange}
                            onCheckedChange={(e) => handleEvaluation(e)}
                            className={cn("")}
                          />
                        </FormControl>
                        <div className=" space-y-1 leading-none flex justify-between">
                          <FormDescription
                            className={`${field.value && "text-white"}`}
                          >
                            {!field.value ? (
                              <span className="w-full flex gap-3 justify-between">
                                {" "}
                                Sin pasar evaluación final{" "}
                                <X className="w-5 h-5 text-red-400" />{" "}
                              </span>
                            ) : (
                              <span className="w-full flex gap-3 justify-between">
                                Ha logrado pasar la evaluación final
                                <Check className="w-5 h-5" />{" "}
                              </span>
                            )}
                          </FormDescription>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div> */}
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
