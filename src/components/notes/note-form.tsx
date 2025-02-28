import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { INote, IOptimisticNote } from "@/types/note";
import { toast } from "sonner";
import { addNote, updateNote } from "@/lib/db";
import { Dispatch, SetStateAction, startTransition } from "react";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
});

type Props = {
  setNotes: Dispatch<SetStateAction<IOptimisticNote[]>>;
  selectedNote: IOptimisticNote | null;
  setSelectedNote: Dispatch<SetStateAction<IOptimisticNote | null>>;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setOptimisticNotes: (
    action:
      | IOptimisticNote[]
      | ((pendingState: IOptimisticNote[]) => IOptimisticNote[])
  ) => void;
};

export default function NoteForm({
  setNotes,
  selectedNote,
  setSelectedNote,
  editMode,
  setEditMode,
  setOptimisticNotes,
}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: selectedNote?.title || "",
      content: selectedNote?.content || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (selectedNote) {
      startTransition(() => {
        setOptimisticNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === selectedNote.id ? { ...note, ...data } : note
          )
        );
      });

      try {
        const updatedNote: INote = { ...selectedNote, ...data };
        await updateNote(updatedNote);
        startTransition(() => {
          setNotes((prevNotes) =>
            prevNotes.map((note) =>
              note.id === selectedNote.id ? { ...note, ...data } : note
            )
          );
        });
        toast("Note updated successfully");
      } catch (err) {
        if (err instanceof Error)
          toast("Failed to update note", { description: err.message });
      } finally {
        setSelectedNote(null);
      }
    } else {
      const newNote: INote = {
        ...data,
        id: Date.now(),
        content: data.content,
        createdAt: new Date().toISOString(),
      };
      startTransition(() => {
        setOptimisticNotes((prevNotes) => [...prevNotes, newNote]);
      });
      try {
        await addNote(newNote);
        startTransition(() => {
          setNotes((prevNotes) => [...prevNotes, newNote]);
        });
        toast("Note added successfully");
      } catch (err) {
        if (err instanceof Error)
          toast("Failed to add note", { description: err.message });
        startTransition(() => {
          setOptimisticNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== newNote.id)
          );
        });
      } finally {
        setEditMode(false);
      }
    }

    // Close the form after submission
    setEditMode(false);
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        editMode ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the content here.."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between">
            <Button variant={"secondary"} onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
