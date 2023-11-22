"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

interface DashboardProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
}

interface Props {
  children: ReactNode;
}

export const DashboardContext = createContext<DashboardProps>({
  date: undefined,
  setDate: (date) => {},
});

export const DashboardProvider = ({ children }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  return (
    <DashboardContext.Provider value={{ date, setDate }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
