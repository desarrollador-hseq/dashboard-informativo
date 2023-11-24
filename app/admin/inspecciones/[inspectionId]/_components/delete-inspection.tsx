
import { DeleteConfirm } from "@/app/admin/_components/modal/delete-confirm";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Inspection } from "@prisma/client";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteInspectionProps {
  inspection: Inspection;
}

export const DeleteInspection = ({
  inspection,
}: DeleteInspectionProps) => {
    const router = useRouter()
    const [isLoading, setisLoading] = useState(false);

  const onConfirm = async () => {
    setisLoading(true);
    try {
         await axios.delete(`/api/inspections/${inspection.id}`)
        toast.success("Colaborado eliminado")
        router.push("/admin/inspecciones/")
        // router.refresh()
    } catch (error) {
        toast.error("ocurrió un error al momento de eliminar la inspección")
    } finally {
        router.refresh()
        setisLoading(false);
    }
  };

  const title =  <p className="font-normal inline">la inspección con fecha:  <span className="font-bold "> {formatDate(inspection.date).toString()} en {inspection.city}</span></p>;
  
  console.log({inspection})
  
  return (
    <div>
      <DeleteConfirm onConfirm={onConfirm} title={title}>
        <Button disabled={isLoading} variant="destructive">
          <Trash2 className="w-5 h-5" />
        </Button>
      </DeleteConfirm>
    </div>
  );
};
