import { getPosts } from "@/actions/post/getPosts";
import Post from "@/components/Post";

type UserFeedProps = {
  userId: number;
};

export default async function UserFeed({ userId }: UserFeedProps) {
  const posts = await getPosts({ fromUserId: userId });
  if (!posts.success) {
    return <div>Error fetching {userId} posts</div>;
  }
  return (
    <div>
      <ul className="flex flex-col gap-2">
        {posts.data.posts.map((post) => (
          <li key={post.id}>
            <Post postId={post.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
