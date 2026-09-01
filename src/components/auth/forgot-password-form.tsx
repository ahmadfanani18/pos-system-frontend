"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdEmail, MdArrowBack, MdCheck } from "react-icons/md";
import { BiError, BiMailSend } from "react-icons/bi";
import { authApi } from "@/lib/api";
import { useToast } from "@/lib/toast";

const forgotSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    try {
      await authApi.forgotPassword(data.email);
      setIsSuccess(true);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Gagal mengirim reset link";
      toast({ type: "error", description: message });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <MdCheck className="w-8 h-8 text-success-500" />
        </div>
        <h3 className="font-display text-xl font-bold text-slate-800 mb-2">
          Link Terkirim!
        </h3>
        <p className="text-slate-500 text-sm mb-6">
          Kami telah mengirimkan link reset password ke email Anda. Silakan
          cek inbox atau folder spam.
        </p>
        <a
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-700"
        >
          <MdArrowBack className="w-4 h-4" />
          Kembali ke login
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700 mb-2"
        >
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MdEmail className="w-5 h-5 text-slate-400" />
          </div>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="admin@toko.com"
            className="input-field w-full h-12 pl-12 pr-4 rounded-xl text-slate-800 text-sm"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full h-12 text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer mt-6 text-sm"
      >
        {isLoading ? <span>Mengirim...</span> : <span>Kirim Link Reset</span>}
      </button>

      {/* Back to Login */}
      <div className="mt-6 text-center">
        <a
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <MdArrowBack className="w-4 h-4" />
          <span>Kembali ke halaman login</span>
        </a>
      </div>
    </form>
  );
}
