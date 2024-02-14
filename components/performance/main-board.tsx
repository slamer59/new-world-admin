import { getWarCount, getWarStatisticsByWar } from "@/lib/war";
import clsx from "clsx";
import Link from "next/link";
import { GroupPerfoTable } from "./group-table";

export async function PerformanceBoard({ warId }: { warId: number }) {



  const groupStats = await getWarStatisticsByWar({ warId })
  console.log("🚀 ~ PerformanceBoard ~ groupPerfo:", groupStats)

  const groupPerfos = groupStats.map((stats) => {
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
  const warCount = await getWarCount()

  return (
    <>
      {/* <Pagination /> */}
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
      <GroupPerfoTable groupPerfos={groupPerfos} />
    </>
  )
}