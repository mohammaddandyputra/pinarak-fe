'use client';

import { Master } from '@/layouts';
import { Breadcrumbs } from '@/components/atoms';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const breadcrumbs = [
    { page: 'Home', path: '/' },
    { page: 'Dashboard', path: '/' },
  ];

  return (
    <Master isBlankLayout={false}>
      <div className='flex flex-col gap-4'>
        <Breadcrumbs data={breadcrumbs} />
        <ToastContainer />
      </div>
    </Master>
  );
};

export default Home;
