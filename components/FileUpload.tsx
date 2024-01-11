"use client";

import { toast } from "sonner";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { FileUp } from "lucide-react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUploadd = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      content={
       {label: "Subir archivo en formato PDF", allowedContent: "El tamaño maximo es de (1) MB", button: "Guardar"}
      }
      appearance={{
        button: "bg-emerald-600 w-52"
      }}
      className="text-secondary/70 p-3"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error.message}`);
      }}
    ></UploadDropzone>
  );
};
