"use client";

import { useState } from "react";
import {
  Truck,
  MapPin,
  ShieldCheck,
  RotateCcw,
  BadgeCheck,
  CreditCard,
  Clock,
} from "lucide-react";
import { Product } from "@/data/products";

interface ProductDeliverySidebarProps {
  product: Product;
}

const DELIVERY_LOCATIONS = [
  { id: "ktm-ring", name: "Kathmandu (Inside Ring Road)", days: "1 Business Day", cost: "Rs. 150" },
  { id: "ktm-out", name: "Kathmandu / Lalitpur / Bhaktapur Suburbs", days: "1–2 Business Days", cost: "Rs. 200" },
  { id: "pokhara", name: "Pokhara / Chitwan / Butwal", days: "2–3 Business Days", cost: "Rs. 350" },
  { id: "nationwide", name: "All Major Cities (Nationwide Freight)", days: "3–5 Business Days", cost: "Calculated at dispatch" },
];

export default function ProductDeliverySidebar({ product }: ProductDeliverySidebarProps) {
  const [selectedLocId, setSelectedLocId] = useState("ktm-ring");
  const currentLocation = DELIVERY_LOCATIONS.find((l) => l.id === selectedLocId) || DELIVERY_LOCATIONS[0];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 1. Delivery & Logistics Options */}
      <div className="bg-white rounded-sm border border-neutral-200 p-4 sm:p-4.5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Truck className="w-4.5 h-4.5 text-[#DC2626] stroke-[2]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-950">
              Delivery & Logistics
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
            Available Nationwide
          </span>
        </div>

        {/* Location Dropdown */}
        <div>
          <label className="text-[13px] font-semibold text-neutral-800 block mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-neutral-700 stroke-[2]" />
            <span>Deliver to Location:</span>
          </label>
          <select
            value={selectedLocId}
            onChange={(e) => setSelectedLocId(e.target.value)}
            className="w-full px-3 py-2 text-[13.5px] font-semibold text-neutral-950 bg-neutral-50 border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#DC2626] focus:border-[#DC2626] cursor-pointer"
          >
            {DELIVERY_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Delivery Estimate Row */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-neutral-700 stroke-[2] shrink-0 mt-0.5" />
              <div>
                <div className="text-[13.5px] font-bold text-neutral-950">
                  Standard Delivery ({currentLocation.days})
                </div>
                <div className="text-xs sm:text-[12.5px] text-neutral-700 font-medium mt-0.5">
                  Institutional dispatch from Kathmandu central warehouse
                </div>
              </div>
            </div>
            <span className="text-[13.5px] font-bold text-neutral-950 shrink-0">
              {currentLocation.cost}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-neutral-800 pt-1.5 border-t border-neutral-100">
            <CreditCard className="w-4 h-4 text-neutral-700 stroke-[2] shrink-0" />
            <span className="text-xs sm:text-[12.5px] font-medium text-neutral-800">
              Cash on Delivery (COD), Fonepay QR & Bank Wire accepted.
            </span>
          </div>
        </div>
      </div>

      {/* 2. Service & Authenticity Guarantees */}
      <div className="bg-white rounded-sm border border-neutral-200 p-4 sm:p-4.5 space-y-3.5 shadow-2xs">
        <div className="flex items-center gap-2 pb-2.5 border-b border-neutral-200">
          <ShieldCheck className="w-4.5 h-4.5 text-[#DC2626] stroke-[2]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-950">
            Service & Guarantees
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <BadgeCheck className="w-4.5 h-4.5 text-emerald-600 stroke-[2.2] shrink-0 mt-0.5" />
            <div>
              <div className="text-[13.5px] font-bold text-neutral-950">100% Authentic Product</div>
              <div className="text-xs sm:text-[12.5px] text-neutral-700 font-medium mt-0.5">
                Direct factory-certified commercial and athletic gear.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <RotateCcw className="w-4.5 h-4.5 text-neutral-700 stroke-[2.2] shrink-0 mt-0.5" />
            <div>
              <div className="text-[13.5px] font-bold text-neutral-950">7 Days Return / Exchange</div>
              <div className="text-xs sm:text-[12.5px] text-neutral-700 font-medium mt-0.5">
                Guaranteed replacement if defective upon delivery.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4.5 h-4.5 text-[#DC2626] stroke-[2.2] shrink-0 mt-0.5" />
            <div>
              <div className="text-[13.5px] font-bold text-neutral-950">
                {product.warranty || "1 Year Commercial Warranty"}
              </div>
              <div className="text-xs sm:text-[12.5px] text-neutral-700 font-medium mt-0.5">
                Official institutional maintenance & parts coverage.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
