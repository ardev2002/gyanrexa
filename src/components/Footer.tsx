"use client";

import Link from "next/link";
import { Instagram, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-base-300 to-base-200 text-base-content mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 md:px-6 md:py-16 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-primary mb-2">Gyanrexa</h2>
          <p className="text-sm text-gray-400 text-center md:text-left max-w-xs">
            Sharing thoughts, tutorials, and ideas with the world. Stay inspired!
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-gray-300 font-semibold mb-2">Quick Links</span>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link href="/" className="hover:text-primary transition-colors text-gray-400">Home</Link>
            <Link href="/blogs" className="hover:text-primary transition-colors text-gray-400">Blogs</Link>
            <Link href="/categories" className="hover:text-primary transition-colors text-gray-400">Categories</Link>
            <Link href="/about" className="hover:text-primary transition-colors text-gray-400">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors text-gray-400">Contact</Link>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-gray-300 font-semibold mb-2">Follow Me</span>
          <div className="flex gap-4">
            <Link href="https://twitter.com" target="_blank" className="hover:text-primary transition-colors">
              <Twitter size={24} />
            </Link>
            <Link href="https://github.com" target="_blank" className="hover:text-primary transition-colors">
              <Github size={24} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-primary transition-colors">
              <Linkedin size={24} />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-primary transition-colors">
              <Instagram size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 mt-4"></div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Gyanrexa. All rights reserved.
      </div>
    </footer>
  );
}
