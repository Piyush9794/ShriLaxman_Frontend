import React from "react";
import { CreditCard, Building, CheckCircle2, Clock, ArrowDownLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function SellerEarningsPage() {
  const { user } = useAuth();

  const payouts = [
    {
      id: "pay-101",
      date: "2026-10-01",
      amount: 142500,
      bank: user?.bankAccount || "HDFC0001234 •••• 9821",
      status: "Settled",
      utr: "CMS/UTR/990218401",
    },
    {
      id: "pay-102",
      date: "2026-09-15",
      amount: 98400,
      bank: user?.bankAccount || "HDFC0001234 •••• 9821",
      status: "Settled",
      utr: "CMS/UTR/884910281",
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Earnings & Bank Settlements
        </h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          Automatic bi-weekly bank deposits processed according to Indian e-commerce merchant standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950 to-slate-900 text-white border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
              Available Balance
            </span>
            <div className="text-3xl font-extrabold font-display mt-2">
              ₹48,250
            </div>
          </div>
          <div className="text-[11px] text-zinc-300 mt-4">
            Next settlement scheduled for: <span className="text-white font-bold">15th October 2026</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Total Lifetime Disbursed
            </span>
            <div className="text-3xl font-extrabold font-display text-slate-900 dark:text-white mt-2">
              ₹2,40,900
            </div>
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-4">
            ✓ 100% On-time RTGS payouts
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Payout Destination
            </span>
            <div className="font-mono font-bold text-sm text-slate-900 dark:text-white mt-2">
              {user?.bankAccount || "HDFC0001234 •••• 9821"}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              UPI: <span className="font-mono text-cyan-600 dark:text-cyan-400">{user?.upiId || "techcraft@okhdfcbank"}</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-4">
            Verified with NPCI Bank mandate
          </div>
        </div>
      </div>

      {/* Payout History Ledger */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
        <h2 className="font-bold font-display text-base text-slate-900 dark:text-white">
          Historical Settlement Disbursals
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-300 font-bold uppercase">
              <tr>
                <th className="p-3 rounded-l-xl">Reference ID</th>
                <th className="p-3">Disbursal Date</th>
                <th className="p-3">Beneficiary Account</th>
                <th className="p-3">Bank UTR Number</th>
                <th className="p-3">Amount</th>
                <th className="p-3 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {payouts.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 font-mono font-bold text-emerald-600">{p.id}</td>
                  <td className="p-3 text-slate-600 dark:text-zinc-400">{p.date}</td>
                  <td className="p-3 font-mono text-slate-800 dark:text-zinc-200">{p.bank}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-500">{p.utr}</td>
                  <td className="p-3 font-extrabold text-slate-900 dark:text-white">
                    ₹{p.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600">
                      {p.status} ✓
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
