"use client";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";

export default function AddUser() {
  const { data } = useSWR("/api/users", fetcher);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = async () => {
    if (!name || !email) return;

    // Optimistic update — update cache before API call
    const optimisticUser = {
      id: Date.now(),
      name,
      email,
    };

    mutate("/api/users", [...(data || []), optimisticUser], false);

    try {
      // Actual API call
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      // Revalidate data from server
      mutate("/api/users");
      setName("");
      setEmail("");
      console.log("✅ User added successfully");
    } catch (error) {
      console.error("❌ Failed to add user:", error);
      // Revert optimistic update on error
      mutate("/api/users");
    }
  };

  return (
    <div className="mt-6 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Add New User</h3>
      <div className="space-y-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter user email"
          type="email"
          className="w-full border px-3 py-2 rounded"
        />
        <button 
          onClick={handleAddUser} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add User
        </button>
      </div>
    </div>
  );
}
