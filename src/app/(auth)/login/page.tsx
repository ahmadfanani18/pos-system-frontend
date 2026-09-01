"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <LoginForm />
    </GoogleOAuthProvider>
  );
}
