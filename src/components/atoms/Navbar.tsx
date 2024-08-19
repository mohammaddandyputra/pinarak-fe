import { AlignLeft, CircleChevronRight } from 'lucide-react';
import Avatar from './Avatar';

interface NavbarProps {
  isSidebarOpen: boolean;
  handleSidebarOpen: () => void;
}

const Navbar = ({ isSidebarOpen, handleSidebarOpen }: NavbarProps) => {
  return (
    <nav
      className={`fixed top-0 z-10 w-full bg-white text-black border-b border-gray-200
    ${isSidebarOpen ? 'pl-[12.6rem]' : 'pl-0 sm:pl-[4rem]'}`}
    >
      <div className='px-4 h-16 flex items-center justify-between'>
        <button className='sm:hidden' onClick={handleSidebarOpen}>
          {isSidebarOpen ? (
            <AlignLeft size={25} />
          ) : (
            <CircleChevronRight size={25} />
          )}
        </button>
        <button className='hidden sm:block' onClick={handleSidebarOpen}>
          {isSidebarOpen ? (
            <AlignLeft size={25} />
          ) : (
            <CircleChevronRight size={25} />
          )}
        </button>
        <Avatar />
      </div>
    </nav>
  );
};

export default Navbar;
