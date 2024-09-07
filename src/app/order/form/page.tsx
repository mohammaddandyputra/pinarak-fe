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
import { Button } from '@nextui-org/react';
import { ShoppingCart } from 'lucide-react';
import { fetchApi, setErrorValidation } from '@/utils';
import orderSchema from '@/schemas/shipment/orderSchema';
import _ from 'lodash';
import { useSearchParams } from 'next/navigation';
import { errorToastify } from '@/utils';

const Home = () => {
  const p = useSearchParams().get('p');

  const dispatch = useDispatch();
  const breadcrumbs = [
    { page: 'Home', path: '/' },
    { page: 'Shipment', path: '/' },
    { page: 'Order', path: '/order' },
    { page: 'Form', path: '/order/form' },
  ];

  const [isEdit, setIsEdit] = useState(false);
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

  const handleChangeSelectionSender = (value: any) => {
    dispatch(
      setObjPayload({
        ...payload,
        pengirim_nama: value?.nama,
        pengirim_no_telepon: value?.no_telepon,
        pengirim_kode_negara: value?.kode_negara || 'id',
        pengirim_kecamatan: value?.Kecamatan,
        pengirim_alamat: value?.alamat,
      })
    );
  };

  const handleChangeSelectionRecipient = (value: any) => {
    dispatch(
      setObjPayload({
        ...payload,
        penerima_nama: value?.nama,
        penerima_no_telepon: value?.no_telepon,
        penerima_kode_negara: value?.kode_negara || 'id',
        penerima_kecamatan: value?.Kecamatan,
        penerima_alamat: value?.alamat,
      })
    );
  };

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
    newPayload[index] = {
      ...newPayload[index],
      [property]: value,
    };
    dispatch(setObjPayload({ ...payload, barang: newPayload }));
  };

  const handleClickAddItem = () => {
    const newPayload = [...(payload?.barang || [])];
    newPayload.push({
      berat_barang: '',
      panjang: '',
      lebar: '',
      tinggi: '',
      berat_volume: '',
    });
    dispatch(setObjPayload({ ...payload, barang: newPayload }));
  };

  const handleClickDeleteItem = (index: number) => {
    const newPayload = [...(payload?.barang || [])];
    newPayload.splice(index, 1);
    dispatch(setObjPayload({ ...payload, barang: newPayload }));
  };

  const handleClickShipmentType = (value: string) => {
    dispatch(setObjPayload({ ...payload, jenis_pengiriman: value }));
  };

  const handleSubmitCreateOder = async () => {
    const mappingPayload: any = {
      ...payload,
      pengirim_kecamatan_id: payload?.pengirim_kecamatan?.id?.toString(),
      penerima_kecamatan_id: payload?.penerima_kecamatan?.id?.toString(),
    };

    const schemaMapping = {
      schema: orderSchema,
      setErrors: setValidationErrors,
      resetErrors: resetValidationErrors,
    };

    const validate = setErrorValidation(
      mappingPayload,
      dispatch,
      schemaMapping
    );

    if (validate) {
      const objPayloadFix = {
        penerima: {
          nama: mappingPayload?.penerima_nama,
          no_telepon: mappingPayload?.penerima_no_telepon,
          kode_negara: mappingPayload?.penerima_kode_negara,
          kecamatan_id: mappingPayload?.penerima_kecamatan_id,
          alamatan: mappingPayload?.penerima_alamat,
        },
        pengirim: {
          nama: mappingPayload?.pengirim_nama,
          no_telepon: mappingPayload?.pengirim_no_telepon,
          kode_negara: mappingPayload?.pengirim_kode_negara,
          kecamatan_id: mappingPayload?.pengirim_kecamatan_id,
          alamatan: mappingPayload?.pengirim_alamat,
        },
      };

      console.log('objPayloadFix => ', objPayloadFix);
      // await fetchApi(
      //   isEdit ? 'PUT' : 'POST',
      //   `${process.env.NEXT_PUBLIC_API_URL}/penerima${isEdit ? `/${selectedId}` : ''}`,
      //   {
      //     ..._.omit(mappingPayload, ['kecamatan']),
      //     kecamatan_id: Number(mappingPayload?.kecamatan_id),
      //   }
      // );

      // dispatch(resetObjPayload());
      // dispatch(resetValidationErrors());
      // setIsEdit(false);
    } else {
      errorToastify('Form masih belum lengkap. Silahkan cek kembali!');
    }
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
          handleChangeSelection={handleChangeSelectionSender}
          handleChangePayload={handleChangePayload}
          handleResetPayload={handleResetPayload}
        />
        <CardRecipientInformation
          data={payload}
          validation={validation}
          handleChangeSelection={handleChangeSelectionRecipient}
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
        <CardShipmentType
          data={payload}
          validation={validation}
          handleClick={handleClickShipmentType}
        />
        <CardPaymentMethod
          data={payload}
          validation={validation}
          handleChangePayload={handleChangePayload}
        />
        <div className='flex justify-end'>
          <Button
            radius='lg'
            color='success'
            variant='shadow'
            onClick={handleSubmitCreateOder}
          >
            <ShoppingCart size={20} />
            <span>Buat Order</span>
          </Button>
        </div>
      </div>
      {/* [ END ] content */}
    </Master>
  );
};

export default Home;
