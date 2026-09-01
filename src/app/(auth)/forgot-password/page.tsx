"use client";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import AuthLayout from "../../layout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      {/* Mobile Logo */}
      <div className="lg:hidden text-center mb-8">
        <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-7 h-7 text-white"
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
        <h1 className="font-display text-xl font-bold text-slate-800">
          POS System
        </h1>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-slate-800 mb-2">
          Lupa Password
        </h2>
        <p className="text-slate-500 text-sm">
          Masukkan email Anda dan kami akan mengirimkan link untuk reset
          password
        </p>
      </div>

      <ForgotPasswordForm />

      {/* Footer */}
      <p className="text-center text-slate-400 text-xs mt-8">
        &copy; 2026 POS System. Hak cipta dilindungi.
      </p>
    </AuthLayout>
  );
}
