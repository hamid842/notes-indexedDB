import { Skeleton } from "../ui/skeleton";

export default function NoteSkeleton() {
  return (
    <div className="space-y-3 mt-5 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <Skeleton className="w-48 h-6" />
      <Skeleton className="w-full h-4" />
    </div>
  );
}
