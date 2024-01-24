"use client";

import { createContext, useContext, useState } from "react";

export type GenericItem = {
  id: string;
  name: string;
  description: string;
};

export type DataProviderEntry = {
  data: GenericItem[];
  setData: (data: GenericItem[]) => void;
};

export type DataProviderType = {
  food: {
    data: GenericItem[];
    setData: (data: GenericItem[]) => void;
  };
  drinks: {
    data: GenericItem[];
    setData: (data: GenericItem[]) => void;
  };
};

export type DPTIndex = keyof DataProviderType;

const DataProvider = createContext<DataProviderType | null>(null);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [food, setFood] = useState<GenericItem[]>([
    {
      id: "1",
      name: "Pizza",
      description: "A delicious pizza",
    },
    {
      id: "2",
      name: "Pasta",
      description: "A delicious pasta",
    },
  ]);
  const [drinks, setDrinks] = useState<GenericItem[]>([
    {
      id: "1",
      name: "Coke",
      description: "A delicious coke",
    },
    {
      id: "2",
      name: "Fanta",
      description: "A delicious fanta",
    },
  ]);

  return (
    <DataProvider.Provider
      value={{
        food: { data: food, setData: setFood },
        drinks: { data: drinks, setData: setDrinks },
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}

export function useDataCtx() {
  const ctx = useContext(DataProvider);
  if (!ctx) {
    throw new Error("No data provider found");
  }
  return ctx;
}
