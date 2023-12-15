import { useState } from "react";
import { Document, Page } from "react-pdf";
import { Expand, Loader2, X } from "lucide-react";
import SimpleBar from "simplebar-react";
import { toast } from "sonner";
import { useResizeDetector } from "react-resize-detector";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

interface PdfFullscreenProps {
  fileUrl: string;
}

const PdfFullscreen = ({ fileUrl }: PdfFullscreenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();

  const { width, ref } = useResizeDetector();

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <AlertDialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button variant="ghost" className="gap-1.5" aria-label="fullscreen">
          <Expand className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-7xl w-full overflow-y-auto">
        <div>
          <Button variant="destructive" className=" absolute top-0 right-0" onClick={() => setIsOpen(false)}>
            <X className="w-3 h-3 text-white" />
          </Button>

          <SimpleBar
            autoHide={false}
            className="max-h-[calc(100vh-10rem)] mt-6"
          >
            <div ref={ref} className="">
              <Document
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 h-6 w-6 animate-spin text-primary" />
                  </div>
                }
                
                onLoadError={() => {
                  toast("Error al cargar PD", {
                    description: "Por favor intentelo nuevamente",
                  });
                }}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                file={fileUrl}
                className="overflow-hidden"
              >
                {new Array(numPages).fill(0).map((_, i) => (
                  <Page key={i} width={width ? width : 1} pageNumber={i + 1} />
                ))}
              </Document>
            </div>
          </SimpleBar>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PdfFullscreen;
