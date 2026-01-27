import Link from "next/link";

export default function UsersPage() {
  const users = [1, 2, 3];

  return (
    <main className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">Users</h1>
      <ul className="mt-4">
        {users.map((id) => (
          <li key={id}>
            <Link href={`/users/${id}`}>User {id}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
