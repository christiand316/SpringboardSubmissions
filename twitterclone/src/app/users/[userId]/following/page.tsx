import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserFollowingPage({ params: { userId } }: { params: { userId: string } }) {
  const parsedUserId = parseInt(userId);

  const followerData = await prisma.user.findUnique({ where: { id: parsedUserId }, select: { following: { select: { id: true, name: true, email: true } } } });
  if (!followerData) {
    return null;
  }
  return (
    <div>
      <ul>
        {followerData.following.map((following) => {
          return (
            <Link key={following.id} href={`/users/${following.id}`}>
              <li>{following.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
