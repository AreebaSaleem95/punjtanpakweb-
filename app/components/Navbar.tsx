"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserIcon, ShoppingCartIcon, MenuIcon, XIcon } from "./Icons";

interface NavbarProps {
  onBookServiceClick: () => void;
  onSignupClick: () => void;
}

export default function Navbar({ onBookServiceClick, onSignupClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", active: true },
    { name: "Cars", href: "#cars" },
    { name: "Services", href: "#services" },
    { name: "Workshops", href: "/workshops" },
    { name: "Spare Parts", href: "/spare-parts" },
    { name: "Gallery", href: "#gallery" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="w-full z-40 sticky top-0 bg-white">
      {/* Main Navbar */}
      <nav className="w-full bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="/logo.jpg"
                alt="PANJTAN PAK AUTO"
                fill
                sizes="48px"
                className="object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none">
                PANJTAN PAK AUTO
              </span>
              <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                STARTER &amp; ALTERNATOR SPECIALIST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-2 ${link.active
                  ? "text-blue-600 font-semibold"
                  : "text-slate-700 hover:text-blue-600"
                  }`}
              >
                {link.name}
                {link.active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            {/* Cart Icon with badge */}
            <a
              href="#cart"
              className="relative p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-full transition-colors"
              title="Cart (2 items)"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </a>

            {/* Signup */}
            <button
              type="button"
              onClick={onSignupClick}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors py-2 px-2.5 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <UserIcon className="w-4 h-4 text-slate-500" />
              Signup
            </button>

            {/* Book a Service CTA */}
            <button
              onClick={onBookServiceClick}
              className="bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Book a Service
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="#cart"
              className="relative p-2 text-slate-700 hover:text-blue-600 rounded-lg"
              title="Cart"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-blue-600 text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                2
              </span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${link.active
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignupClick();
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                Signup
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookServiceClick();
                }}
                className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-sm"
              >
                Book a Service
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
