import EditNoteForm from "@/components/EditNoteForm";

const getNoteById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch note");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditNote({ params }) {
  const { id } = params;
  const { note } = await getNoteById(id);
  const { title, description } = note;

  return <EditNoteForm id={id} title={title} description={description} />;
}
