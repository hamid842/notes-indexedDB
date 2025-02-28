import { Skeleton } from "../ui/skeleton";

export default function NoteSkeleton() {
  return (
    <div className="relative space-y-3 mt-5 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <Skeleton className="w-48 h-5" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="absolute bottom-1 left-1 w-20 h-2" />
    </div>
  );
}
