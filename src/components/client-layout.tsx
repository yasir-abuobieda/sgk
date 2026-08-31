'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';
import { Footer } from './footer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isLoginRoute = pathname?.startsWith('/login');
  
  const showPublicLayout = !isAdminRoute && !isLoginRoute;

  return (
    <>
      {showPublicLayout && <Navbar />}
      <main className={showPublicLayout ? "min-h-screen" : ""}>
        {children}
      </main>
      {showPublicLayout && <Footer />}
    </>
  );
}
