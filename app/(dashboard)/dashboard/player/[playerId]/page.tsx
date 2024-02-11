import BreadCrumb from "@/components/breadcrumb";
import PlayerForm from "@/components/forms/player-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlayerById } from "@/lib/player";
export default async function Page({ params }: { params: { userId: string } }) {

  const breadcrumbItems = [
    { title: "User", link: "/dashboard/player" },
    { title: "Create", link: "/dashboard/player/create" },
  ];
  // 2. Get user by id
  const player = await getPlayerById(parseInt(params.playerId))

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <PlayerForm player={player} />
      </div>
    </ScrollArea>
  );
}