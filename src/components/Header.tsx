"use client";

import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { use, useState } from "react";
import { Session } from "next-auth";
import RightNavSection from "@/components/RightNavSection";

export default function Header({ sessionPromise }: { sessionPromise: Promise<Session | null> }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = use(sessionPromise);
  const headerHeight = 70; // pixels

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-purple-900/70 backdrop-blur-md text-base-content shadow-md z-50 h-[70px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6 h-full">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
            Gyanrexa
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 font-medium">
            <Link href="/" className="hover:text-primary">Home</Link>
            <Link href="/blogs" className="hover:text-primary">Blogs</Link>
            <Link href="/categories" className="hover:text-primary">Categories</Link>
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <RightNavSection user={session?.user} />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <RightNavSection user={session?.user} />
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Proper Page Padding (to avoid content behind header) */}
      <div style={{ paddingTop: `${headerHeight}px` }}></div>

      {/* Mobile Sidebar - Full Width */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-base-100 z-[60] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(false)}
            className="btn btn-ghost btn-sm"
          >
            <XIcon />
          </button>
          <RightNavSection user={session?.user} />
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col p-6 space-y-4 text-lg font-medium">
          <Link href="/" onClick={() => setSidebarOpen(false)} className="hover:text-primary">Home</Link>
          <Link href="/blogs" onClick={() => setSidebarOpen(false)} className="hover:text-primary">Blogs</Link>
          <Link href="/categories" onClick={() => setSidebarOpen(false)} className="hover:text-primary">Categories</Link>
          <Link href="/about" onClick={() => setSidebarOpen(false)} className="hover:text-primary">About</Link>
          <Link href="/contact" onClick={() => setSidebarOpen(false)} className="hover:text-primary">Contact</Link>
        </div>
      </div>

      {/* Overlay (semi-transparent background) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[55]"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}