'use client';

import { Master } from '@/layouts';
import { Breadcrumbs } from '@/components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import {
  CardSenderInformation,
  CardRecipientInformation,
  CardItemDetail,
  CardShipmentType,
  CardPaymentMethod,
} from '@/components/molecules/order';
import {
  setObjPayload,
  setValidationErrors,
  resetObjPayload,
  resetValidationErrors,
} from '@/slices/shipment/orderShipmentFormSlice';
import { useEffect, useState } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const breadcrumbs = [
    { page: 'Home', path: '/' },
    { page: 'Shipment', path: '/' },
    { page: 'Order', path: '/order' },
    { page: 'Form', path: '/order/form' },
  ];

  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState(0);

  const payload = useSelector(
    (state: RootState) => state.orderShipmentForm.objPayload
  );
  const validation = useSelector(
    (state: RootState) => state.orderShipmentForm.validationErrors
  );

  useEffect(() => {
    console.log('payload => ', payload);
  }, [payload]);

  const handleChangePayload = (property: string, value: any) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleResetPayload = (property: string) => {
    dispatch(setObjPayload({ ...payload, [property]: '' }));
  };

  const handleChangePayloadItem = (
    property: string,
    index: number,
    value: any
  ) => {
    const newPayload = [...(payload?.barang || [])];
    newPayload[index] = value;
    dispatch(setObjPayload({ ...payload, [property]: newPayload }));
  };

  const handleClickAddItem = () => {
    const newPayload = [...(payload?.barang || [])];
    newPayload.push({
      berat_barang: '0',
      panjang: '0',
      lebar: '0',
      tinggi: '0',
      berat_volume: '0',
    });
    dispatch(setObjPayload({ ...payload, barang: newPayload }));
  };

  const handleClickDeleteItem = (index: number) => {
    const newPayload = [...(payload?.barang || [])];
    newPayload.splice(index, 1);
    dispatch(setObjPayload({ ...payload, barang: newPayload }));
  };

  const handleClickShipmentType = (value: string) => {
    dispatch(setObjPayload({ ...payload, shipment_type: value }));
  };

  return (
    <Master isBlankLayout={false}>
      <div className='flex flex-col gap-4'>
        <Breadcrumbs data={breadcrumbs} />
      </div>
      {/* [ START ] content */}
      <div className='flex flex-col gap-4 w-full lg:w-3/4'>
        <CardSenderInformation
          data={payload}
          validation={validation}
          handleChangePayload={handleChangePayload}
          handleResetPayload={handleResetPayload}
        />
        <CardRecipientInformation
          data={payload}
          validation={validation}
          handleChangePayload={handleChangePayload}
          handleResetPayload={handleResetPayload}
        />
        <CardItemDetail
          data={payload}
          validation={validation}
          handleChangePayload={handleChangePayload}
          handleChangePayloadItem={handleChangePayloadItem}
          handleClickAddItem={handleClickAddItem}
          handleClickDeleteItem={handleClickDeleteItem}
        />
        <CardShipmentType handleClick={handleClickShipmentType} />
        <CardPaymentMethod />
      </div>
      {/* [ END ] content */}
    </Master>
  );
};

export default Home;
