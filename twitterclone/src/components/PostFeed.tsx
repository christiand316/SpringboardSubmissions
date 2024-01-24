"use client";

import Post from "./Post";
import usePostsQuery from "@/lib/hooks/usePosts";

export default function PostFeed() {
  const query = usePostsQuery();

  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }
  return (
    <div>
      {query.isSuccess && (
        <ul className="flex flex-col gap-2">
          {query.data.posts.map((post) => (
            <li key={post.id}>
              <Post postId={post.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
