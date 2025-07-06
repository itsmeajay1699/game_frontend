// src/context/BalanceContext.tsx
import axiosClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
  balance: number;
  setBalance: (newBalance: number) => void;
  isLoading?: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = useState<number>(0);

  return (
    <AppContext.Provider value={{ balance, setBalance }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
