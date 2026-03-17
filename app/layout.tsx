"use client";

import "./globals.css";
import { ToastContainer } from "react-toastify";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className=" scroll-smooth w-full h-full" lang="en">
      <body className="w-full h-full">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
