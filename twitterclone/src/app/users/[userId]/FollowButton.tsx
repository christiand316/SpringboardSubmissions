"use client";

import { followUser, unfollowUser } from "@/actions/user/followUser";
import { Button } from "@/components/ui/button";

interface FollowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFollowing: boolean;
  userId: number;
}

export default function FollowButton({ isFollowing, userId, ...props }: FollowButtonProps) {
  async function handleClick() {
    console.log("hi");
    if (isFollowing) {
      const result = await unfollowUser(userId);
      console.log(result);
    } else {
      const result = await followUser(userId);
      console.log(result);
    }
  }

  return (
    <Button onClick={handleClick} {...props}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
