import { ReactNode } from 'react';

interface MainProps {
  isSidebarOpen: boolean;
  children: ReactNode;
}

const Main = ({ isSidebarOpen, children }: MainProps) => {
  return (
    <div
      className={`pt-14 transition-transform h-screen overflow-auto
      ${isSidebarOpen ? 'pl-[13.5rem]' : 'pl-0 sm:pl-[4rem]'}
      sm:${isSidebarOpen ? 'pl-[13.5rem]' : 'pl-[4rem]'}`}
    >
      <div className='px-4 pt-6'>{children}</div>
    </div>
  );
};

export default Main;
