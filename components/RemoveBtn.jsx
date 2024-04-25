"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeNote = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:3000/api/notes?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          // Show success message if delete operation is successful
          Swal.fire({
            title: "Deleted!",
            text: "Your note has been deleted.",
            icon: "success",
          }).then(() => {
            // Refresh the page after successful deletion
            router.refresh();
          });
        }
      }
    });
  };

  return (
    <button onClick={removeNote} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
