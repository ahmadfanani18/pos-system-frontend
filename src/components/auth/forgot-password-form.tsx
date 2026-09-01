"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { authApi } from "@/lib/api";
import { useToast } from "@/lib/toast";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await authApi.forgotPassword(data.email);
      setIsSuccess(true);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send reset email. Please try again.";
      toast("error", message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            We sent a password reset link to your email address.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Reset password</h1>
        <p className="text-sm text-gray-500">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send reset link"
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        Remember your password?{" "}
        <a
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}
