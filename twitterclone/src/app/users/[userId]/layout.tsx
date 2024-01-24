import { getUserSession } from "@/actions/auth/getUserSession";
import { getUser } from "@/actions/user/getUser";
import { notFound } from "next/navigation";
import UserFeed from "./UserFeed";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "./FollowButton";
import { Button } from "@/components/ui/button";
import EditUserModal from "./EditUserModal";
import NavLink from "@/components/NavLink";

type UserIdPageProps = {
  params: {
    userId: string;
  };
  children: React.ReactNode;
};

export default async function UserIdpage({ params: { userId }, children }: UserIdPageProps) {
  const parsedUserId = parseInt(userId);
  const result = await getUser(parsedUserId);
  if (result.success === false) {
    if (result.error.type !== "internal") {
      notFound();
    } else {
      throw new Error(`Failed to get user: ${result.error.message || "unknown message"}`);
    }
  }

  const isCurrentUser = (await getUserSession())?.id === result.data.user.id;

  return (
    <div className="relative">
      <div className="w-full h-96">
        <Image width={1600} height={800} src={"https://images.pexels.com/photos/19739015/pexels-photo-19739015/free-photo-of-small-stream-running-down-the-mountains.jpeg"} alt="User's header image" className="object-cover bg-muted w-full h-full" />
      </div>
      <Avatar className="bg-emerald-500 size-36 translate-y-[-100px] mx-12 absolute border-4">
        <AvatarImage src={""} alt="User's avatar" />
        <AvatarFallback className="bg-inherit">AF</AvatarFallback>
      </Avatar>
      <div className="flex justify-end pt-2 gap-4 items-baseline">
        <NavLink exact className="text-base" href={`/users/${parsedUserId}`}>
          Posts {result.data.postsCount}
        </NavLink>
        <NavLink className="text-base" href={`/users/${parsedUserId}/followers`}>
          Followers {result.data.followersCount}
        </NavLink>
        <NavLink className="text-base" href={`/users/${parsedUserId}/following`}>
          Following {result.data.followingCount}
        </NavLink>
        <NavLink className="text-base" href={`/users/${parsedUserId}/likes`}>
          Liked Posts {result.data.likesCount}
        </NavLink>
        <FollowButton userId={result.data.user.id} isFollowing={result.data.isFollowing} />
        {isCurrentUser && <EditUserModal currentUserId={parsedUserId} />}
      </div>
      <div className="pt-4">
        <p className="text-2xl">
          Username: {result.data.user.name} {isCurrentUser && "(you!)"}
        </p>
        <p className="text-muted-foreground">Email: {result.data.user.email}</p>
        <p>Bio: {result.data.user.bio || "This user doesn't have a bio yet."}</p>
        {children}
      </div>
    </div>
  );
}
