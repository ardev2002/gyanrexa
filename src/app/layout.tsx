import type { Metadata } from "next";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "./globals.css";
import RightNavSection from "@/components/RightNavSection";

export const metadata: Metadata = {
  title: "GyanRexa - Sharing Thoughts, Tutorials, and Ideas with the World",
  description: "GyanRexa is a platform for sharing thoughts, tutorials, and ideas with the world.",
  applicationName: 'GyanRexa',
  creator: 'Ankur Rajbongshi',
  authors: [{ name: 'Ankur Rajbongshi'}, {name: 'Manabendra Nath'}],
  referrer: 'origin-when-cross-origin',
  keywords: ['blog', 'tutorial', 'thought', 'idea', 'gyanrexa', 'ankur rajbongshi', 'manabendra nath'],
  openGraph: {
    title: 'GyanRexa',
    description: 'Sharing thoughts, tutorials, and ideas with the world. Stay inspired!',
    siteName: 'GyanRexa',
    // url: 'https://gyanrexa.com',
    // images: [
    //   {
    //     url: 'https://gyanrexa.com/og.png',
    //     width: 800,
    //     height: 600,
    //   },
    // ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GyanRexa',
    description: 'Sharing thoughts, tutorials, and ideas with the world. Stay inspired!',
    // images: ['https://gyanrexa.com/og.png'],
    creator: '@ankurrajbongshi',
  }
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
        <Header>
          <RightNavSection />
        </Header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
