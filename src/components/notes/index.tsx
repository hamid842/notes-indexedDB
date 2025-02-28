import { startTransition, useEffect, useOptimistic, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { getNotes } from "@/lib/db";
import { IOptimisticNote } from "@/types/note";
import NoteForm from "./note-form";
import NoteSkeleton from "../skeleton/note-skeleton";
import { toast } from "sonner";
import NoteItem from "./note-item";
import SearchInput from "./search-input";
import { useDebounce } from "@/hooks/useDebounce";

export default function Notes() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState<IOptimisticNote[]>([]);
  const [optimisticNotes, setOptimisticNotes] =
    useOptimistic<IOptimisticNote[]>(notes);
  const [selectedNote, setSelectedNote] = useState<IOptimisticNote | null>(
    null
  );

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    loadNotes(debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  const loadNotes = async (searchQuery: string) => {
    try {
      setLoading(true);
      const storedNotes = await getNotes(searchQuery);

      startTransition(() => {
        setNotes(storedNotes);
        setOptimisticNotes(() => storedNotes);
      });
    } catch (err: unknown) {
      if (err instanceof Error)
        toast("Error on loading notes", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-auto flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between">
          <p className="font-bold">Notes</p>
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClickClose={() => setSearchQuery("")}
          />
          <Button
            variant={"ghost"}
            className="text-blue-600 hover:bg-transparent hover:text-blue-800 cursor-pointer"
            onClick={() => setEditMode(true)}
          >
            <Plus />
            Add New
          </Button>
        </div>
        <Separator className="my-2" />
        {loading && [...new Array(3)].map((_, i) => <NoteSkeleton key={i} />)}
        {editMode && (
          <NoteForm
            setNotes={setNotes}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            editMode={editMode}
            setEditMode={setEditMode}
            setOptimisticNotes={setOptimisticNotes}
          />
        )}
        {optimisticNotes.map((note, i) => (
          <NoteItem
            key={i}
            note={note}
            setSelectedNote={setSelectedNote}
            setEditMode={setEditMode}
            setNotes={setNotes}
            setOptimisticNotes={setOptimisticNotes}
          />
        ))}
      </div>
    </div>
  );
}
