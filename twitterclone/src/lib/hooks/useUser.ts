"use client";

import { getUser } from "@/actions/user/getUser";
import { useQuery } from "@tanstack/react-query";

export default function useUserQuery(userId: number, { enabled = true }: { enabled: boolean }) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const result = await getUser(userId);
      if (result.success) {
        return result.data;
      }
      throw new Error("Failed to fetch user");
    },
    enabled: enabled,
  });
}
