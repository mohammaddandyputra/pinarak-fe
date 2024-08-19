import { ReactNode } from 'react';
import { Button, Checkbox, Input } from '@nextui-org/react';
import { Mail } from 'lucide-react';
import { TextInputPassword } from '@/components/atoms';
import { ImageLogoGoogle } from '@/utils/imageUrl';
import Image from 'next/image';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <div
      className={`flex justify-center items-center border-2 border-gray-200 bg-white w-full sm:px-16 sm:w-fit`}
    >
      <div className='flex flex-col gap-4 w-[21rem]'>
        <p className='text-xl font-bold mb-4'>Login untuk memulai</p>
        <Input
          type='email'
          placeholder='Email'
          labelPlacement='outside'
          startContent={
            <div className='mr-2'>
              <Mail />
            </div>
          }
        />
        <TextInputPassword placeholder='Password' />
        <Button color='primary' radius='lg'>
          Sign In
        </Button>
        <Button color='default' radius='lg'>
          <div className='flex items-center w-full'>
            <Image alt='' src={ImageLogoGoogle} height={30} width={30} />
            <span className='w-full text-center'>Sign In with Google</span>
          </div>
        </Button>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Checkbox size='md' />
            <span className='text-sm'>Biarkan saya masuk</span>
          </div>
          <Link
            href={'/forgot-password'}
            className='text-sm hover:text-blue-700'
          >
            Lupa kata sandi?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
