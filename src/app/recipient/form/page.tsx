'use client';

import { Master } from '@/layouts';
import { Breadcrumbs, TextInputNumber } from '@/components/atoms';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
  Textarea,
} from '@nextui-org/react';
import { FormLabel } from '@/components/molecules/common';
import { useState } from 'react';

const Home = () => {
  const breadcrumbs = [
    { page: 'Home', path: '/' },
    { page: 'Information', path: '/recipient-sender' },
    { page: 'Recipent & Sender', path: '/recipient-sender' },
    { page: 'Form', path: '/recipient-sender/form' },
  ];

  const [number, setNumber] = useState('0');

  const handleChange = (value: string) => {
    setNumber(value);
  };

  return (
    <Master isBlankLayout={false}>
      <div className='flex flex-col gap-4'>
        <Breadcrumbs data={breadcrumbs} />
      </div>
      {/* [ START ] content */}
      <div className='flex flex-col gap-4 w-3/4'>
        <Card>
          <CardHeader>
            <p className='text-base font-semibold'>Informasi Pengirim</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className='w-full flex gap-4'>
              <div className='flex flex-col gap-4 w-1/2'>
                <FormLabel
                  label='Nama*'
                  form={
                    <Input
                      type='text'
                      placeholder='Masukkan nama pengirim'
                      radius='sm'
                    />
                  }
                  labelPositionTop
                />
                <FormLabel
                  label='Nomer Telepon*'
                  form={
                    <TextInputNumber
                      value={number}
                      placeholder='Masukkan nomer telepon pengirim'
                      handleChange={handleChange}
                    />
                  }
                  labelPositionTop
                />
              </div>
              <div className='w-1/2'>
                <FormLabel
                  label='Alamat*'
                  form={
                    <Textarea
                      placeholder='Masukkan alamat pengirim'
                      radius='sm'
                      disableAutosize
                      classNames={{
                        input: 'resize-y min-h-[105px]',
                      }}
                    />
                  }
                  labelPositionTop
                />
                <FormLabel
                  label='Kecamatan, Kota Asal*'
                  form={
                    <Input
                      type='text'
                      placeholder='Ketik atau pilih alamat tujuan'
                      radius='sm'
                    />
                  }
                  labelPositionTop
                />
              </div>
            </div>
          </CardBody>
          <Divider />
        </Card>
        <Card>
          <CardHeader>
            <p className='text-base font-semibold'>Informasi Penerima</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className='w-full flex gap-4'>
              <div className='flex flex-col gap-4 w-1/2'>
                <FormLabel
                  label='Nama*'
                  form={
                    <Input
                      type='text'
                      placeholder='Masukkan nama pengirim'
                      radius='sm'
                    />
                  }
                  labelPositionTop
                />
                <FormLabel
                  label='Nomer Telepon*'
                  form={
                    <TextInputNumber
                      value={number}
                      placeholder='Masukkan nomer telepon pengirim'
                      handleChange={handleChange}
                    />
                  }
                  labelPositionTop
                />
              </div>
              <div className='w-1/2'>
                <FormLabel
                  label='Alamat*'
                  form={
                    <Textarea
                      placeholder='Masukkan alamat pengirim'
                      radius='sm'
                      disableAutosize
                      classNames={{
                        input: 'resize-y min-h-[105px]',
                      }}
                    />
                  }
                  labelPositionTop
                />
                <FormLabel
                  label='Kecamatan, Kota Asal*'
                  form={
                    <Input
                      type='text'
                      placeholder='Ketik atau pilih alamat tujuan'
                      radius='sm'
                    />
                  }
                  labelPositionTop
                />
              </div>
            </div>
          </CardBody>
          <Divider />
        </Card>
      </div>
      {/* [ END ] content */}
    </Master>
  );
};

export default Home;
