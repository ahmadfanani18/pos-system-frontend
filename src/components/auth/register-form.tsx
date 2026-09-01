"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdPerson,
  MdStore,
  MdPhone,
} from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import { authApi } from "@/lib/api";
import { useToast } from "@/lib/toast";
import { cookieStorage } from "@/lib/cookie-storage";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    storeName: z.string().min(2, "Nama toko minimal 2 karakter"),
    phone: z.string().optional(),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      cookieStorage.set("accessToken", response.accessToken, { expires: 1 });
      cookieStorage.set("refreshToken", response.refreshToken, { expires: 7 });
      toast({ type: "success", description: "Akun berhasil dibuat!" });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Registrasi gagal";
      toast({ type: "error", description: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    toast({ type: "error", description: "Registrasi dengan Google belum tersedia" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Nama Lengkap Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-slate-700 mb-2"
        >
          Nama Lengkap
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MdPerson className="w-5 h-5 text-slate-400" />
          </div>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Budi Santoso"
            className="input-field w-full h-11 pl-12 pr-4 rounded-xl text-slate-800 text-sm"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
        )}
      </div>

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
            className="input-field w-full h-11 pl-12 pr-4 rounded-xl text-slate-800 text-sm"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
        )}
      </div>

      {/* Row: Nama Toko & No. Telepon */}
      <div className="grid grid-cols-2 gap-3">
        {/* Nama Toko Field */}
        <div>
          <label
            htmlFor="storeName"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Nama Toko
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdStore className="w-4 h-4 text-slate-400" />
            </div>
            <input
              {...register("storeName")}
              type="text"
              id="storeName"
              placeholder="Toko Budi"
              className="input-field w-full h-11 pl-10 pr-3 rounded-xl text-slate-800 text-sm"
            />
          </div>
          {errors.storeName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.storeName.message}
            </p>
          )}
        </div>

        {/* No. Telepon Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            No. Telepon
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdPhone className="w-4 h-4 text-slate-400" />
            </div>
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              placeholder="081234567890"
              className="input-field w-full h-11 pl-10 pr-3 rounded-xl text-slate-800 text-sm"
            />
          </div>
        </div>
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
            placeholder="Minimal 6 karakter"
            className="input-field w-full h-11 pl-12 pr-14 rounded-xl text-slate-800 text-sm"
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
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Konfirmasi Password Field */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold text-slate-700 mb-2"
        >
          Konfirmasi Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MdLock className="w-5 h-5 text-slate-400" />
          </div>
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Ulangi password"
            className="input-field w-full h-11 pl-12 pr-14 rounded-xl text-slate-800 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showConfirmPassword ? (
              <MdVisibilityOff className="w-5 h-5" />
            ) : (
              <MdVisibility className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full h-12 text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer mt-2 text-sm"
      >
        {isLoading ? <span>Memproses...</span> : <span>Daftar Sekarang</span>}
      </button>
    </form>
  );
}
