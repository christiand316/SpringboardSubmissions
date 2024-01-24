"use client";

import { getPosts } from "@/actions/post/getPosts";
import { useQuery } from "@tanstack/react-query";

export default function usePostsQuery() {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const result = await getPosts();
      if (result.success) {
        return result.data;
      }
      throw new Error("Failed to fetch post");
    },
  });
  return query;
}
