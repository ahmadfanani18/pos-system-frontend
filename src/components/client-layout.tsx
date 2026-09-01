"use client";

import { ToastProvider } from "@/lib/toast";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <Toaster />
    </ToastProvider>
  );
}
