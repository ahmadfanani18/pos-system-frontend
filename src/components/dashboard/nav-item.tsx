"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface NavItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string | number;
  badgeColor?: "default" | "success" | "warning" | "danger";
  isActive?: boolean;
  isLocked?: boolean;
  onClick?: () => void;
}

const badgeColorClasses = {
  default: "bg-slate-100 text-slate-600",
  success: "bg-success-500 text-white",
  warning: "bg-amber-500 text-white",
  danger: "bg-destructive-500 text-white",
};

export function NavItem({
  href,
  icon: Icon,
  label,
  badge,
  badgeColor = "default",
  isActive = false,
  isLocked = false,
  onClick,
}: NavItemProps) {
  const content = (
    <>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1 font-semibold text-sm truncate">{label}</span>
      {badge !== undefined && (
        <span
          className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full",
            badgeColorClasses[badgeColor]
          )}
        >
          {badge}
        </span>
      )}
      {isLocked && <ChevronDown className="w-4 h-4 text-slate-400" />}
    </>
  );

  if (isLocked) {
    return (
      <button
        type="button"
        disabled
        className={cn(
          "w-full relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500",
          "opacity-50 cursor-not-allowed select-none"
        )}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
        "hover:bg-primary-50 hover:text-slate-700",
        isActive
          ? "bg-primary-100 text-primary-600 font-semibold"
          : "text-slate-600"
      )}
      onClick={onClick}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary-600 rounded-r" />
      )}
      {content}
    </Link>
  );
}
