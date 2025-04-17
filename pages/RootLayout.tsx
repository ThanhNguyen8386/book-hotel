'use client';

import { LayoutProvider } from "../contexts/LayoutContext";
import { LayoutProps } from "../models/layout";


export default function RootLayout({ children }: LayoutProps) {
  return (
    <LayoutProvider>
      {children}
    </LayoutProvider>
  );
}