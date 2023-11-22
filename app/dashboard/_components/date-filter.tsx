"use client";

import { useDashboard } from "@/components/providers/dashboard-provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";

import { Calendar as CalendarIcon, Eraser } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const DateFilter = () => {
  const { date, setDate } = useDashboard();
  const [dateSelected, setDateSelected] = useState<DateRange | undefined>(
    undefined
  );
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    if (!calendarOpen) {
      if (dateSelected?.from !== undefined && dateSelected.to !== undefined) {
        setDate(dateSelected);
      } else {
        setDate(undefined);
        setDateSelected(undefined);
      }
    }
  }, [calendarOpen, dateSelected, setDate]);

  const handleClearInputCalendar = () => {
    setCalendarOpen(false);
    setDateSelected(undefined);
    setDate(undefined);
  };

  return (
    <div className="flex items-start gap-2">
      <Button
        onClick={handleClearInputCalendar}
        variant="default"
        className={cn(`w-10 p-0 rounded-full`, !!!date && "hidden")}
      >
        <Eraser className="w-7 h-5" />
      </Button>

      <div className="mb-3 ">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "h-11 w-full justify-start text-left font-normal bg-slate-100",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <span className="font-bold">
                    {format(date.from, "dd LLLL y", {
                      locale: es,
                    })}{" "}
                    - {format(date.to, "dd LLLL y", { locale: es })}
                  </span>
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
              selected={dateSelected}
              onSelect={setDateSelected}
              numberOfMonths={2}
              locale={es}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
