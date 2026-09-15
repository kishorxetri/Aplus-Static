"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { Product } from "@/data/products";

interface ProductGalleryProps {
  product: Product;
}

const ZOOM_FACTOR = 2.5; // Balanced crisp 2.5x magnification

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [lensPosition, setLensPosition] = useState({
    x: 0,
    y: 0,
    width: 140,
    height: 140,
    percentX: 0,
    percentY: 0,
  });

  // Mobile / Fullscreen Lightbox Modal States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Touch Swipe State for Mobile Carousel
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);

  // Main Image Container Ref
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const activeImage = images[selectedIndex] || product.image;

  // Handle Desktop Mouse Movement for Right-Side Flyout Zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Boundary check
    if (
      clientX < 0 ||
      clientX > rect.width ||
      clientY < 0 ||
      clientY > rect.height
    ) {
      setIsHovering(false);
      return;
    }

    // Lens dimensions proportional to center column aspect ratio (5:4 = 1.25)
    const lensH = Math.max(80, Math.min(rect.height * 0.38, 140));
    const lensW = lensH * 1.25;

    // Calculate lens position centered around mouse cursor
    let lensX = clientX - lensW / 2;
    let lensY = clientY - lensH / 2;

    // Clamp within image bounds
    lensX = Math.max(0, Math.min(lensX, rect.width - lensW));
    lensY = Math.max(0, Math.min(lensY, rect.height - lensH));

    // Normalized ratio (0 to 1) for zoom alignment
    const percentX = rect.width > lensW ? lensX / (rect.width - lensW) : 0;
    const percentY = rect.height > lensH ? lensY / (rect.height - lensH) : 0;

    setLensPosition({
      x: lensX,
      y: lensY,
      width: lensW,
      height: lensH,
      percentX,
      percentY,
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Mobile Touch Swipe Handlers for Main Image
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
    touchEndRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe && selectedIndex < images.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
    if (isRightSwipe && selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  // Lightbox Zoom & Navigation Controls
  const handleZoomIn = useCallback(() => {
    setLightboxZoom((prev) => Math.min(prev + 0.5, 3.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setLightboxZoom((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setLightboxZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const handleNextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
    handleResetZoom();
  }, [images.length, handleResetZoom]);

  const handlePrevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    handleResetZoom();
  }, [images.length, handleResetZoom]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handleNextImage, handlePrevImage, handleZoomIn, handleZoomOut]);

  // Prevent background scroll when Lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      handleResetZoom();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, handleResetZoom]);

  return (
    <div className="flex flex-col gap-2 w-full relative">
      {/* Main Image View Port */}
      <div
        ref={imageContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setIsLightboxOpen(true)}
        className="relative w-full aspect-square bg-neutral-50 rounded-sm sm:rounded-md border border-neutral-200 overflow-hidden cursor-crosshair sm:cursor-zoom-in group select-none transition-shadow hover:shadow-md"
      >
        {/* Active Product Image */}
        <Image
          src={activeImage}
          alt={`${product.name} - View ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 460px"
          priority
          className="object-cover transition-transform duration-200"
        />

        {/* Desktop Magnifying Lens Indicator (Follows cursor smoothly) */}
        {isHovering && (
          <div
            className="hidden lg:block absolute border border-[#DC2626]/80 bg-[#DC2626]/15 backdrop-blur-[0.5px] shadow-sm pointer-events-none rounded-xs z-20 transition-all duration-75"
            style={{
              width: `${lensPosition.width}px`,
              height: `${lensPosition.height}px`,
              left: `${lensPosition.x}px`,
              top: `${lensPosition.y}px`,
            }}
          />
        )}

        {/* Top-Left Discount Badge */}
        {product.discount && (
          <div className="absolute top-2.5 left-2.5 bg-[#DC2626] text-white text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-sm shadow-xs uppercase tracking-wider z-10 pointer-events-none">
            {product.discount} OFF
          </div>
        )}

        {/* Top-Right Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-2.5 right-2.5 bg-neutral-900/75 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-sm shadow-xs z-10 pointer-events-none">
            {selectedIndex + 1} / {images.length}
          </div>
        )}

        {/* Bottom Hint Bar: "Hover to zoom | Click to expand" */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2.5 pt-6 flex items-center justify-between opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 text-white text-[11px] sm:text-xs font-medium">
            <span className="hidden lg:inline-flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-neutral-200" />
              Hover to zoom | Click to expand
            </span>
            <span className="lg:hidden inline-flex items-center gap-1">
              Tap to expand
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="pointer-events-auto bg-white/95 hover:bg-white text-neutral-900 p-1.5 rounded-sm shadow-xs transition-colors cursor-pointer"
            title="Expand Fullscreen"
            aria-label="Expand Fullscreen"
          >
            <Maximize2 className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Desktop Zoom Flyout Window (Cleanly Covers the Center Product Info Section) */}
      {isHovering && (
        <div
          className="hidden lg:block absolute left-[calc(100%+1.5rem)] top-0 w-[calc(125%+0.375rem)] bg-white border border-neutral-300 rounded-sm sm:rounded-md shadow-xl z-50 overflow-hidden pointer-events-none animate-in fade-in duration-100"
          style={{
            height: imageContainerRef.current?.offsetHeight || "100%",
          }}
        >
          {/* Zoomed Background Surface (Pure Clean Magnified Image) */}
          <div
            className="w-full h-full bg-neutral-100"
            style={{
              backgroundImage: `url(${activeImage})`,
              backgroundPosition: `${lensPosition.percentX * 100}% ${lensPosition.percentY * 100}%`,
              backgroundSize: `${ZOOM_FACTOR * 100}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      )}


      {/* Multi-View Thumbnail Selector Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {images.map((imgUrl, idx) => {
            const isSelected = selectedIndex === idx;

            return (
              <button
                key={`${imgUrl}-${idx}`}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`relative w-16 h-16 sm:w-18 sm:h-18 shrink-0 rounded-sm bg-neutral-50 overflow-hidden transition-all cursor-pointer ${
                  isSelected
                    ? "border-2 border-[#DC2626] ring-2 ring-[#DC2626]/20 shadow-xs scale-[1.02]"
                    : "border border-neutral-200 hover:border-neutral-400 opacity-75 hover:opacity-100"
                }`}
                aria-label={`View angle ${idx + 1}`}
              >
                <Image
                  src={imgUrl}
                  alt={`${product.name} Thumbnail ${idx + 1}`}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
                {isSelected && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#DC2626]" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Responsive Fullscreen / Mobile Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High-Definition Image Viewer"
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none"
        >
          {/* Top Control Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between gap-3 text-white z-20">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-white tracking-tight truncate max-w-[200px] sm:max-w-md">
                {product.name}
              </span>
              <span className="text-xs text-neutral-400 font-medium px-2 py-0.5 bg-neutral-800 rounded-sm">
                {selectedIndex + 1} of {images.length}
              </span>
            </div>

            {/* Lightbox Toolbar Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={lightboxZoom >= 3.5}
                className="p-2 sm:px-2.5 sm:py-1.5 bg-neutral-800/90 hover:bg-neutral-700 text-white text-xs font-semibold rounded-sm border border-neutral-700 transition-colors disabled:opacity-40 cursor-pointer flex items-center gap-1"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
                <span className="hidden sm:inline">Zoom In</span>
              </button>

              <button
                type="button"
                onClick={handleZoomOut}
                disabled={lightboxZoom <= 1}
                className="p-2 sm:px-2.5 sm:py-1.5 bg-neutral-800/90 hover:bg-neutral-700 text-white text-xs font-semibold rounded-sm border border-neutral-700 transition-colors disabled:opacity-40 cursor-pointer flex items-center gap-1"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
                <span className="hidden sm:inline">Zoom Out</span>
              </button>

              <button
                type="button"
                onClick={handleResetZoom}
                className="p-2 sm:px-2.5 sm:py-1.5 bg-neutral-800/90 hover:bg-neutral-700 text-white text-xs font-semibold rounded-sm border border-neutral-700 transition-colors cursor-pointer flex items-center gap-1"
                title="Reset Zoom (1:1)"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 sm:px-3 sm:py-1.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer flex items-center gap-1 ml-2"
                title="Close Viewer (Esc)"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          {/* Central Interactive Image Canvas */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center overflow-hidden my-3 cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => {
              if (lightboxZoom > 1) {
                setIsDragging(true);
                dragStartRef.current = {
                  x: e.clientX - panOffset.x,
                  y: e.clientY - panOffset.y,
                };
              }
            }}
            onMouseMove={(e) => {
              if (isDragging && lightboxZoom > 1) {
                setPanOffset({
                  x: e.clientX - dragStartRef.current.x,
                  y: e.clientY - dragStartRef.current.y,
                });
              }
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onDoubleClick={() => {
              if (lightboxZoom === 1) {
                setLightboxZoom(2.2);
              } else {
                handleResetZoom();
              }
            }}
          >
            {/* Prev Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-2 sm:left-4 z-30 p-2.5 sm:p-3 rounded-full bg-neutral-900/80 hover:bg-[#DC2626] text-white border border-neutral-700 transition-all cursor-pointer shadow-lg"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-2 sm:right-4 z-30 p-2.5 sm:p-3 rounded-full bg-neutral-900/80 hover:bg-[#DC2626] text-white border border-neutral-700 transition-all cursor-pointer shadow-lg"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}

            {/* Lightbox Zoomable Image */}
            <div
              className="relative max-w-full max-h-full aspect-square w-[75vh] h-[75vh] transition-transform duration-100 ease-out"
              style={{
                transform: `scale(${lightboxZoom}) translate(${panOffset.x / lightboxZoom}px, ${panOffset.y / lightboxZoom}px)`,
              }}
            >
              <Image
                src={activeImage}
                alt={`${product.name} High Resolution Preview`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="w-full max-w-3xl flex flex-col items-center gap-2 z-20">
            <div className="text-neutral-400 text-xs flex items-center gap-2">
              <span>Zoom: {Math.round(lightboxZoom * 100)}%</span>
              <span>•</span>
              <span className="hidden sm:inline">Double-click or pinch to zoom • Drag to pan</span>
              <span className="sm:hidden">Pinch or double-tap to zoom</span>
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-4 max-w-full">
                {images.map((imgUrl, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={`modal-${imgUrl}-${idx}`}
                      type="button"
                      onClick={() => {
                        setSelectedIndex(idx);
                        handleResetZoom();
                      }}
                      className={`relative w-14 h-14 shrink-0 rounded-sm bg-neutral-900 overflow-hidden transition-all cursor-pointer ${
                        isSelected
                          ? "border-2 border-[#DC2626] ring-2 ring-[#DC2626]/30 opacity-100 scale-105"
                          : "border border-neutral-700 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`Angle ${idx + 1}`}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

