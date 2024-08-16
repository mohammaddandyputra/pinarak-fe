import { ImageDhikra } from '@/utils/imageUrl';
import Image from 'next/image';

interface NavbarProps {
  isSidebarOpen: boolean;
  handleSidebarOpen: () => void;
}

const Navbar = ({ isSidebarOpen, handleSidebarOpen }: NavbarProps) => {
  return (
    <nav className='fixed top-0 z-20 w-full h-14 bg-white text-black border-b border-gray-200 flex items-center justify-between px-4'>
      <div className='flex gap-4'>
        <button className='sm:hidden' onClick={handleSidebarOpen}>
          {isSidebarOpen ? 'Hide' : 'Show'}
        </button>
        <Image alt='' src={ImageDhikra} height={40} width={40} />
      </div>
      nav
    </nav>
  );
};

export default Navbar;
