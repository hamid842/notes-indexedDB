import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { ComponentProps } from "react";
import { Button } from "../ui/button";

type Props = {
  onClickClose: () => void;
} & ComponentProps<"input">;

export default function SearchInput({ onClickClose, ...inputProps }: Props) {
  return (
    <div className="relative">
      <Input
        {...inputProps}
        type="text"
        placeholder="Search notes..."
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <Button
        size={"icon"}
        variant={"ghost"}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-transparent cursor-pointer"
        onClick={onClickClose}
      >
        <X />
      </Button>
    </div>
  );
}
