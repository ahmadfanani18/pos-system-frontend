"use client";

import { Bell, MessageSquare, HelpCircle, Plus } from "lucide-react";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      {/* Quick Action: New Sale */}
      <button className="hidden sm:flex items-center gap-2 h-10 px-4 bg-success-500 hover:bg-success-600 text-white rounded-xl transition-colors">
        <Plus className="w-4 h-4" />
        <span className="font-semibold text-sm">New Sale</span>
      </button>

      {/* Divider */}
      <div className="w-px h-8 bg-slate-100 mx-2" />

      {/* Notifications */}
      <button className="header-item relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-500">
        <Bell className="w-5 h-5" />
        <span className="notification-dot" />
      </button>

      {/* Messages */}
      <button className="header-item w-10 h-10 rounded-xl flex items-center justify-center text-slate-500">
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* Help */}
      <button className="header-item w-10 h-10 rounded-xl flex items-center justify-center text-slate-500">
        <HelpCircle className="w-5 h-5" />
      </button>

      {/* Divider */}
      <div className="w-px h-8 bg-slate-100 mx-2" />
    </div>
  );
}
