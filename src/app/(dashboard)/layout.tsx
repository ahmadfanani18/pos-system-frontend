"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/shell";
import { authApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Role } from "@/lib/types/role";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    authApi
      .getMe()
      .then((userData) => {
        setUser(userData as User);
        setIsLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!user) return null;

  return <DashboardShell user={user}>{children}</DashboardShell>;
}