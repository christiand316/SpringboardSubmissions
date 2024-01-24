import Post from "@/components/Post";
import { prisma } from "@/lib/prisma";

export default async function UserLikesPage({ params: { userId } }: { params: { userId: string } }) {
  const parsedUserId = parseInt(userId);

  const followerData = await prisma.user.findUnique({ where: { id: parsedUserId }, select: { likes: true } });
  if (!followerData) {
    return null;
  }
  return (
    <div>
      <ul>
        {followerData.likes.map((like) => {
          return <Post key={like.id} postId={like.id} />;
        })}
      </ul>
    </div>
  );
}
