import BreadCrumb from "@/components/breadcrumb";
import UserForm from "@/components/forms/user-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlayers } from "@/lib/player";
import { getUserById } from "@/lib/user";

export default async function Page({ params }: { params: { userId: string } }) {

  const breadcrumbItems = [
    { title: "User", link: "/dashboard/user" },
    { title: "Create", link: "/dashboard/user/create" },
  ];
  // 1. Get all players
  const players = await getPlayers()
  // 2. Get user by id
  const user = await getUserById(parseInt(params.userId))

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <UserForm user={user} players={players} />
      </div>
    </ScrollArea>
  );
}