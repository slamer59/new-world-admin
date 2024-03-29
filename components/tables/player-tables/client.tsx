"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

// interface ProductsClientProps {
//   data: Player[];
// }

export const PlayerClient = ({ data }: { data: any }) => {

  const router = useRouter();
  const nextId = Math.max(...data.map((o: { id: number }) => o.id)) + 1;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Players (${data?.length})`}
          description="Manage players (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/player/${nextId}`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
