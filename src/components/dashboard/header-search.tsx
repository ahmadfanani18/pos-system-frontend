"use client";

import { Search } from "lucide-react";

export function HeaderSearch() {
  return (
    <div className="hidden lg:flex flex-1 max-w-md mx-8">
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari produk, transaksi, pelanggan..."
          className="search-input w-full h-11 pl-11 pr-4 bg-slate-50 border border-transparent rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs text-slate-400 font-medium">
          <span>/</span>
        </kbd>
      </div>
    </div>
  );
}
