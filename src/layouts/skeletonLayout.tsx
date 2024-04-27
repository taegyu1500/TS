import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLayout({ count }: { count: number }) {
  return (
    <div className={"flex items-center space-x-4"}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className={"h-12 w-12 rounded-full"} />
      ))}
    </div>
  );
}
