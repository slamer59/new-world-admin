import BreadCrumb from "@/components/breadcrumb";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { Heading } from "@/components/ui/heading";
import { getWarCompositions } from "@/lib/war";

const breadcrumbItems = [{ title: "Kanban", link: "/dashboard/kanban" }];
export default async function page() {
  const warCompositions = await getWarCompositions()
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Kanban`} description="Manage tasks by dnd" />
          {/* <NewTaskDialog /> */}
        </div>
        <KanbanBoard warCompositions={warCompositions} />
      </div>
    </>
  );
}
