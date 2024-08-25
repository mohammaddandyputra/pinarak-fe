'use client';

import { Master } from '@/layouts';
import { Breadcrumbs, PageTitle } from '@/components/atoms';
import {
  ModalRecipient,
  ModalFilterRecipient,
  CardRecipient,
} from '@/components/molecules/recipient';
import { useDispatch, useSelector } from 'react-redux';
import {
  setObjData,
  setObjFilter,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjFilter,
  resetObjPayload,
  resetValidationErrors,
} from '@/slices/information/recipientInformationSlice';
import { RootState } from '@/stores/store';
import { useEffect, useState } from 'react';
import { useRecipientDetail, useRecipientList } from '@/data/information';
import recipientSchema from '@/schemas/information/recipientSchema';
import { fetchApi, setErrorValidation } from '@/utils';
import _ from 'lodash';
import { Button, Pagination } from '@nextui-org/react';
import { Filter, UserPlusIcon } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const breadcrumbs = [
    { page: 'Home', path: '/' },
    { page: 'Information', path: '/' },
    { page: 'Recipent', path: '/recipient' },
  ];

  const [filterData, setFilterData] = useState({});
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const [showModalRecipient, setShowModalRecipient] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModalFilterRecipient, setShowModalFilterRecipient] =
    useState<boolean>(false);

  const [selectedId, setSelectedId] = useState(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const data = useSelector(
    (state: RootState) => state.recipientInformation.objData
  );
  const filter = useSelector(
    (state: RootState) => state.recipientInformation.objFilter
  );
  const payload = useSelector(
    (state: RootState) => state.recipientInformation.objPayload
  );
  const validation = useSelector(
    (state: RootState) => state.recipientInformation.validationErrors
  );

  const { recipientListData, recipientListRefetch } =
    useRecipientList(filterData);
  const { recipientDetailData } = useRecipientDetail({
    id: selectedId?.toString(),
  });

  useEffect(() => {
    if (recipientListData?.data?.data?.length) {
      const response = recipientListData?.data;
      dispatch(setObjData(response?.data));
      setTotalPage(response?.pagination?.total_pages);
    } else {
      dispatch(resetObjData());
      setTotalPage(1);
    }
  }, [recipientListData]);

  useEffect(() => {
    if (recipientDetailData?.data) {
      const response = recipientDetailData?.data;
      dispatch(
        setObjPayload({
          ..._.omit(response, ['Kecamatan']),
          kecamatan: response?.Kecamatan,
        })
      );
    } else {
      dispatch(resetObjPayload());
    }
  }, [recipientDetailData, showModalRecipient]);

  useEffect(() => {
    const filterKey = Object.keys(filterData)?.filter((key) => key !== 'page');
    setIsFilterActive(Boolean(filterKey?.length));
  }, [filterData]);

  const handleChangePayload = (property: string, value: any) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleResetPayload = (property: string) => {
    dispatch(setObjPayload({ ...payload, [property]: '' }));
  };

  const handleChangePagination = (page: number) => {
    dispatch(setObjFilter({ ...filter, page }));
    setFilterData((prevItem) => ({ ...prevItem, page }));
  };

  // [ START ] handler for card content
  const handleOpenModalEdit = (id: number) => {
    setSelectedId(id);
    setIsEdit(true);
    setShowModalRecipient(true);
  };

  const handleOpenModalDelete = (id: number) => {
    setSelectedId(id);
    setShowModalDelete(true);
  };

  const handleOpenModalAdd = () => {
    setShowModalRecipient(true);
  };

  const handleOpenModalFilter = () => {
    setShowModalFilterRecipient(true);
  };
  // [ END ] handler for card content

  // [ START ] handler for modal filter
  const handleCloseModalFilter = () => {
    setShowModalFilterRecipient(false);
  };

  const handleChangeFilter = (property: string, value: any) => {
    dispatch(setObjFilter({ ...filter, [property]: value }));
  };

  const handleResetFilter = () => {
    setShowModalFilterRecipient(false);
    dispatch(resetObjFilter());
    setFilterData({});
  };

  const handleSubmitFilter = async () => {
    dispatch(setObjFilter({ ...filter, page: 1 }));
    setFilterData({ ...filter, page: 1 });
    recipientListRefetch();
    setShowModalFilterRecipient(false);
  };
  // [ END ] handler for modal filter

  // [ START ] handler modal delete
  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  const handleSubmitModalDelete = async () => {
    await fetchApi(
      'DELETE',
      `${process.env.NEXT_PUBLIC_API_URL}/penerima/${selectedId}`,
      {}
    );

    recipientListRefetch();
    setShowModalDelete(false);
  };
  // [ END ] handler modal delete

  // [ START ] handler for modal add
  const handleCloseModalRecipient = () => {
    setShowModalRecipient(false);
    setIsEdit(false);
    dispatch(resetObjPayload());
    dispatch(resetValidationErrors());
  };

  const handleSave = async () => {
    const mappingPayload = {
      ...payload,
      kecamatan_id: payload?.kecamatan?.id?.toString(),
    };

    const schemaMapping = {
      schema: recipientSchema,
      setErrors: setValidationErrors,
      resetErrors: resetValidationErrors,
    };

    const validate = setErrorValidation(
      mappingPayload,
      dispatch,
      schemaMapping
    );

    if (validate) {
      await fetchApi(
        isEdit ? 'PUT' : 'POST',
        `${process.env.NEXT_PUBLIC_API_URL}/penerima${isEdit ? `/${selectedId}` : ''}`,
        {
          ..._.omit(mappingPayload, ['kecamatan']),
          kecamatan_id: Number(mappingPayload?.kecamatan_id),
        }
      );

      recipientListRefetch();
      dispatch(resetObjPayload());
      dispatch(resetValidationErrors());
      setShowModalRecipient(false);
      setIsEdit(false);
    }
  };
  // [ END ] handler for modal add

  return (
    <Master isBlankLayout={false}>
      <Breadcrumbs data={breadcrumbs} />
      <div className='w-full flex items-center justify-between mb-7'>
        <PageTitle text='Recipient' />
        <div className='flex gap-2'>
          <Button
            isIconOnly
            color='warning'
            variant={isFilterActive ? 'shadow' : 'bordered'}
            onPress={handleOpenModalFilter}
          >
            <Filter />
          </Button>
          <Button
            isIconOnly
            color='success'
            variant='bordered'
            onPress={handleOpenModalAdd}
          >
            <UserPlusIcon />
          </Button>
        </div>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {data?.length
          ? data?.map((dataRecipient, indexRecipient) => {
              return (
                <CardRecipient
                  key={indexRecipient}
                  data={dataRecipient}
                  isOpenEdit={showModalDelete}
                  handleOpenEdit={handleOpenModalEdit}
                  handleOpenDelete={handleOpenModalDelete}
                  handleCloseDelete={handleCloseModalDelete}
                  handleSubmitDelete={handleSubmitModalDelete}
                />
              );
            })
          : ''}
      </div>
      <div className='mt-6 w-full flex justify-center'>
        <Pagination
          showControls
          total={totalPage}
          initialPage={filter?.page || 1}
          page={filter?.page || 1}
          onChange={handleChangePagination}
        />
      </div>
      <ModalRecipient
        isOpen={showModalRecipient}
        payload={payload}
        validation={validation}
        handleCloseModal={handleCloseModalRecipient}
        handleChangePayload={handleChangePayload}
        handleResetPayload={handleResetPayload}
        handleSubmit={handleSave}
      />
      <ModalFilterRecipient
        isOpen={showModalFilterRecipient}
        payload={filter}
        handleCloseModal={handleCloseModalFilter}
        handleChangePayload={handleChangeFilter}
        handleReset={handleResetFilter}
        handleSubmit={handleSubmitFilter}
      />
    </Master>
  );
};

export default Home;
