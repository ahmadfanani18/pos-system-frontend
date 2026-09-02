"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

  const handleLogout = () => {
    cookieStorage.remove("accessToken");
    cookieStorage.remove("refreshToken");
    router.push("/login");
  };

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="min-h-screen bg-slate-25">
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPath={currentPath}
      />
      <Header
        user={user}
        onMenuToggle={() => setSidebarOpen(true)}
        onLogout={handleLogout}
      />
      <main className="pt-16 pb-20 md:pt-16 md:pb-0 md:ml-[260px]">
        <div className="p-6">{children}</div>
      </main>
      <BottomNav userRole={user.role} onMenuToggle={() => setSidebarOpen(true)} />
    </div>
  );
}
