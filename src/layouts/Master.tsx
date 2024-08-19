'use client';
import React, { useState, ReactNode } from 'react';
import { Main, Navbar, Sidebar } from '@/components/atoms';
import { deleteCookie } from 'cookies-next';

// Definisikan tipe untuk properti komponen
interface MasterProps {
  isBlankLayout: boolean;
  children: ReactNode;
}

export default function Master({ isBlankLayout, children }: MasterProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
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
