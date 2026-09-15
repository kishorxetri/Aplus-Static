"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Tag,
  MapPin,
  Building2,
  User,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  HelpCircle,
  Printer,
  ShoppingBag,
} from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";

const NEPAL_PROVINCES = [
  "Bagmati Province (Kathmandu, Lalitpur, Bhaktapur, Chitwan, etc.)",
  "Gandaki Province (Pokhara, Kaski, Tanahun, etc.)",
  "Koshi Province (Biratnagar, Dharan, Jhapa, etc.)",
  "Lumbini Province (Butwal, Bhairahawa, Dang, Nepalgunj, etc.)",
  "Madhesh Province (Janakpur, Birgunj, etc.)",
  "Karnali Province (Surkhet, Jumla, etc.)",
  "Sudurpashchim Province (Dhangadhi, Mahendranagar, etc.)",
];

export default function CheckoutContent() {
  const { items, clearCart, removeFromCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    isCompany: false,
    companyName: "",
    panVatNumber: "",
    province: NEPAL_PROVINCES[0],
    city: "Kathmandu",
    address: "",
    orderNotes: "",
    paymentMethod: "cod", // Cash on Delivery default as requested
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
    discountAmount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Order Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<{
    orderId: string;
    placedAt: string;
    items: CartItem[];
    totalAmount: number;
    shippingAddress: string;
    recipientName: string;
    recipientPhone: string;
    recipientEmail: string;
    companyName?: string;
    panVat?: string;
    paymentMethod: string;
  } | null>(null);

  // Financial calculations
  const originalSubtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const orig = item.product.originalPrice || item.product.price;
      return sum + orig * item.quantity;
    }, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  const totalUnits = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const productSavings = Math.max(0, originalSubtotal - subtotal);

  const couponDiscount = appliedCoupon
    ? (subtotal * appliedCoupon.discountPercent) / 100
    : 0;

  const finalGrandTotal = Math.max(0, subtotal - couponDiscount);
  const vatAmount = Math.round((finalGrandTotal * 13) / 113);

  // Handle Coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a voucher code.");
      return;
    }

    if (code === "APLUS10" || code === "WELCOME10") {
      const discountPercent = 10;
      const discountAmount = (subtotal * discountPercent) / 100;
      setAppliedCoupon({ code, discountPercent, discountAmount });
      setCouponSuccess(`Voucher "${code}" applied! 10% discount added.`);
      setCouponCode("");
    } else if (code === "TENDER2026" || code === "B2B5") {
      const discountPercent = 5;
      const discountAmount = (subtotal * discountPercent) / 100;
      setAppliedCoupon({ code, discountPercent, discountAmount });
      setCouponSuccess(`Institutional voucher "${code}" applied! 5% discount added.`);
      setCouponCode("");
    } else {
      setCouponError("Invalid voucher code. Try 'APLUS10' or 'TENDER2026'.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess("");
    setCouponError("");
  };

  // Submit Order
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    const generatedOrderId = `APL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const placedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setTimeout(() => {
      setOrderPlaced({
        orderId: generatedOrderId,
        placedAt: placedDate,
        items: [...items],
        totalAmount: finalGrandTotal,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.province}`,
        recipientName: formData.fullName,
        recipientPhone: formData.phone,
        recipientEmail: formData.email,
        companyName: formData.isCompany ? formData.companyName : undefined,
        panVat: formData.isCompany ? formData.panVatNumber : undefined,
        paymentMethod: "Cash / Cheque on Delivery (COD)",
      });

      setIsSubmitting(false);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  // =========================================================================
  // 1. ORDER CONFIRMATION / SUCCESS VIEW
  // =========================================================================
  if (orderPlaced) {
    return (
      <section className="w-full py-8 sm:py-12 lg:py-16 bg-neutral-100/70 font-sans">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-neutral-300 shadow-sm overflow-hidden">
            {/* Success Top Header */}
            <div className="bg-emerald-600 text-white p-6 sm:p-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto ring-8 ring-white/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                  Order Successfully Placed!
                </h2>
                <p className="text-emerald-50 text-xs sm:text-sm max-w-md mx-auto">
                  Thank you for procuring with Aplus Business Link. Your order has been registered in our system under reference number:
                </p>
                <div className="inline-block bg-white/15 px-3.5 py-1.5 rounded-lg font-mono font-bold text-base sm:text-lg tracking-wider mt-2 border border-white/20">
                  {orderPlaced.orderId}
                </div>
              </div>
            </div>

            {/* Order Details Body */}
            <div className="p-5 sm:p-8 space-y-6">
              {/* Alert Note */}
              <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-neutral-800 space-y-1">
                  <p className="font-bold text-neutral-950">
                    What happens next?
                  </p>
                  <p className="text-neutral-800 leading-relaxed font-normal">
                    Our sales representative will call you at <strong className="text-neutral-950 font-bold">{orderPlaced.recipientPhone}</strong> shortly to confirm the physical inventory availability and provide the exact delivery schedule with your official VAT invoice.
                  </p>
                </div>
              </div>

              {/* Order Summary Breakdown */}
              <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-200">
                <div className="bg-neutral-50 px-4 py-3 font-bold text-xs sm:text-sm text-neutral-950 flex justify-between">
                  <span>Purchased Equipment ({orderPlaced.items.length} products)</span>
                  <span>Amount</span>
                </div>
                <div className="p-4 space-y-3">
                  {orderPlaced.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs sm:text-sm gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-neutral-950 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-neutral-700 font-medium">
                            Quantity: {item.quantity} unit{item.quantity > 1 ? "s" : ""} × Rs. {item.product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-neutral-950 shrink-0">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals Box */}
                <div className="bg-neutral-50 p-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-neutral-800 font-medium">
                    <span>Payment Method:</span>
                    <span className="font-bold text-neutral-950">Cash on Delivery (COD)</span>
                  </div>
                  <div className="flex justify-between text-neutral-800 font-medium">
                    <span>Delivery Location:</span>
                    <span className="font-bold text-neutral-950 text-right max-w-xs truncate">
                      {orderPlaced.shippingAddress}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-800 font-medium">
                    <span>VAT Invoicing (13%):</span>
                    <span className="font-bold text-neutral-900">Included in Bill</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                    <span>Grand Total Payable:</span>
                    <span className="text-[#DC2626] font-bold text-base sm:text-lg">
                      Rs. {orderPlaced.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue Browsing Equipment</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 2. EMPTY CART CHECKOUT REDIRECT VIEW
  // =========================================================================
  if (items.length === 0) {
    return (
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-neutral-100/70 font-sans">
        <div className="max-w-lg mx-auto px-4 text-center space-y-5 bg-white p-8 sm:p-12 rounded-2xl border border-neutral-300 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-red-50 text-[#DC2626] border-2 border-red-200 flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10 stroke-[1.8]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
              Your Checkout is Empty
            </h2>
            <p className="text-sm sm:text-base text-neutral-900 font-medium leading-relaxed max-w-sm mx-auto">
              There are no products in your procurement cart. Add equipment from our catalog before checking out.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white text-sm sm:text-base font-bold rounded-lg shadow-sm transition-all"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 3. MAIN CHECKOUT FORM & ORDER REVIEW
  // =========================================================================
  return (
    <section className="w-full pt-4 pb-28 sm:pt-6 sm:pb-32 lg:py-10 bg-neutral-100/70 font-sans">
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 xl:gap-9 items-start">
          {/* ============================================================= */}
          {/* LEFT 7-8 COLUMNS: Customer Details, Address, COD Payment     */}
          {/* ============================================================= */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6">
            {/* Step 1: Customer Contact Information */}
            <div className="bg-white rounded-xl border border-neutral-300 shadow-xs p-4 sm:p-6 space-y-5">
              <div className="flex items-center gap-3 pb-3.5 border-b border-neutral-200">
                <div className="w-9 h-9 rounded-full bg-red-50 text-[#DC2626] font-black text-base flex items-center justify-center border border-red-200 shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950">
                    Contact & Recipient Information
                  </h3>
                  <p className="text-sm sm:text-[15px] text-neutral-800 font-medium">
                    Used for order status verification and dispatch updates
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                {/* Full Name */}
                <div>
                  <label className="text-sm sm:text-base font-bold text-neutral-950 block mb-1.5">
                    Full Name / Contact Person <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Shrestha"
                      className="w-full pl-11 pr-4 py-3.5 text-sm sm:text-base bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-950 placeholder:text-neutral-500 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] transition-all"
                    />
                    <User className="w-5 h-5 text-neutral-600 absolute left-3.5 top-4" />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-sm sm:text-base font-bold text-neutral-950 block mb-1.5">
                    Phone / Mobile Number <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9841XXXXXX / 9801XXXXXX"
                      className="w-full pl-11 pr-4 py-3.5 text-sm sm:text-base bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-950 placeholder:text-neutral-500 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] transition-all"
                    />
                    <Phone className="w-5 h-5 text-neutral-600 absolute left-3.5 top-4" />
                  </div>
                </div>

                {/* Email Address */}
                <div className="sm:col-span-2">
                  <label className="text-sm sm:text-base font-bold text-neutral-950 block mb-1.5">
                    Email Address (for Official VAT Bill & Tracking) <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh.procurement@example.com"
                      className="w-full pl-11 pr-4 py-3.5 text-sm sm:text-base bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-950 placeholder:text-neutral-500 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] transition-all"
                    />
                    <Mail className="w-5 h-5 text-neutral-600 absolute left-3.5 top-4" />
                  </div>
                </div>
              </div>

              {/* Organization / Corporate VAT Invoice Toggle */}
              <div className="pt-2.5 border-t border-neutral-200">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.isCompany}
                    onChange={(e) => setFormData({ ...formData, isCompany: e.target.checked })}
                    className="w-5 h-5 rounded border-neutral-300 text-[#DC2626] focus:ring-[#DC2626] accent-[#DC2626] cursor-pointer"
                  />
                  <span className="text-sm sm:text-base font-bold text-neutral-950">
                    Buying on behalf of an Organization, School, Club, or Business? (Official Tax Invoicing)
                  </span>
                </label>

                {formData.isCompany && (
                  <div className="mt-3.5 p-4.5 bg-neutral-50 border border-neutral-200 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
                    <div>
                      <label className="text-sm font-bold text-neutral-950 block mb-1.5">
                        Registered Company / School / Club Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Acme Sports Academy Pvt. Ltd."
                        className="w-full px-4 py-3 text-sm sm:text-[15px] bg-white border border-neutral-300 rounded-lg text-neutral-950 font-medium focus:outline-none focus:border-[#DC2626]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-neutral-950 block mb-1.5">
                        9-Digit PAN / VAT Number
                      </label>
                      <input
                        type="text"
                        value={formData.panVatNumber}
                        onChange={(e) => setFormData({ ...formData, panVatNumber: e.target.value })}
                        placeholder="e.g. 600123456"
                        className="w-full px-4 py-3 text-sm sm:text-[15px] bg-white border border-neutral-300 rounded-lg text-neutral-950 font-mono font-bold focus:outline-none focus:border-[#DC2626]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Delivery & Shipping Address */}
            <div className="bg-white rounded-xl border border-neutral-300 shadow-xs p-4 sm:p-6 space-y-5">
              <div className="flex items-center gap-3 pb-3.5 border-b border-neutral-200">
                <div className="w-9 h-9 rounded-full bg-red-50 text-[#DC2626] font-black text-base flex items-center justify-center border border-red-200 shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950">
                    Delivery & Freight Destination
                  </h3>
                  <p className="text-sm sm:text-[15px] text-neutral-800 font-medium">
                    We deliver across Kathmandu Valley and nationwide to all 7 Provinces
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                {/* Province Selector */}
                <div className="sm:col-span-2">
                  <label className="text-sm sm:text-base font-bold text-neutral-950 block mb-1.5">
                    Province <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-4 py-3.5 text-sm sm:text-base bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-950 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] cursor-pointer"
                  >
                    {NEPAL_PROVINCES.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City / District */}
                <div>
                  <label className="text-sm sm:text-base font-bold text-neutral-950 block mb-1.5">
                    City / District <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Kathmandu / Lalitpur / Pokhara"
                    className="w-full px-4 py-3.5 text-sm sm:text-base bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-950 placeholder:text-neutral-500 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                  />
                </div>

                {/* Street Address / Landmark */}
                <div>
                  <label className="text-sm sm:text-base font-bold text-neutral-950 block mb-1.5">
                    Street Address / Nearby Landmark <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Ward 4, Baluwatar (Near Central Bank)"
                    className="w-full px-4 py-3.5 text-sm sm:text-base bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-950 placeholder:text-neutral-500 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                  />
                </div>

                {/* Special Delivery Instructions / Notes */}
                <div className="sm:col-span-2">
                  <label className="text-sm sm:text-base font-bold text-neutral-950 block mb-1.5">
                    Special Freight or Delivery Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.orderNotes}
                    onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                    placeholder="e.g. Please deliver after 2:00 PM, call upon arrival at the main gate, or unloading instructions."
                    className="w-full px-4 py-3 text-sm sm:text-base bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-950 placeholder:text-neutral-500 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method (Cash on Delivery Focused) */}
            <div className="bg-white rounded-xl border border-neutral-300 shadow-xs p-4 sm:p-6 space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-[#DC2626] font-black text-base flex items-center justify-center border border-red-200 shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-950">
                      Payment Method
                    </h3>
                    <p className="text-sm sm:text-[15px] text-neutral-800 font-medium">
                      Safe & verified payment upon physical arrival
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Zero Advance Needed</span>
                </span>
              </div>

              {/* Cash on Delivery Selection Box */}
              <div className="space-y-3.5">
                <label className="relative flex items-start gap-4 p-5 rounded-xl border-2 border-[#DC2626] bg-red-50/20 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                    className="w-5 h-5 text-[#DC2626] border-neutral-300 focus:ring-[#DC2626] accent-[#DC2626] mt-0.5 cursor-pointer"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-bold text-neutral-950 flex items-center gap-2">
                        <Banknote className="w-5 h-5 text-emerald-700" />
                        <span>Cash / Cheque on Delivery (COD)</span>
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#DC2626] bg-red-50 px-2.5 py-0.5 rounded border border-red-200">
                        Default
                      </span>
                    </div>
                    <p className="text-sm sm:text-[15px] text-neutral-900 leading-relaxed font-normal">
                      Pay securely upon receipt and physical verification of your equipment. You can pay via <strong className="text-neutral-950 font-bold">Cash</strong>, <strong className="text-neutral-950 font-bold">Corporate Bank Cheque</strong>, or <strong className="text-neutral-950 font-bold">Fonepay QR Scan</strong> directly to the delivery representative.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ============================================================= */}
          {/* RIGHT 4-5 COLUMNS: Sticky Order Review & Cost Breakdown     */}
          {/* ============================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4 sm:space-y-5 lg:sticky lg:top-20">
            <div className="bg-white rounded-xl border border-neutral-300 shadow-sm p-4 sm:p-6 space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
                  Order Summary
                </h3>
                <span className="text-sm sm:text-[15px] font-bold text-neutral-800">
                  {totalUnits} {totalUnits === 1 ? "Unit" : "Units"} ({items.length} Items)
                </span>
              </div>

              {/* Items Mini List */}
              <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                      <span className="absolute bottom-0.5 right-0.5 bg-neutral-950 text-white text-[11px] font-bold px-1.5 py-0.5 rounded leading-none">
                        x{item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-neutral-950 text-sm sm:text-[15px] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-neutral-700 text-xs sm:text-sm font-semibold mt-0.5">
                        Rs. {item.product.price.toLocaleString()} /unit
                      </p>
                    </div>
                    <span className="font-bold text-neutral-950 text-sm sm:text-base shrink-0">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Voucher Code Form */}
              <div className="pt-3.5 border-t border-neutral-200 space-y-2">
                <label className="text-sm sm:text-[15px] font-bold text-neutral-950 block">
                  Have a Procurement Voucher?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. APLUS10"
                    className="flex-1 px-3.5 py-2.5 text-sm sm:text-[15px] bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-950 placeholder:text-neutral-500 font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-xs sm:text-sm text-red-600 font-bold">{couponError}</p>}
                {couponSuccess && <p className="text-xs sm:text-sm text-emerald-700 font-bold">{couponSuccess}</p>}
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="pt-3.5 border-t border-neutral-200 space-y-3.5 text-sm sm:text-[15.5px]">
                <div className="flex justify-between">
                  <span className="font-semibold text-neutral-800">List Price Subtotal:</span>
                  <span className="font-bold text-neutral-950">
                    Rs. {originalSubtotal.toLocaleString()}
                  </span>
                </div>

                {productSavings > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span className="font-semibold">Equipment Savings:</span>
                    <span className="font-bold">- Rs. {productSavings.toLocaleString()}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-900 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                    <span className="font-semibold">Voucher ({appliedCoupon.code}):</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold">- Rs. {couponDiscount.toLocaleString()}</span>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-neutral-500 hover:text-red-600 text-base font-bold cursor-pointer ml-1"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="font-semibold text-neutral-800">Delivery & Freight:</span>
                  <span className="font-bold text-emerald-800">Free in Valley*</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-neutral-800">Govt. 13% VAT Status:</span>
                  <span className="font-bold text-neutral-950">
                    Included (Rs. {vatAmount.toLocaleString()})
                  </span>
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-neutral-300 flex items-baseline justify-between">
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-neutral-950 block leading-tight">
                      Grand Total:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                      (Pay on Delivery via COD)
                    </span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#DC2626]">
                    Rs. {finalGrandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-4 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] disabled:opacity-50 text-white text-base sm:text-lg font-bold rounded-lg shadow-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                >
                  <Banknote className="w-5 h-5 stroke-[2.2]" />
                  <span>
                    {isSubmitting ? "Registering Order..." : "Confirm & Place COD Order"}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-neutral-800 font-medium text-center">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>No upfront payment required. Pay only after physical delivery.</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Mobile Sticky Floating CTA (< lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-300 px-4 py-3.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-xs font-bold text-neutral-700 block truncate leading-tight">
              Payable (COD):
            </span>
            <span className="text-lg sm:text-xl font-black text-[#DC2626] block leading-tight">
              Rs. {finalGrandTotal.toLocaleString()}
            </span>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={handleFormSubmit}
            className="px-5 py-3 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] disabled:opacity-50 text-white text-sm font-bold rounded-lg shadow-sm flex items-center gap-2 shrink-0 transition-all cursor-pointer"
          >
            <Banknote className="w-4.5 h-4.5 stroke-[2.2]" />
            <span>{isSubmitting ? "Submitting..." : "Place COD Order"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
