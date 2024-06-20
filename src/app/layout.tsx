"use client";

import "./globals.css";
import ApolloProviders from "@/provider/apollo-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloProviders>
        <body>{children}</body>
      </ApolloProviders>
    </html>
  );
}
