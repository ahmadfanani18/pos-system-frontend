"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BiCheckCircle, BiError } from "react-icons/bi";
import { authApi } from "@/lib/api";
import { useToast } from "@/lib/toast";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(data.email, data.password);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      setIsSuccess(true);
      toast({ type: "success", description: "Login berhasil! Mengalihkan..." });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Email atau password salah";
      setError("email", { message });
      setError("password", { message });
      toast({ type: "error", description: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast({ type: "error", description: "Google login belum tersedia" });
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      {/* Google SSO Button */}
      <button
        onClick={handleGoogleLogin}
        className="btn-google w-full h-12 rounded-xl flex items-center justify-center gap-3 cursor-pointer"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="text-sm font-semibold text-slate-700">
          Masuk dengan Google
        </span>
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-sm text-slate-400">atau</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Form */}
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

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MdLock className="w-5 h-5 text-slate-400" />
            </div>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="input-field w-full h-12 pl-12 pr-14 rounded-xl text-slate-800 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? (
                <MdVisibilityOff className="w-5 h-5" />
              ) : (
                <MdVisibility className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-2 border-slate-200 bg-white cursor-pointer"
            />
            <span className="text-sm text-slate-500">Ingat saya</span>
          </label>
          <a
            href="/forgot-password"
            className="text-sm font-medium text-primary-500 hover:text-primary-700 transition-colors"
          >
            Lupa password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full h-12 text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer mt-6 text-sm"
        >
          {isLoading ? (
            <>
              <span>Memproses...</span>
            </>
          ) : (
            <span>Masuk</span>
          )}
        </button>
      </form>

      {/* Success Toast */}
      {isSuccess && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-success-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 max-w-sm">
            <BiCheckCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">Login berhasil! Mengalihkan...</p>
          </div>
        </div>
      )}
    </div>
  );
}
