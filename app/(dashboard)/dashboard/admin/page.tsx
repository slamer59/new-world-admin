import { AdminDashboard } from "@/components/admin/admin-dashboard";
import BreadCrumb from "@/components/breadcrumb";

const breadcrumbItems = [{ title: "Admin panel", link: "/dashboard/admin" }];

export default async function page() {

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <AdminDashboard />
      </div>
    </>
  );
}
