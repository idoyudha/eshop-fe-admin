import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eshop Ecommerce Admin Dashboard",
  description: "Managing Eshop Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col">
        <div className="flex min-h-full flex-1 flex-col bg-white" vaul-drawer-wrapper="">
          {children}
        </div>
      </body>
    </html>
  );
}
