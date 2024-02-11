import BreadCrumb from "@/components/breadcrumb";
import UserForm from "@/components/forms/user-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlayers } from "@/lib/player";

export default async function Page({ params }: { params: { userId: string } }) {

  const breadcrumbItems = [
    { title: "User", link: "/dashboard/user" },
    { title: "Create", link: "/dashboard/user/create" },
  ];
  const players = await getPlayers();
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <UserForm id={parseInt(params.userId)} players={players} />
      </div>
    </ScrollArea>
  );
}