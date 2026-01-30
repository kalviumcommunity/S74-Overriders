"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useSWRConfig } from "swr";
import AddUser from "./AddUser";

export default function UsersPage() {
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 30000, // Revalidate every 30 seconds
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (retryCount >= 3) return;
      setTimeout(() => revalidate({ retryCount }), 2000);
    },
  });
  
  const { cache } = useSWRConfig();

  // Log cache keys for demonstration
  console.log("Cache keys:", Array.from(cache.keys()));
  console.log("Cache data for /api/users:", cache.get("/api/users"));

  const handleManualRevalidate = () => {
    mutate();
  };

  if (error) return <p className="text-red-600">❌ Failed to load users</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User List</h1>
        <button 
          onClick={handleManualRevalidate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          🔄 Refresh Data
        </button>
      </div>
      
      <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
        <p><strong>Cache Status:</strong> {cache.get("/api/users") ? "Cache Hit ✅" : "Cache Miss ❌"}</p>
        <p><strong>Total Cache Keys:</strong> {Array.from(cache.keys()).length}</p>
        <p><strong>Data Source:</strong> Check console for Redis cache logs</p>
      </div>

      <ul className="space-y-2 mb-6">
        {data.map((user: any) => (
          <li key={user.id} className="p-2 border-b border-gray-200">
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
      
      <AddUser />
    </main>
  );
}
