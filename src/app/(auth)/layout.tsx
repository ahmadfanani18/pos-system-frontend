'use client';

import { ReactNode } from "react";
import {
  BarChart3,
  Package,
  Users,
  LucideIcon,
} from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

const features: { icon: LucideIcon; text: string }[] = [
  { icon: BarChart3, text: "Laporan penjualan real-time" },
  { icon: Package, text: "Kelola inventory otomatis" },
  { icon: Users, text: "Multi-kasir & izin akses" },
];

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#grid)" />
          </svg>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full" />
        <div className="absolute bottom-40 left-10 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-white/5 rounded-full" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 py-12 text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">POS System</h1>
            <p className="text-primary-100 text-lg leading-relaxed max-w-md">
              Kelola toko Anda dengan lebih efisien. Lacak penjualan,
              inventory, dan laporan keuangan dalam satu platform.
            </p>
          </div>

          {/* Feature Icons */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-primary-50">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
    </div>
  );
}
