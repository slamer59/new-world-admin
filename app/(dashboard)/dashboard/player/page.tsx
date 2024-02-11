import BreadCrumb from "@/components/breadcrumb";
import { PlayerClient } from "@/components/tables/player-tables/client";
import { getPlayersDetails } from "@/lib/player";

const breadcrumbItems = [{ title: "Player", link: "/dashboard/player" }];

export default async function page() {
  // 1. Get all players
  const players = await getPlayersDetails();
  console.log("🚀 ~ page ~ players:", players)

  // 2. Convert User array, roles array, status to string
  players.map((player) => {
    player.user = player.user.name
    player.roles = player.roles.map((role) => role.name).join(", ")
    player.status = player.status.id;
    // Created at format to fr-Fr
    player.createdAt = new Date(player.createdAt).toLocaleString("fr-FR")
    player.updatedAt = new Date(player.updatedAt).toLocaleString("fr-FR")
  });


  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <PlayerClient data={players} />
      </div>
    </>
  );
}
