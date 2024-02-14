import BreadCrumb from "@/components/breadcrumb";
import { PlayerPerfOverview } from "@/components/performance/player-overview";
import { Heading } from "@/components/ui/heading";
import { getPlayerById, getPlayerStatsById } from "@/lib/player";

const breadcrumbItems = [{ title: "Team performance", link: "/dashboard/performance" }];

export default async function Page({ params }: { params: { playerId: string } }) {

    const player = await getPlayerById(Number(params.playerId)) // Update the variable name from playerId to id
    const playerStats = await getPlayerStatsById(Number(params.playerId)) // Update the variable name from playerId to id
    return (
        <>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading title={`${player.name} performance`} description="Visualize user performance" />
                </div>
                <PlayerPerfOverview playerStats={playerStats} />
            </div>
        </>
    );
}
