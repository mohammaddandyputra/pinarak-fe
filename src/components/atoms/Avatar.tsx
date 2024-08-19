import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar as Avtr,
} from '@nextui-org/react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const Avatar = () => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/login');
  };

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avtr
          isBordered
          as='button'
          className='transition-transform'
          src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
        />
      </DropdownTrigger>
      <DropdownMenu aria-label='Profile Actions' variant='flat'>
        <DropdownItem key='profile' className='h-14 gap-2'>
          <p className='font-semibold'>Signed in as</p>
          <p className='font-semibold'>dandy@gmail.com</p>
        </DropdownItem>
        <DropdownItem key='settings'>Account Settings</DropdownItem>
        <DropdownItem key='logout' color='danger' onClick={handleLogout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Avatar;
