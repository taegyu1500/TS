import { Card, CardHeader } from "@/components/ui/card";

export default function SortOptions() {
  return (
    <Card>
      <CardHeader>Sort Options</CardHeader>
      <div className="flex justify-between">
        <button>Sort by Name</button>
        <button>Sort by Price</button>
        <button>Sort by Date</button>
      </div>
    </Card>
  );
}
