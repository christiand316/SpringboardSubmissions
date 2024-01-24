import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserFollowersPage({ params: { userId } }: { params: { userId: string } }) {
  const parsedUserId = parseInt(userId);

  const followerData = await prisma.user.findUnique({ where: { id: parsedUserId }, select: { followers: { select: { id: true, name: true, email: true } } } });
  if (!followerData) {
    return null;
  }
  return (
    <div>
      <ul>
        {followerData.followers.map((follower) => {
          return (
            <Link key={follower.id} href={`/users/${follower.id}`}>
              <li>{follower.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
