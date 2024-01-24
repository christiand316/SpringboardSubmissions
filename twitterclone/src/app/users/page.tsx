import { getUsers } from "@/actions/user/getUsers";
import Link from "next/link";

export default async function UsersPage() {
  const result = await getUsers();
  if (!result.success) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {result.data.users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              {user.name}#{user.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
