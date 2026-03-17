"use client";

import Link from "next/link";
import { FaMemory as MemoryIcon } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed flex justify-between items-center px-4 sm:px-8 py-4 w-full bg-white shadow-md z-50">
      <div className="flex items-center gap-2">
        <MemoryIcon className="text-xl sm:text-2xl text-pink-500" />
        <span className="text-lg sm:text-2xl font-bold text-gray-900">
          InternetMemory
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 items-center">
        <a href="#features" className="text-gray-700 hover:text-gray-900">
          Features
        </a>
        <a href="#how-it-works" className="text-gray-700 hover:text-gray-900">
          How It Works
        </a>
        <Link href="/login" className="text-gray-700 hover:text-gray-900">
          Log in
        </Link>
        <Link
          href="/signup"
          className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          Sign up
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span
          className={`w-6 h-0.5 bg-gray-900 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-gray-900 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-gray-900 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        ></span>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden flex flex-col p-4 gap-4 border-t border-gray-200">
          <a
            href="#features"
            className="text-gray-700 hover:text-gray-900 py-2"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-700 hover:text-gray-900 py-2"
          >
            How It Works
          </a>
          <Link
            href="/login"
            className="text-gray-700 hover:text-gray-900 py-2"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-center"
          >
            Sign up
          </Link>
        </nav>
      )}
    </header>
  );
}
