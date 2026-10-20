"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceItem } from "@/app/data/servicesData";
import { ShieldCheckIcon, StarIcon, ClockIcon, CheckIcon } from "@/app/components/Icons";

interface ServiceCardProps {
  service: ServiceItem;
  onBookClick?: (service: ServiceItem) => void;
}

export default function ServiceCard({ service, onBookClick }: ServiceCardProps) {
  const [imgSrc, setImgSrc] = React.useState(service.image || "/images/workshop/gallery-1.jpg");

  const formattedPrice = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(service.startingPrice);

  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all group">
      <div>
        {/* Service Image with Category & Rating */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5 bg-slate-100 border border-slate-100">
          <Image
            src={imgSrc}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgSrc("/images/workshop/gallery-1.jpg")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          {/* Category Badge on image */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2.5 py-1 rounded-md bg-blue-600 text-white text-[11px] font-semibold tracking-wide uppercase shadow-xs">
              {service.category}
            </span>
          </div>

          {/* Rating & Warranty - Strictly Blue & White */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-xs text-slate-800">
              <StarIcon className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
              <span className="font-bold text-slate-900">{service.rating}</span>
              <span className="text-slate-500 text-[11px]">({service.reviewsCount})</span>
            </div>

            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-xs text-blue-700 font-semibold text-[11px]">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-blue-600" />
              {service.warranty.split(" ")[0]} Guarantee
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/services/${service.slug}`} className="block">
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {service.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {service.shortDescription}
        </p>

        {/* Specs Box */}
        <div className="py-2.5 px-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 mb-4 border border-slate-100 flex items-center justify-between">
          <span className="truncate pr-2">{service.keySpecs}</span>
          <span className="inline-flex items-center gap-1 text-slate-600 shrink-0 font-semibold">
            <ClockIcon className="w-3.5 h-3.5 text-blue-600" />
            {service.estimatedTime}
          </span>
        </div>

        {/* Features Checklist */}
        <ul className="space-y-1.5 mb-5">
          {service.features.slice(0, 2).map((feat, idx) => (
            <li key={idx} className="flex items-center text-xs text-slate-600 gap-2">
              <CheckIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer with Price and Actions */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-3.5">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
              Starting Price
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              {formattedPrice}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
            All-Inclusive
          </span>
        </div>

        {/* Buttons - Pure Blue & White */}
        <div className="flex items-center gap-3">
          <Link
            href={`/services/${service.slug}`}
            className="flex-1 text-center py-2.5 px-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            View Details
          </Link>

          {onBookClick ? (
            <button
              type="button"
              onClick={() => onBookClick(service)}
              className="flex-1 text-center py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Book Service
            </button>
          ) : (
            <Link
              href={`/book-service?service=${service.slug}`}
              className="flex-1 text-center py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-semibold shadow-sm hover:shadow transition-all"
            >
              Book Service
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
