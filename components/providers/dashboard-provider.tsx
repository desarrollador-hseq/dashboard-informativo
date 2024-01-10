"use client";

import axios from "axios";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

interface DashboardProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  threshold: number | undefined;
}

interface Props {
  children: ReactNode;
}

export const DashboardContext = createContext<DashboardProps>({
  date: undefined,
  setDate: (date) => {},
  threshold: undefined,
});

export const DashboardProvider = ({ children }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [threshold, setThreshold] = useState<number>();

  useEffect(() => {
    const getTreshold = async () => {
      const { data } = await axios.get("/api/parameters/formation");
      setThreshold(data?.threshold || 1);
    };
    getTreshold();
  }, []);


  return (
    <DashboardContext.Provider value={{ date, setDate, threshold }}>
      <>{children}</>
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
