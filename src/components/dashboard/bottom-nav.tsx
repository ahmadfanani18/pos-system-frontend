"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Receipt, Menu } from "lucide-react";
import { Role } from "@/lib/types/role";
import { can } from "@/lib/permissions";

interface BottomNavProps {
  userRole: Role;
  onMenuToggle?: () => void;
}

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home", permission: "dashboard:view" as const },
  { href: "/pos", icon: ShoppingCart, label: "Kasir", permission: "pos:access" as const },
  { href: "/products", icon: Package, label: "Produk", permission: "products:view" as const },
  { href: "/transactions", icon: Receipt, label: "Transaksi", permission: "transactions:view" as const },
];

export function BottomNav({ userRole, onMenuToggle }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const hasAccess = can(userRole, item.permission);

          if (!hasAccess) return null;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 ${
                isActive ? "text-primary-600" : "text-slate-400"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={onMenuToggle}
          className="flex flex-col items-center justify-center gap-1 text-slate-400"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Menu</span>
        </button>
      </div>
    </nav>
  );
}
