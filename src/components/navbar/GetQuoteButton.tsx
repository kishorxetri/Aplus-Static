"use client";

interface GetQuoteButtonProps {
  onClick?: () => void;
  className?: string;
  isFullWidth?: boolean;
}

export default function GetQuoteButton({
  onClick,
  className = "",
  isFullWidth = false,
}: GetQuoteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center font-bold text-white bg-[#DC2626] hover:bg-[#b91c1c] active:bg-[#991b1b] transition-all rounded-lg shadow-xs hover:shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DC2626] shrink-0 whitespace-nowrap tracking-wide ${
        isFullWidth
          ? "w-full py-3 text-base"
          : "h-9 lg:h-10 px-4 lg:px-5 text-xs lg:text-sm"
      } ${className}`}
    >
      Get a Quote
    </button>
  );
}
