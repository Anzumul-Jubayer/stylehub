'use client';

import { usePathname } from 'next/navigation';
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Routes that should not show the regular navbar and footer
  const hideNavAndFooter = ['/dashboard', '/login', '/register', '/add-item'].some(route => 
    pathname?.startsWith(route)
  );

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      {children}
      {!hideNavAndFooter && <Footer />}
    </>
  );
}