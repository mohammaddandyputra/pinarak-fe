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
} from '@/slices/information/senderInformationSlice';
import { RootState } from '@/stores/store';
import { useEffect, useState } from 'react';
import { useSenderList, useSenderDetail } from '@/data/information';
import recipientSchema from '@/schemas/information/recipientSchema';
import { fetchApi, setErrorValidation } from '@/utils';
import _ from 'lodash';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Pagination,
} from '@nextui-org/react';
import { Filter, UserPlusIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

const Home = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const breadcrumbs = [
    { page: 'Home', path: '/' },
    { page: 'Information', path: '/' },
    { page: 'Sender', path: '/sender' },
  ];

  const [filterData, setFilterData] = useState({});
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const [showModalSender, setShowModalSender] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModalFilterSender, setShowModalFilterSender] =
    useState<boolean>(false);

  const [selectedId, setSelectedId] = useState(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const data = useSelector(
    (state: RootState) => state.senderInformation.objData
  );
  const filter = useSelector(
    (state: RootState) => state.senderInformation.objFilter
  );
  const payload = useSelector(
    (state: RootState) => state.senderInformation.objPayload
  );
  const validation = useSelector(
    (state: RootState) => state.senderInformation.validationErrors
  );

  const { senderListData, senderListRefetch } = useSenderList(filterData);
  const { senderDetailData } = useSenderDetail({
    id: selectedId?.toString(),
  });

  useEffect(() => {
    if (senderListData?.data?.data?.length) {
      const response = senderListData?.data;
      dispatch(setObjData(response?.data));
      setTotalPage(response?.pagination?.total_pages);
    } else {
      dispatch(resetObjData());
      setTotalPage(1);
    }
  }, [senderListData]);

  useEffect(() => {
    if (senderDetailData?.data) {
      const response = senderDetailData?.data;
      dispatch(
        setObjPayload({
          ..._.omit(response, ['Kecamatan']),
          kecamatan: response?.Kecamatan,
        })
      );
    } else {
      dispatch(resetObjPayload());
    }
  }, [senderDetailData, showModalSender]);

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
    setShowModalSender(true);
  };

  const handleOpenModalDelete = (id: number) => {
    setSelectedId(id);
    setShowModalDelete(true);
  };

  const handleOpenModalAdd = () => {
    setShowModalSender(true);
  };

  const handleOpenModalFilter = () => {
    setShowModalFilterSender(true);
  };
  // [ END ] handler for card content

  // [ START ] handler for modal filter
  const handleCloseModalFilter = () => {
    setShowModalFilterSender(false);
  };

  const handleChangeFilter = (property: string, value: any) => {
    dispatch(setObjFilter({ ...filter, [property]: value }));
  };

  const handleResetFilter = () => {
    setShowModalFilterSender(false);
    dispatch(resetObjFilter());
    setFilterData({});
  };

  const handleSubmitFilter = async () => {
    dispatch(setObjFilter({ ...filter, page: 1 }));
    setFilterData({ ...filter, page: 1 });
    senderListRefetch();
    setShowModalFilterSender(false);
  };
  // [ END ] handler for modal filter

  // [ START ] handler modal delete
  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  const handleSubmitModalDelete = async () => {
    await fetchApi(
      session?.accessToken,
      'DELETE',
      `${process.env.NEXT_PUBLIC_API_URL}/pengirim/${selectedId}`,
      {}
    );

    senderListRefetch();
    setShowModalDelete(false);
  };
  // [ END ] handler modal delete

  // [ START ] handler for modal add
  const handleCloseModalRecipient = () => {
    setShowModalSender(false);
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
        session?.accessToken,
        isEdit ? 'PUT' : 'POST',
        `${process.env.NEXT_PUBLIC_API_URL}/pengirim${isEdit ? `/${selectedId}` : ''}`,
        {
          ..._.omit(mappingPayload, ['kecamatan']),
          kecamatan_id: Number(mappingPayload?.kecamatan_id),
        }
      );

      senderListRefetch();
      dispatch(resetObjPayload());
      dispatch(resetValidationErrors());
      setShowModalSender(false);
      setIsEdit(false);
    }
  };
  // [ END ] handler for modal add

  return (
    <Master isBlankLayout={false}>
      <Breadcrumbs data={breadcrumbs} />
      <Card>
        <CardHeader>
          <div className='w-full flex items-center justify-between'>
            <PageTitle text='Sender' />
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
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='p-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {data?.length
              ? data?.map((dataSender, indexSender) => {
                  return (
                    <CardRecipient
                      key={indexSender}
                      data={dataSender}
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
        </CardBody>
        <Divider />
        <CardFooter>
          <div className='w-full flex justify-center'>
            <Pagination
              showControls
              total={totalPage}
              initialPage={filter?.page || 1}
              page={filter?.page || 1}
              onChange={handleChangePagination}
            />
          </div>
        </CardFooter>
        <ModalRecipient
          isOpen={showModalSender}
          payload={payload}
          validation={validation}
          handleCloseModal={handleCloseModalRecipient}
          handleChangePayload={handleChangePayload}
          handleResetPayload={handleResetPayload}
          handleSubmit={handleSave}
        />
        <ModalFilterRecipient
          isOpen={showModalFilterSender}
          payload={filter}
          handleCloseModal={handleCloseModalFilter}
          handleChangePayload={handleChangeFilter}
          handleReset={handleResetFilter}
          handleSubmit={handleSubmitFilter}
        />
      </Card>
    </Master>
  );
};

export default Home;
