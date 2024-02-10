import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import prisma from "@/lib/prisma";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];

async function getUsers() {
  const data = await prisma.user.findMany();
  return data;
}

export default async function page() {
  const users = await getUsers();
  console.log("🚀 ~ page ~ users:", users)

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}
