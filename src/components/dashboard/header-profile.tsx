"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, Settings, HelpCircle, LogOut } from "lucide-react";
import { Role } from "@/lib/types/role";

interface HeaderProfileProps {
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

export function HeaderProfile({ name, email, role, onLogout }: HeaderProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="profileBtn"
        onClick={() => setIsOpen(!isOpen)}
        className="header-item flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl"
      >
        <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center">
          <span className="font-display font-bold text-primary-600 text-sm">{initials}</span>
        </div>
        <div className="hidden xl:block text-left">
          <p className="font-semibold text-slate-800 text-sm leading-tight">{name}</p>
          <p className="text-slate-400 text-xs">{roleLabels[role]}</p>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 hidden xl:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-nav border border-slate-100 py-2 z-50">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="font-semibold text-slate-800">{name}</p>
            <p className="text-slate-400 text-sm">{email}</p>
          </div>
          <div className="py-2">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Profil Saya</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Pengaturan</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Bantuan</span>
            </a>
          </div>
          <div className="border-t border-slate-100 py-2">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Keluar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
