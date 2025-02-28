import { Dispatch, SetStateAction } from "react";
import { INote, IOptimisticNote } from "@/types/note";
import { Edit } from "lucide-react";
import AppTooltip from "../shared/app-tooltip";
import { Button } from "../ui/button";
import DeleteNote from "./delete-note";

type Props = {
  note: INote;
  setSelectedNote: Dispatch<SetStateAction<IOptimisticNote | null>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setNotes: Dispatch<SetStateAction<IOptimisticNote[]>>;
  setOptimisticNotes: (
    action:
      | IOptimisticNote[]
      | ((pendingState: IOptimisticNote[]) => IOptimisticNote[])
  ) => void;
};

export default function NoteItem({
  note,
  setSelectedNote,
  setEditMode,
  setNotes,
  setOptimisticNotes,
}: Props) {
  const handleEditNote = () => {
    setSelectedNote(note);
    setEditMode(true);
  };
  return (
    <div className="flex flex-row justify-between mt-5 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div>
        <p className="font-bold">{note.title}</p>
        <p>{note.content}</p>
      </div>
      <div className="flex flex-col">
        <AppTooltip
          title="Edit note"
          trigger={
            <Button
              size={"icon"}
              variant={"ghost"}
              className="cursor-pointer"
              onClick={handleEditNote}
            >
              <Edit color="dodgerblue" />
            </Button>
          }
        />

        <DeleteNote
          noteId={note.id!}
          setNotes={setNotes}
          setOptimisticNotes={setOptimisticNotes}
        />
      </div>
    </div>
  );
}
