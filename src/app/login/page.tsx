'use client';

import { ImageBackgroundLogin } from '@/utils/imageUrl';

import { Master } from '@/layouts';
import { LoginForm } from '@/components/molecules/login';

const Home = () => {
  return (
    <Master isBlankLayout={true}>
      <div
        style={{
          backgroundImage: `url(${ImageBackgroundLogin.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
        }}
        className='flex justify-between min-h-screen h-screen w-full'
      >
        <div></div>
        <LoginForm />
      </div>
    </Master>
  );
};

export default Home;
