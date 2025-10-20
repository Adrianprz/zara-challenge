import "@/styles/main.scss";

import { Header } from "@/components/Header";
import { CartProvider } from "@/providers/CartProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { ToastProvider } from "@/providers/ToastProvider";

import { metadata } from "@/config/metadata";

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
      </head>
      <body>
        <QueryProvider>
          <CartProvider>
            <ToastProvider>
              <Header />
              <main>{children}</main>
            </ToastProvider>
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
