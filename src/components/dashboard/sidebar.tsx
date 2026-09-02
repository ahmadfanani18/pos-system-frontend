"use client";

import { Role } from "@/lib/types/role";
import { SidebarNav } from "./sidebar-nav";
import { SidebarUser } from "./sidebar-user";

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: Role;
  };
  isOpen?: boolean;
  onClose?: () => void;
  currentPath: string;
}

export function Sidebar({ user, isOpen, onClose, currentPath }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative flex flex-col w-[260px] h-screen bg-white border-r border-slate-100 z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-slate-100">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center mr-3">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div>
            <h1 className="font-display font-bold text-slate-800 text-base leading-tight">
              Warung Makan
            </h1>
            <p className="text-slate-400 text-xs">POS System</p>
          </div>
        </div>

        {/* Navigation */}
        <SidebarNav userRole={user.role} currentPath={currentPath} />

        {/* User */}
        <SidebarUser name={user.name} email={user.email} role={user.role} />
      </aside>
    </>
  );
}