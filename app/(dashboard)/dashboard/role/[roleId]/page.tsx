import BreadCrumb from "@/components/breadcrumb";
import RoleForm from "@/components/forms/role-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getRoleById } from "@/lib/role";

export default async function Page({ params }: { params: { roleId: string } }) {

  const breadcrumbItems = [
    { title: "Role", link: "/dashboard/role" },
    { title: "Create", link: "/dashboard/role/create" },
  ];
  // 1. Get role
  let role = await getRoleById(parseInt(params.roleId))
  if (!role) {
    role = {
      createId: parseInt(params.roleId),
    }
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <RoleForm role={role} />
      </div>
    </ScrollArea>
  );
}