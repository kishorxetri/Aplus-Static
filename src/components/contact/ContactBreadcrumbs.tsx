import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface ContactBreadcrumbsProps {
  currentPageTitle?: string;
}

export default function ContactBreadcrumbs({
  currentPageTitle = "Contact Us",
}: ContactBreadcrumbsProps) {
  return (
    <div className="w-full bg-white border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-[#DC2626] transition-colors"
          >
            <Home className="w-3.5 h-3.5 stroke-[2.25]" />
            <span>Home</span>
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2]" />

          <span className="text-[#DC2626] font-bold" aria-current="page">
            {currentPageTitle}
          </span>
        </nav>
      </div>
    </div>
  );
}
