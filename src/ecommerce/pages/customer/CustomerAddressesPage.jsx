import React, { useState } from "react";
import { MapPin, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function CustomerAddressesPage() {
  const { user, updateProfile } = useAuth();

  const [addresses, setAddresses] = useState(
    user?.addresses || [
      {
        id: "addr-1",
        label: "Home",
        isDefault: true,
        street: "Flat 402, Sunshine Heights, Worli Sea Face",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400018",
        phone: "+91 98765 43210",
      },
    ]
  );

  const [newAddr, setNewAddr] = useState({
    label: "Office",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.pincode) return;

    const item = {
      id: `addr-${Date.now()}`,
      label: newAddr.label,
      isDefault: false,
      street: newAddr.street,
      city: newAddr.city,
      state: newAddr.state || "Maharashtra",
      pincode: newAddr.pincode,
      phone: user?.mobile || "+91 98765 43210",
    };

    const updated = [...addresses, item];
    setAddresses(updated);
    updateProfile({ addresses: updated });
    setShowAddForm(false);
    setNewAddr({ label: "Office", street: "", city: "", state: "", pincode: "" });
    toast.success("Delivery address added");
  };

  const handleDelete = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    updateProfile({ addresses: updated });
    toast.success("Address removed");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
            Delivery Addresses
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Manage your saved shipping destinations for one-click checkout.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Address</span>
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAddAddress}
          className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col gap-4"
        >
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Add New Delivery Location
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Label (Home / Office / Other)
              </label>
              <input
                type="text"
                value={newAddr.label}
                onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                PIN Code
              </label>
              <input
                type="text"
                required
                placeholder="400018"
                value={newAddr.pincode}
                onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Street Address
              </label>
              <input
                type="text"
                required
                placeholder="Building, Street, Landmark"
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                City
              </label>
              <input
                type="text"
                required
                placeholder="City"
                value={newAddr.city}
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                State
              </label>
              <input
                type="text"
                placeholder="State"
                value={newAddr.state}
                onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-fit px-5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs mt-2"
          >
            Save Address
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase">
                  {addr.label}
                </span>
                {addr.isDefault && (
                  <span className="text-[10px] text-emerald-600 font-bold">Default</span>
                )}
              </div>
              <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                {addr.street}<br />
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <div className="text-[11px] text-slate-500 mt-2 font-mono">
                Phone: {addr.phone}
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => handleDelete(addr.id)}
                className="text-xs text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
