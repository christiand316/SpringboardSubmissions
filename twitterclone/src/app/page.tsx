import MakePost from "@/components/MakePost";
import Post from "@/components/Post";
import PostFeed from "@/components/PostFeed";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="pt-8">
      <div className="py-4">
        <MakePost />
        <PostFeed />
      </div>
    </div>
  );
}
