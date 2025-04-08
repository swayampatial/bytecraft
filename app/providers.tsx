'use client';
import { Toaster } from "@/components/ui/sonner"

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
        {children}
    </>
  );
}
export default Providers;