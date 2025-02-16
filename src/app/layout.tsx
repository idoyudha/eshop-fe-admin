import type { Metadata } from "next";
import "./globals.css";
import { AuthProviders } from "./auth-provider";
import { Toaster } from "@/components/ui/toaster";

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
        <AuthProviders>
          <div className="flex min-h-full flex-1 flex-col bg-white" vaul-drawer-wrapper="">
            {children}
          </div>
          <Toaster />
        </AuthProviders>
      </body>
    </html>
  );
}
