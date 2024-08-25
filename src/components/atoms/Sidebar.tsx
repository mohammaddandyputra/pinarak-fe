import { useEffect } from 'react';
import {
  Home,
  UserCog,
  Users,
  UserCheck,
  PackageOpen,
  PackagePlus,
  PackageSearch,
  Truck,
  CircleDollarSign,
  ListOrdered,
} from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar = ({ isSidebarOpen }: SidebarProps) => {
  const menuListSidebarOpen = [
    {
      page: 'Home',
      icon: <Home size={20} />,
      isParent: true,
      path: '/',
    },
    {
      page: 'Funds',
      icon: <CircleDollarSign size={20} />,
      isParent: true,
      path: '/',
    },
    {
      page: 'Shipment',
      icon: <Truck size={20} />,
      isParent: true,
      path: '#',
      children: [
        {
          page: 'Order',
          icon: <ListOrdered size={20} />,
          path: '/order',
        },
        {
          page: 'Tracking',
          icon: <PackageSearch size={20} />,
          path: '/tracking',
        },
      ],
    },
    {
      page: 'Information',
      icon: <Truck size={20} />,
      isParent: true,
      path: '#',
      children: [
        {
          page: 'Recipient',
          icon: <PackageOpen size={20} />,
          path: '/recipient',
        },
        {
          page: 'Sender',
          icon: <PackageSearch size={20} />,
          path: '/tracking',
        },
      ],
    },
    {
      page: 'User Settings',
      icon: <UserCog size={20} />,
      isParent: true,
      path: '#',
      children: [
        { page: 'User', icon: <Users size={20} />, path: '/user' },
        { page: 'Role', icon: <UserCheck size={20} />, path: '/pengirim' },
      ],
    },
  ];

  const menuListSidebarClose = [
    {
      page: 'Home',
      icon: <Home size={30} />,
      isParent: true,
      path: '/',
    },
    {
      page: 'Recipient',
      icon: <PackageOpen size={30} />,
      path: '/recipient',
    },
    { page: 'Sender', icon: <PackagePlus size={30} />, path: '/sender' },
    { page: 'User', icon: <Users size={30} />, path: '/user' },
    { page: 'Role', icon: <UserCheck size={30} />, path: '/pengirim' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-20 h-screen overflow-hidden pt-14 bg-white text-black border-r border-gray-200 transition-all duration-300
        ${isSidebarOpen ? 'w-[13.5rem]' : 'w-[4rem]'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:translate-x-0 sm:w-${isSidebarOpen ? '[13.5rem]' : '[4rem]'}`}
    >
      <div className='flex flex-col gap-1'>
        {isSidebarOpen
          ? menuListSidebarOpen?.map((dataMenu, indexMenu) => {
              return (
                <div
                  key={indexMenu}
                  className={`${dataMenu?.isParent ? '' : ''} flex flex-col gap-1`}
                >
                  <Link
                    href={dataMenu?.path}
                    className='flex items-center gap-2 px-3 py-2 hover:bg-gray-200'
                  >
                    {dataMenu?.icon}
                    <p className='text-base font-extrabold'>{dataMenu?.page}</p>
                  </Link>
                  {dataMenu?.children?.length ? (
                    <div className='flex flex-col gap-1'>
                      {dataMenu?.children?.map((dataSubmenu, indexSubmenu) => {
                        return (
                          <Link
                            href={dataSubmenu?.path}
                            key={indexSubmenu}
                            className='flex items-center gap-2 hover:bg-gray-200 py-2 pl-7'
                          >
                            {dataSubmenu?.icon}
                            <p className='text-base'>{dataSubmenu?.page}</p>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              );
            })
          : menuListSidebarClose?.map((dataMenu, indexMenu) => {
              return (
                <div
                  key={indexMenu}
                  className={`${dataMenu?.isParent ? '' : ''} flex flex-col gap-1`}
                >
                  <Link
                    href={dataMenu?.path}
                    className='flex items-center justify-center py-2 hover:bg-gray-200'
                  >
                    {dataMenu?.icon}
                  </Link>
                </div>
              );
            })}
      </div>
    </aside>
  );
};

export default Sidebar;
