"use client";

import { getPost } from "@/actions/post/getPost";
import { useQuery } from "@tanstack/react-query";

export default function usePostQuery(postId: number) {
  const query = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const result = await getPost(postId);
      if (result.success) {
        return result.data;
      }
      throw new Error("Failed to fetch post");
    },
  });
  return query;
}
