import { Dispatch, SetStateAction, startTransition, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { deleteNote, getNotes } from "@/lib/db";
import { toast } from "sonner";
import { IOptimisticNote } from "@/types/note";

type Props = {
  noteId: number;
  setNotes: Dispatch<SetStateAction<IOptimisticNote[]>>;
  setOptimisticNotes: (
    action:
      | IOptimisticNote[]
      | ((pendingState: IOptimisticNote[]) => IOptimisticNote[])
  ) => void;
};

export default function DeleteNote({
  noteId,
  setNotes,
  setOptimisticNotes,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleDeleteNote = async () => {
    startTransition(() => {
      setOptimisticNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId)
      );
    });
    try {
      await deleteNote(noteId);
      const updatedNotes = await getNotes();
      startTransition(() => {
        setNotes(updatedNotes);
        setOptimisticNotes(() => updatedNotes);
      });
      toast.success("Note deleted successfully.");
    } catch (err: unknown) {
      if (err instanceof Error)
        toast.error("Error deleting note", { description: err.message });
      startTransition(() => {
        setOptimisticNotes((prevNotes) => [
          ...prevNotes,
          { id: noteId, title: "Failed to delete", content: "" },
        ]);
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Trash color="red" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-row items-center justify-between">
          <p>Sure to delete?</p>
          <div className="flex flex-row gap-2">
            <Button
              variant="ghost"
              className="text-blue-500"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
            <Button
              variant="ghost"
              className="text-red-500"
              onClick={handleDeleteNote}
            >
              Yes
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
