"use client";

import { NavItem } from "./nav-item";
import { Role } from "@/lib/types/role";
import { can } from "@/lib/permissions";
import {
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  Package,
  ChefHat,
  PackagePlus,
  PackageMinus,
  AlertTriangle,
  ClipboardList,
  BarChart3,
  TrendingUp,
  Truck,
  Users,
  Gem,
  Tag,
  Ticket,
  Settings,
  UserCog,
} from "lucide-react";

interface NavSection {
  title: string;
  items: NavSectionItem[];
}

interface NavSectionItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  permission?: Parameters<typeof can>[1];
  badge?: string | number;
  badgeColor?: "default" | "success" | "warning" | "danger";
}

const navigationSections: NavSection[] = [
  {
    title: "Menu Utama",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/pos", icon: ShoppingCart, label: "Kasir/POS", permission: "pos:access" },
      { href: "/transactions", icon: Receipt, label: "Transaksi", permission: "transactions:view" },
    ],
  },
  {
    title: "Inventory",
    items: [
      { href: "/products", icon: Package, label: "Produk", permission: "products:view" },
      { href: "/recipes", icon: ChefHat, label: "Resep/BoM", permission: "recipes:view" },
      { href: "/stock/in", icon: PackagePlus, label: "Barang Masuk", permission: "stock_in:create" },
      { href: "/stock/out", icon: PackageMinus, label: "Barang Keluar", permission: "stock_out:create" },
      { href: "/stock/alerts", icon: AlertTriangle, label: "Low Stock", permission: "stock_report:view" },
      { href: "/stock/requests", icon: ClipboardList, label: "Permintaan Stok", permission: "stock_request:view" },
    ],
  },
  {
    title: "Laporan",
    items: [
      { href: "/reports/sales", icon: BarChart3, label: "Laporan Penjualan", permission: "reports:view" },
      { href: "/reports/stock", icon: Truck, label: "Laporan Stok", permission: "reports:view" },
      { href: "/reports/profit", icon: TrendingUp, label: "Laporan Profit", permission: "reports:view" },
    ],
  },
  {
    title: "CRM & Loyalty",
    items: [
      { href: "/customers", icon: Users, label: "Pelanggan", permission: "customers:view" },
      { href: "/loyalty", icon: Gem, label: "Loyalty", permission: "loyalty:view" },
      { href: "/discounts", icon: Tag, label: "Diskon", permission: "discounts:view" },
      { href: "/vouchers", icon: Ticket, label: "Voucher", permission: "vouchers:view" },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      { href: "/settings", icon: Settings, label: "Settings", permission: "settings:view" },
      { href: "/employees", icon: UserCog, label: "Karyawan", permission: "employees:view" },
    ],
  },
];

interface SidebarNavProps {
  userRole: Role;
  currentPath: string;
  onItemClick?: () => void;
}

export function SidebarNav({ userRole, currentPath, onItemClick }: SidebarNavProps) {
  return (
    <nav className="flex-1 overflow-y-auto py-4 px-3">
      {navigationSections.map((section) => {
        const visibleItems = section.items.filter(
          (item) => !item.permission || can(userRole, item.permission)
        );

        if (visibleItems.length === 0) return null;

        return (
          <div key={section.title} className="mb-6">
            <p className="nav-section-title px-3 mb-3">{section.title}</p>
            {visibleItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                badgeColor={item.badgeColor}
                isActive={currentPath === item.href || currentPath.startsWith(item.href + "/")}
                isLocked={item.permission !== undefined && !can(userRole, item.permission)}
                onClick={onItemClick}
              />
            ))}
          </div>
        );
      })}
    </nav>
  );
}
