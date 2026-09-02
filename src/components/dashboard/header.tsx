"use client";

import { Menu, Bell } from "lucide-react";
import { Role } from "@/lib/types/role";
import { HeaderSearch } from "./header-search";
import { HeaderActions } from "./header-actions";
import { HeaderProfile } from "./header-profile";

interface HeaderProps {
  user: {
    name: string;
    email: string;
    role: Role;
  };
  onMenuToggle?: () => void;
  onLogout?: () => void;
  sidebarOpen?: boolean;
}

export function Header({ user, onMenuToggle, onLogout, sidebarOpen }: HeaderProps) {
  return (
    <>
      {/* Desktop Header (Fixed at top, right of sidebar) */}
      <header className="hidden md:flex h-16 bg-white border-b border-slate-100 fixed top-0 left-[260px] right-0 z-40">
        <div className="h-full flex items-center justify-between px-6">
          {/* Left Section: Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="header-item w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Center Section: Global Search */}
          <HeaderSearch />

          {/* Right Section: Actions & Profile */}
          <HeaderActions />
          <HeaderProfile
            name={user.name}
            email={user.email}
            role={user.role}
            onLogout={onLogout}
          />
        </div>
      </header>

      {/* Mobile Header (Fixed for mobile) */}
      <header className="md:hidden h-14 bg-white border-b border-slate-100 fixed top-0 left-0 right-0 z-50">
        <div className="h-full flex items-center justify-between px-4">
          {/* Left: Menu Toggle */}
          <button
            onClick={onMenuToggle}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Center: Store Name */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            <span className="font-display font-bold text-slate-800">Warung Makan</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            {/* Notifications */}
            <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-500">
              <Bell className="w-5 h-5" />
              <span className="notification-dot" />
            </button>

            {/* User Avatar */}
            <button className="w-10 h-10 rounded-xl flex items-center justify-center">
              <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center">
                <span className="font-display font-bold text-primary-600 text-sm">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Spacer (push content above bottom nav) */}
      <div className="md:hidden h-14" />
    </>
  );
}
