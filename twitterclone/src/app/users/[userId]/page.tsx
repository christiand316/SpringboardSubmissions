import UserFeed from "./UserFeed";

export default async function UserPage({ params: { userId } }: { params: { userId: string } }) {
  const parsedUserId = parseInt(userId);

  return <UserFeed userId={parsedUserId} />;
}
