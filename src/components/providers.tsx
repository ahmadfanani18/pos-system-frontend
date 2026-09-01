"use client";

import { ToastProvider } from "@/lib/toast";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <Toaster />
    </ToastProvider>
  );
}
