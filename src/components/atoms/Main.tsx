import { ReactNode } from 'react';

interface MainProps {
  isSidebarOpen: boolean;
  children: ReactNode;
}

const Main = ({ isSidebarOpen, children }: MainProps) => {
  return (
    <div
      className={`pt-14 transition-transform h-screen overflow-auto
      ${isSidebarOpen ? 'pl-[12.6rem]' : 'pl-0 sm:pl-[4rem]'}
      sm:${isSidebarOpen ? 'pl-[12.6rem]' : 'pl-[4rem]'}`}
    >
      <div className='p-4'>{children}</div>
    </div>
  );
};

export default Main;
