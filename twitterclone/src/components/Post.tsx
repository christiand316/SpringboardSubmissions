"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import usePostQuery from "@/lib/hooks/usePost";
import useUserQuery from "@/lib/hooks/useUser";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikePost } from "@/actions/post/toggleLikePost";
import { queryClient } from "./providers/Provider";
import { cn } from "@/lib/utils";

type PostProps = {
  postId: number;
};

export default function Post({ postId }: PostProps) {
  const postQuery = usePostQuery(postId);
  const authorId = postQuery.data?.post.authorId;
  const authorQuery = useUserQuery(authorId!, { enabled: postQuery.isSuccess });
  const likeMutation = useMutation({
    mutationFn: async () => {
      return toggleLikePost(postId, postQuery.data?.isLiked || false);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
  if (postQuery.isError) {
    return <div>Error fetching post {postId}</div>;
  }
  if (postQuery.isLoading) {
    return <div>Loading...</div>;
  }

  async function handleLikeClick() {
    await likeMutation.mutateAsync();
  }

  return (
    <div>
      <Card className="flex pt-2 px-4">
        <Link href={`/users/${authorId}`}>
          <Avatar className="size-12">
            <AvatarImage src={`https://github.com/shadcn.png`} />
            <AvatarFallback>CAT</AvatarFallback>
          </Avatar>
        </Link>
        <CardContent className="grow">
          <div className="flex justify-between">
            <Link href={`/users/${authorId}`} className="flex items-baseline grow-0">
              <span className="font-medium">{authorQuery.isSuccess ? authorQuery.data.user.name : "Loading"}</span>
              <span className="text-muted-foreground">#{authorQuery.isSuccess ? authorQuery.data.user.id : "Loading"}</span>
            </Link>
            <span className="text-muted-foreground text-sm">Posted on {postQuery.data?.post.createdAt.toDateString() || "some time"}</span>
          </div>
          <Separator className="my-2" />
          <div>
            <p className="text-lg font-medium">{postQuery.data?.post.title}</p>
            <p>{postQuery.data?.post.content}</p>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-end">
            <LikeButton isLiked={postQuery.data?.isLiked} handleClick={handleLikeClick} likes={postQuery.data?.totalLikes || 0} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LikeButton({ likes, handleClick, isLiked }: { likes: number; handleClick: () => void; isLiked: boolean | undefined }) {
  return (
    <Button onClick={handleClick} className={cn(`gap-x-1`, isLiked ? "bg-red-500" : "bg-primary")}>
      <Heart /> {likes} likes
    </Button>
  );
}
