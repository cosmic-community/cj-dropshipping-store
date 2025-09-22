import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CJ Dropshipping Store',
  description: 'Modern eCommerce store powered by CJ Dropshipping API',
  keywords: 'dropshipping, ecommerce, online store, products',
  authors: [{ name: 'CJ Store' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        <CartProvider>
          <Header />
          <main className="flex-1 bg-gray-50">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}