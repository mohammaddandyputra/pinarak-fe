import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar as Avtr,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useClerk,
  RedirectToUserProfile,
} from '@clerk/nextjs';

const Avatar = () => {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut().then(() => {
      router.push('/login');
    });
  };

  const handleSettingsClick = () => {
    <RedirectToUserProfile />;
  };

  return (
    <SignedIn>
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avtr
            isBordered
            as='button'
            className='transition-transform'
            src={user?.imageUrl || 'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className='h-14 gap-2'>
            <p className='font-semibold'>Signed in as</p>
            <p className='font-semibold'>{user?.primaryEmailAddress?.emailAddress}</p>
          </DropdownItem>
          <DropdownItem key='settings' onClick={handleSettingsClick}>Account Settings</DropdownItem>
          <DropdownItem key='logout' color='danger' onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </SignedIn>
  );
};

export default Avatar;