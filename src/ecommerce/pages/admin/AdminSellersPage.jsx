import React, { useState } from "react";
import { Store, Search, CheckCircle2, XCircle } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function AdminSellersPage() {
  const { sellers, approveSeller, rejectSeller } = useStore();
  const [search, setSearch] = useState("");

  const filtered = sellers.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.storeName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Merchant Applications & Moderation
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Audit merchant legal information: Name, Age, Email, Mobile, Store Name, and GSTIN compliance.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search seller or store..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-white/[0.05] border border-slate-300 dark:border-white/10"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-300 font-bold uppercase">
            <tr>
              <th className="p-3 rounded-l-xl">Seller ID</th>
              <th className="p-3">Merchant Name & Age</th>
              <th className="p-3">Contact (Mobile & Email)</th>
              <th className="p-3">Store Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">GSTIN / Tax ID</th>
              <th className="p-3">Listings</th>
              <th className="p-3">Status</th>
              <th className="p-3 rounded-r-xl">Audit Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {filtered.map((s) => (
              <tr key={s.id}>
                <td className="p-3 font-mono font-bold text-emerald-600">{s.id}</td>
                <td className="p-3">
                  <div className="font-bold text-slate-900 dark:text-white">{s.name}</div>
                  <div className="text-[11px] text-slate-500">Age: {s.age || 32} yrs</div>
                </td>
                <td className="p-3">
                  <div className="font-mono text-slate-800 dark:text-zinc-200">{s.mobile}</div>
                  <div className="text-[11px] text-cyan-600">{s.email}</div>
                </td>
                <td className="p-3 font-bold text-slate-900 dark:text-white">{s.storeName}</td>
                <td className="p-3 text-slate-500">{s.category}</td>
                <td className="p-3 font-mono text-slate-700 dark:text-zinc-300">{s.gstin || "27AAACN1234D1Z8"}</td>
                <td className="p-3 font-bold">{s.totalListings || 6}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      s.status === "Approved"
                        ? "bg-emerald-500/15 text-emerald-600"
                        : s.status === "Rejected"
                        ? "bg-rose-500/15 text-rose-600"
                        : "bg-amber-500/15 text-amber-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1.5">
                    {s.status !== "Approved" && (
                      <button
                        onClick={() => approveSeller(s.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 text-[10px] font-bold cursor-pointer"
                      >
                        Approve
                      </button>
                    )}
                    {s.status !== "Rejected" && (
                      <button
                        onClick={() => rejectSeller(s.id)}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 text-[10px] font-bold cursor-pointer"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
