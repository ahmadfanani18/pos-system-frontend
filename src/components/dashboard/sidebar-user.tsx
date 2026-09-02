"use client";

import { LogOut } from "lucide-react";
import { Role } from "@/lib/types/role";

interface SidebarUserProps {
  name: string;
  email: string;
  role: Role;
  onLogout?: () => void;
}

const roleLabels: Record<Role, string> = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  CASHIER: "Kasir",
};

export function SidebarUser({ name, email, role, onLogout }: SidebarUserProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="p-4 border-t border-slate-100">
      <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="font-display font-bold text-primary-600 text-sm">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 text-sm truncate">{name}</p>
          <p className="text-slate-400 text-xs truncate">{roleLabels[role]}</p>
        </div>
        <button
          onClick={onLogout}
          className="p-2 rounded-lg text-slate-400 hover:text-destructive-500 hover:bg-destructive-50 transition-colors"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
