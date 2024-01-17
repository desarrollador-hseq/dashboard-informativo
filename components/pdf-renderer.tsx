"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { toast } from "sonner";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp, Loader2, RotateCw } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import SimpleBar from "simplebar-react";
import PdfFullscreen from "./pdf-fullscreen";
import "simplebar-react/dist/simplebar.min.css";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [file, setFile] = useState<string | undefined>();

  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedScale !== scale;
  const { width, ref, height } = useResizeDetector();

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page));
    setValue("page", String(page));
  };

  useEffect(() => {
    if(url) {
      const getPdf = async () => {
        const response = await axios.get(url,  {
          responseType: 'arraybuffer',
          headers: {
            'Access-Control-Allow-Origin': 'https://dashboard.grupohseq.com/',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setFile(pdfUrl)
      }
      getPdf()
    }
  }, [url])
  

  return (
    <div className="w-full min-w-fit bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14  w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5  justify-center">
          <Button
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue("page", String(currPage - 1));
            }}
            variant="ghost"
            aria-label="previous page"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              className={cn(
                "w-12 h-8",
                errors.page && "focus-visible:ring-red-500"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
            />
            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPages ?? "x"}</span>
            </p>
          </div>

          <Button
            disabled={numPages === undefined || currPage === numPages}
            onClick={() => {
              setCurrPage((prev) =>
                prev + 1 > numPages! ? numPages! : prev + 1
              );
              setValue("page", String(currPage + 1));
            }}
            variant="ghost"
            aria-label="next page"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-x-2">
          {/* <Button
            type="button"
            onClick={() => setRotation((prev) => prev + 90)}
            variant="ghost"
            aria-label="rotate 90 degrees"
          >
            <RotateCw className="h-4 w-4" />
          </Button> */}

          <PdfFullscreen fileUrl={url} />
        </div>
      </div>

      <div className="flex w-full min-w-min max-h-fit">
        <SimpleBar
          autoHide={false}
          className="max-h-[calc(100vh-10rem)] min-w-full"
        >
          <div ref={ref} className="min-w-full">
            {file ? <Document
              externalLinkRel=""
              loading={
                <div className="flex justify-center w-full">
                  <Loader2 className="my-24 h-6 w-6 animate-spin text-primary" />
                </div>
              }
              onError={() => {
                toast.error("Error al cargar PDF", {
                  description: "Por favor intentelo nuevamente",
                });
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={file}
              className="max-h-fit"
            >
              {isLoading && renderedScale ? (
                <Page
                  width={width}
                  height={height}
                  pageNumber={currPage}
                  rotate={rotation}
                  key={"@" + renderedScale}
                  className={`w-[${width}] max-h-[600px]`}
                />
              ) : null}
              <Page
                className={cn(
                  `w-[${width}] max-h-[600px]`,
                  isLoading ? "hidden" : ""
                )}
                width={width}
                height={height}
                pageNumber={currPage}
                rotate={rotation}
                key={"@" + scale}
                loading={
                  <div className="flex justify-center ">
                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document> : <Loader2 className="w-5 h-5 animate-spin" />}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfRenderer;
