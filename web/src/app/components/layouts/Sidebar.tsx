import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/users", label: "Users" },
  { href: "/reports", label: "Reports" },
];

export default function Sidebar() {
  return (
    <aside
      className="w-64 bg-gray-100 h-screen border-r p-4"
      aria-label="Sidebar navigation"
    >
      <h2 className="text-lg font-bold mb-4">Navigation</h2>

      <ul className="space-y-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:text-blue-600 focus:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
