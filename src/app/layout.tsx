import type { Metadata } from "next";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "./globals.css";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "GyanRexa - Sharing Thoughts, Tutorials, and Ideas with the World",
  description: "GyanRexa is a platform for sharing thoughts, tutorials, and ideas with the world.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Header sessionPromise={auth()} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
