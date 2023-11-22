"use client";

import { ReactNode } from "react";

import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TableProperties } from "lucide-react";

interface ConfirmModalProps {
  children: ReactNode;
  title?: string
}

export const ShowTableModal = ({ children, title }: ConfirmModalProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button> <TableProperties className="w-5 h-5 mr-2" />  resumen</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Resumen de{title ? ` ${title}` : " datos"} </AlertDialogTitle>
          </AlertDialogHeader>
            <AlertDialogDescription className="w-full">
            </AlertDialogDescription>
              <span className="w-full">{children}</span>
          <AlertDialogFooter>
            <AlertDialogCancel asChild className="flex justify-end items-end">
                <Button variant="outline">Cerrar</Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
