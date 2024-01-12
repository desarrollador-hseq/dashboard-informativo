"use client";

import PdfRenderer from "@/components/pdf-renderer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Cloud,
  File,
  ImageIcon,
  Loader2,
  Pencil,
  PlusCircle,
  UploadCloud,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ModalImage from "react-modal-image";
import { toast } from "sonner";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { Progress } from "./ui/progress";

interface fileFormProps {
  file?: string | null;
  apiUrl: string;
  field: string;
  label: string;
  ubiPath: string;
}
const MAX_FILE_SIZE = 1024 * 1024 * 1;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
const formSchema = z.object({
  file: z
    .any()
    .or(z.string())
    .refine((file) => file?.length !== 0, "File is required")
    .refine((files) => {
      return files?.size <= MAX_FILE_SIZE;
    }, `El tamaño maximo del archivo es de 1MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
      "Solo los formtatos de .jpg, .jpeg, .png, y .pdf son aceptados"
    ),
});

export const FileUploadForm = ({
  file,
  apiUrl,
  field,
  label,
  ubiPath,
}: fileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  const [isUploading, setIsUploading] = useState<boolean | null>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progressInterval, setProgressInterval] = useState<any | null>();

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
      // Handle file upload logic here
    },
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".svg"],
      "application/pdf": [".pdf"],
    },
  });

  useEffect(() => {
    if (selectedFile) {
      setValue("file", selectedFile, { shouldValidate: true });
    }
  }, [selectedFile]);

  const fileExt: string | undefined = file ? file?.split(".").pop() : undefined;

  const isPdf = useMemo(() => fileExt === "pdf", [fileExt]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [field]: file || undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const { setValue } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("field", field);
    formData.append("ubiPath", ubiPath);

    const progressInterval = startSimulatedProgress();
    try {
      await new Promise((resolve) => setTimeout(resolve, 6000));

      await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Documento actualizado");
      setUploadProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toggleEdit();
      router.refresh();
    } catch (e) {
      toast.error(
        "Ocurrió un error inesperado, por favor intentelo nuevamente"
      );
    } finally {
      clearInterval(progressInterval);
      setUploadProgress(0);
      setIsUploading(false);
    }
  };

  const startSimulatedProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <div className="mt-6 bg-slate-50 rounded-md p-4 border-4 border-primary/20  overflow-hidden">
      <div className="font-medium flex items-center justify-between">
        {label}
        <Button
          onClick={toggleEdit}
          variant="secondary"
          className={cn(
            "text-white",
            isEditing && "bg-slate-500 hover:bg-slate-700"
          )}
        >
          {isEditing && <>Cancelar</>}
          {!isEditing && !file && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar
            </>
          )}
          {!isEditing && file && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Actualizar
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!file ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md w-full">
            <ImageIcon className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className="mt-2 min-w-full flex justify-center">
            {isPdf ? (
              <div className="min-w-fit">
                <PdfRenderer url={file} />
              </div>
            ) : (
              <div className="object-cover">
                <ModalImage
                  small={file}
                  large={file}
                  alt={label}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        ))}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={"flex flex-col items-center mt-8 p-2 w-full"}
          >
            <div
              {...getRootProps()}
              className={"dropzone w-full focus:border-red-600"}
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center pt-5 pb-6 mb-3 max-w-full"
                )}
              >
                {uploadProgress !== 100 ? (
                  <div className="flex flex-col gap-3 items-center">
                    <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                    <p className="mb-2 text-sm text-zinc-700">
                      <span className="font-semibold">Click para subir</span> o
                      arrastra el archivo aquí
                    </p>
                    <p className="text-xs text-zinc-500">
                      Formatos aceptados: jpg, jpeg, png y pdf
                    </p>
                    {selectedFile ? (
                      <div className="flex max-w-xs bg-white items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                        <div className="px-3 py-2 h-full grid place-items-center">
                          <File className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="px-3 py-2 h-full text-sm truncate">
                          {selectedFile.name}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <>
                    <p className="mb-2 text-sm font-semibold flex flex-col items-center text-emerald-500">
                      <UploadCloud className="w-16 h-16 " />
                      Archivo subido correctamente
                    </p>
                  </>
                )}
              </div>

              {!!uploadProgress && (
                <Progress
                  indicatorColor={uploadProgress === 100 ? "bg-green-500" : ""}
                  value={uploadProgress}
                  className="h-1 w-full bg-zinc-200"
                />
              )}

              <input {...getInputProps()} />
              {!selectedFile && isDragActive && (
                <p>Haga clic o arrastre un archivo para cargarlo</p>
              )}
            </div>

            <Button
              disabled={isSubmitting || !isValid}
              className="w-full max-w-fit gap-3"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEditing && file ? "Actualizar" : "Subir"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
