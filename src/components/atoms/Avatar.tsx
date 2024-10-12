import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar as Avtr,
} from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { useSession } from "next-auth/react"

const Avatar = () => {
  const { data: session, status } = useSession()
  const user = {
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    primaryEmailAddress: { emailAddress: 'user@example.com' },
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  const handleSettingsClick = () => {
  };

  if (status === "authenticated") {
    return (
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avtr
            isBordered
            as='button'
            className='transition-transform'
            src={user.imageUrl}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className='h-14 gap-2'>
            <p className='font-semibold'>Signed in as</p>
            <p className='font-semibold'>{session?.user?.email}</p>
          </DropdownItem>
          <DropdownItem key='settings' onClick={handleSettingsClick}>Account Settings</DropdownItem>
          <DropdownItem key='logout' color='danger' onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
};

export default Avatar;