import { verifySession } from "@/app/lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export async function getUserAuth(requiredRole?: string) {
  const user = await verifySession(requiredRole);
  return user;
}

export default async function UserAuthGuard({ children, requiredRole }: AuthGuardProps) {
  await verifySession(requiredRole);
  return <>{children}</>;
}
