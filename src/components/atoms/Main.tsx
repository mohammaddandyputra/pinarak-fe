import { ReactNode } from 'react';

interface MainProps {
  isSidebarOpen: boolean;
  children: ReactNode;
}

const Main = ({ isSidebarOpen, children }: MainProps) => {
  return (
    <div
      className={`pt-12 sm:pl-[12.6rem] ${
        isSidebarOpen ? 'pl-[12.6rem]' : ''
      } transition-transform overflow-auto bg-white h-screen text-black`}
    >
      {children}
    </div>
  );
};

export default Main;
