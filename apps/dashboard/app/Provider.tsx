"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Toaster closeButton />
      {children}
    </SessionProvider>
  );
};
