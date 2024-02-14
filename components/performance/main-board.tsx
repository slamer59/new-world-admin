import { getWarCount, getWarStatisticsByWar } from "@/lib/war";
import clsx from "clsx";
import Link from "next/link";
import { GroupPerfoTable } from "./group-table";

export async function PerformanceBoard({ warId }: { warId: number }) {



  const groupStats = await getWarStatisticsByWar({ warId })

  const groupPerfos = groupStats.map((stats: { player: { name: any; }; kill: any; death: any; assist: any; healing: any; dmg: any; }) => {
    return {
      name: stats.player.name,
      kills: stats.kill,
      deaths: stats.death,
      assists: stats.assist,
      healing: stats.healing,
      damage: stats.dmg
    }
  }
  )
  const groupedByWarCompositionId = groupStats.reduce((acc: any, obj: any) => {
    const { warCompositionId } = obj.player;
    if (!acc[warCompositionId]) {
      acc[warCompositionId] = [];
    }
    acc[warCompositionId].push(obj);
    return acc;
  }, {})

  let totalByWarCompositionId = groupStats.reduce((acc: any, obj: any) => {
    const { warCompositionId } = obj.player;
    acc[warCompositionId] = {
      kill: (acc[warCompositionId]?.kill || 0) + obj.kill,
      death: (acc[warCompositionId]?.death || 0) + obj.death,
      assist: (acc[warCompositionId]?.assist || 0) + obj.assist,
      healing: (acc[warCompositionId]?.healing || 0) + obj.healing,
      dmg: (acc[warCompositionId]?.dmg || 0) + obj.dmg,
    };

    return acc;
  }, {});

  totalByWarCompositionId = Object.keys(totalByWarCompositionId).map((key) => {
    return {
      name: `Group #${key}`,
      kills: totalByWarCompositionId[key].kill,
      deaths: totalByWarCompositionId[key].death,
      assists: totalByWarCompositionId[key].assist,
      healing: totalByWarCompositionId[key].healing,
      damage: totalByWarCompositionId[key].dmg,
    }

  })

  const warCount = await getWarCount()

  return (
    <>
      <div className='flex space-x-6'>
        <Link
          href={{
            pathname: '/dashboard/performance',
            query: {
              war: warId > 1 ? warId - 1 : 1
            }
          }}
          className={clsx(
            'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
            warId <= 1 && 'pointer-events-none opacity-50'
          )}
        >
          Previous
        </Link>
        <Link
          href={{
            pathname: '/dashboard/performance',
            query: {
              war: warId < warCount ? warId + 1 : 1
            }
          }}
          className={clsx(
            'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
            warId == warCount && 'pointer-events-none opacity-50')
          }
        >
          Next
        </Link>
      </div>
      <GroupPerfoTable title="Team globale performance" groupPerfos={groupPerfos} />
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {groupedByWarCompositionId && Object.keys(groupedByWarCompositionId).map((key) => {
          return (
            <div key={key}>
              <h2>Group #{key}</h2>
              <GroupPerfoTable
                title={`Total in group #${key}`}
                groupPerfos={groupedByWarCompositionId[key].map((stats: { player: { name: any; }; kill: any; death: any; assist: any; healing: any; dmg: any; }) => {
                  return {
                    name: stats.player.name,
                    kills: stats.kill,
                    deaths: stats.death,
                    assists: stats.assist,
                    healing: stats.healing,
                    damage: stats.dmg
                  }
                })}

              />
            </div>
          )
        }
        )}
      </div>
      {totalByWarCompositionId &&
        <GroupPerfoTable
          groupPerfos={totalByWarCompositionId}
          title="Total by group"
        />
      }

    </>
  )
}
