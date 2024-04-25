"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setFormSubmitted(true); // Set formSubmitted to true if form is submitted with empty fields
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a Note");
      }
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
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Note Title"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
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
        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
          Add Note
        </button>
      </div>

      {formSubmitted &&
        !title &&
        !description && ( // Render alert conditionally
          <p className="text-red-500">Title and description are required.</p>
        )}
    </form>
  );
}
