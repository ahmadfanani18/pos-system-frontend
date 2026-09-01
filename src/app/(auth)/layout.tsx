"use client";

import { ReactNode } from "react";
import { CheckCircle, BarChart3, Users, Shield, Smartphone } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

const features = [
  { icon: BarChart3, text: "Real-time sales analytics" },
  { icon: Users, text: "Multi-branch support" },
  { icon: Shield, text: "Secure cloud storage" },
  { icon: Smartphone, text: "Mobile-friendly interface" },
];

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">POS System</h1>
          <p className="mt-2 text-blue-100">
            Manage your business smarter, faster, better
          </p>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-white">
            Everything you need to run your business
          </h2>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-white">
                <CheckCircle className="h-5 w-5 text-blue-200" />
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-blue-200">
          Trusted by 10,000+ businesses worldwide
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
