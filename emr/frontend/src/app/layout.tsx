import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'EMR System',
  description: 'Electronic Medical Records Management System',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
