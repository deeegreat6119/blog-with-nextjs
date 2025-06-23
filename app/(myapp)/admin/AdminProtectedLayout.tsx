import UserAuthGuard from "@/app/components/UserAuthGuard";
import AdminLayout from "./layout";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const guard = await UserAuthGuard({ children });
  return <AdminLayout>{guard}</AdminLayout>;
}
