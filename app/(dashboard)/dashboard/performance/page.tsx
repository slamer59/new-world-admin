import BreadCrumb from "@/components/breadcrumb";
import { PerformanceBoard } from "@/components/performance/main-board";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems = [{ title: "Team performance", link: "/dashboard/performance" }];
export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const warId = typeof searchParams.war === 'string' ? Number(searchParams.war) : 1

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Team performance for war #${warId}`} description="Visualize your team performance" />
        </div>
        <PerformanceBoard warId={warId} />
      </div>
    </>
  );
}
