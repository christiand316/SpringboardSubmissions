"use client";

import { getUserSession } from "@/actions/auth/getUserSession";
import { PublicUser } from "@/actions/user/userUtil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

export const queryClient = new QueryClient();
const CurrentUserContext = createContext<PublicUser | null>(null);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<PublicUser | null>(null);
  useEffect(() => {
    async function fetchCurrentUser() {
      const response = await getUserSession();
      if (response) {
        setCurrentUser(response);
      }
    }
    fetchCurrentUser();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentUserContext.Provider value={null}>{children}</CurrentUserContext.Provider>
    </QueryClientProvider>
  );
}

export function useCurrentUser() {
  const currentUser = useContext(CurrentUserContext);
  return currentUser;
}
