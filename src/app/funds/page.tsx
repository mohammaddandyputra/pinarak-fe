'use client';

import { Master } from '@/layouts';
import { Breadcrumbs } from '@/components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import {
  CardSaldo,
  CardTableTransactionHistory,
  ModalTopUp,
} from '@/components/molecules/funds';
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from '@/slices/funds/topUpFundsSlice';
import { useEffect, useState } from 'react';
import {
  calculateVolumetricWeight,
  fetchApi,
  setErrorValidation,
} from '@/utils';
import orderSchema from '@/schemas/shipment/orderSchema';
import _ from 'lodash';
import { useSearchParams } from 'next/navigation';
import { errorToastify } from '@/utils';

const Home = () => {
  const dispatch = useDispatch();
  const breadcrumbs = [
    { page: 'Home', path: '/' },
    { page: 'Shipment', path: '/' },
    { page: 'Order', path: '/order' },
    { page: 'Form', path: '/order/form' },
  ];

  const [showModal, setShowModal] = useState(false);

  const data = useSelector((state: RootState) => state.topUpFunds.objData);
  const payload = useSelector(
    (state: RootState) => state.topUpFunds.objPayload
  );
  const validation = useSelector(
    (state: RootState) => state.topUpFunds.validationErrors
  );

  useEffect(() => {
    console.log('payload => ', payload);
  }, [payload]);

  useEffect(() => {
    if (payload?.barang?.length && payload?.jenis_pengiriman) {
      const shipmentType = payload?.jenis_pengiriman;
      const mappingItem = payload?.barang?.map((item: any) => {
        return {
          ...item,
          berat_volume: calculateVolumetricWeight(
            shipmentType,
            item?.panjang,
            item?.lebar,
            item?.tinggi
          ),
        };
      });
      dispatch(setObjPayload({ ...payload, barang: mappingItem }));
    }
  }, [JSON.stringify(payload)]);

  const handleOpenModalTopUp = () => {
    setShowModal(true);
  };

  const handleCloseModalTopUp = () => {
    setShowModal(false);
  };

  const handleChangePayload = (property: string, value: any) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  return (
    <Master isBlankLayout={false}>
      <div className='flex flex-col gap-4'>
        <Breadcrumbs data={breadcrumbs} />
      </div>
      {/* [ START ] content */}
      <div className='flex flex-col gap-4 w-full'>
        <CardSaldo data={data} handleClickTopUp={handleOpenModalTopUp} />
        <CardTableTransactionHistory data={payload} />
      </div>
      <ModalTopUp
        isOpen={showModal}
        payload={payload}
        validation={validation}
        handleClose={handleCloseModalTopUp}
        handleChangePayload={handleChangePayload}
      />
      {/* [ END ] content */}
    </Master>
  );
};

export default Home;
