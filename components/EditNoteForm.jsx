"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditNoteForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update Note");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Note Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Note Description"
      />

      <div className="flex">
        <button
          onClick={handleBack}
          className="bg-red-600 font-bold text-white py-3 px-6 w-fit">
          Cancel
        </button>

        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
          Update Note
        </button>
      </div>
    </form>
  );
}
