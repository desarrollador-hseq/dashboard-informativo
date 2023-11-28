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
import { TableProperties, X } from "lucide-react";

interface ConfirmModalProps {
  children: ReactNode;
  title?: string;
}

export const ShowTableModal = ({ children, title }: ConfirmModalProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-secondary ">
            <TableProperties className="w-5 h-5 mr-2" /> Resumen
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent
          className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
        >
          <AlertDialogCancel asChild className="absolute top-7 right-7 flex w-full justify-end items-end">
            <Button className="w-fit h-fit flex rounded-md bg-primary hover:bg-red-800/80 justify-center items-center p-1" variant="outline">
              <X className="text-white"/>
            </Button>
          </AlertDialogCancel>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Resumen de{title ? ` ${title}` : " datos"}{" "}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="w-full"></AlertDialogDescription>
          <span className="w-full">{children}</span>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
