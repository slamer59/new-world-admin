import BreadCrumb from "@/components/breadcrumb";
import { RoleClient } from "@/components/tables/role-tables/client";
import { getRolesDetails } from "@/lib/role";
import { formatDate } from "@/lib/utils";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];

export default async function page() {
  const roles = await getRolesDetails()

  // 2. Convert User array, roles array, status to string
  roles.map((role: { player: { name: any; }; created_at: string; updated_at: string; }) => {
    role.player = role?.player?.name
    // Created at format to fr-Fr
    role.created_at = formatDate(role.created_at)
    role.updated_at = formatDate(role.updated_at)
  }
  )
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <RoleClient data={roles} />
      </div>
    </>
  );
}

