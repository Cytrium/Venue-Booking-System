import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RuangKita. a Hall / Venue Booking Web App in Malaysia",
  description:
    "Discover and book premium venues for weddings, corporate events, and private celebrations in Malaysia.",
  keywords: ["venue booking", "event spaces", "wedding venue", "corporate events", "ruangkita", "malaysia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#ffffff",
              color: "#191c1e",
              borderRadius: "12px",
              border: "1px solid rgba(193, 198, 214, 0.35)",
              boxShadow: "0px 12px 32px rgba(25, 28, 30, 0.08)",
              padding: "12px 16px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#1a73e8",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ba1a1a",
                secondary: "#ffffff",
              },
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
