"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import PdfRenderer from "@/components/pdf-renderer";

interface ImageFormProps {
  CollaboratorId: string;
  url?: string | null;
}

const formSchema = z.object({
  pdfUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const PdfForm = ({ CollaboratorId, url }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/collaborators/${CollaboratorId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Evaluación
        <Button type="button" onClick={toggleEdit} variant="outline" className="hover:bg-slate-500 hover:text-white">
          {isEditing && <>Cancelar</>}
          {!isEditing && !url && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar
            </>
          )}
          {!isEditing && url && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Actualizar
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!url ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className="my-2 w-full max-w-[300px] h-fit flex">
            <PdfRenderer url={url} />
            <div className="h-full flex items-center">
              <Button  >descargar</Button>
            </div>
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="collaboratorPdf"
            onChange={(url) => {
              if (url) {
                onSubmit({ pdfUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            El archivo debe pesar menos de 1MB en formato PDF
          </div>
        </div>
      )}
    </div>
  );
};
