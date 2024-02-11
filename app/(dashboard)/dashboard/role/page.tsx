import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import { getUsers } from "@/lib/user";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];

export default async function page() {
  const users = await getUsers();

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}
