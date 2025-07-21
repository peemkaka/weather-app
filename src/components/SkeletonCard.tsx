import { Skeleton } from "./ui/skeleton";

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gray-300/20 text-white rounded-2xl p-6 shadow-lg relative ${
        className ? className : "lg:col-span-2"
      }  animate-pulse `}
    >
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4 bg-gray-400/50" />
        <Skeleton className="h-12 w-1/2 bg-gray-400/50" />
        <Skeleton className="h-4 w-2/3 bg-gray-400/50" />
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-16 bg-gray-400/50" />
            <Skeleton className="h-3 w-16 bg-gray-400/50" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20 bg-gray-400/50" />
            <Skeleton className="h-3 w-20 bg-gray-400/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
