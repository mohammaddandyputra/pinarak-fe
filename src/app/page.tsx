'use client';

import { Master } from '@/layouts';
import { Breadcrumbs } from '@/components/atoms';
import { ToastContainer, toast } from 'react-toastify';
import { useBannerList } from '@/data/bannner';
import { useEffect } from 'react';

const Home = () => {
  const breadcrumbs = [
    { page: 'Home', path: '/' },
    { page: 'Dashboard', path: '/' },
  ];

  const { bannerListData } = useBannerList();

  useEffect(() => {
    console.log('bannerListData => ', bannerListData);
  }, [bannerListData]);

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
