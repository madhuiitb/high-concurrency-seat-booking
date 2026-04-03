'use client'
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/queryProvider";
import { SeatProvider } from "@/providers/SeatProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="bg-black h-full flex flex-col">
        <QueryProvider>
          <SeatProvider>
            {children}
            <Toaster position="top-right" richColors />
          </SeatProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
