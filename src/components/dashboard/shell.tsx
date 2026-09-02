"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Role } from "@/lib/types/role";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { BottomNav } from "./bottom-nav";
import { cookieStorage } from "@/lib/cookie-storage";

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    cookieStorage.remove("accessToken");
    cookieStorage.remove("refreshToken");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-25 flex">
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPath={pathname}
      />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          user={user}
          onMenuToggle={() => setSidebarOpen(true)}
          onLogout={handleLogout}
          sidebarOpen={sidebarOpen}
        />
        <main className="pt-16 pb-20 md:pt-16 md:pb-0 flex-1">
          <div>{children}</div>
        </main>
      </div>
      <BottomNav userRole={user.role} onMenuToggle={() => setSidebarOpen(true)} />
    </div>
  );
}
