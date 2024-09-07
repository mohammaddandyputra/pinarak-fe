'use client';
import React, { useState, ReactNode, useEffect } from 'react';
import { Main, Navbar, Sidebar } from '@/components/atoms';
import { deleteCookie } from 'cookies-next';

// Definisikan tipe untuk properti komponen
interface MasterProps {
  isBlankLayout: boolean | false;
  children: ReactNode;
}

export default function Master({ isBlankLayout, children }: MasterProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return isBlankLayout ? (
    children
  ) : (
    <>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        handleSidebarOpen={handleSidebarOpen}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <Main isSidebarOpen={isSidebarOpen}>{children}</Main>
    </>
  );
}
