import React from 'react';
import { Card, CardHeader, CardBody, Divider, Chip } from '@nextui-org/react';
import { Phone, MapPin, House, Settings, Trash, SquarePen } from 'lucide-react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { ModalConfirmDelete } from '../common';

interface RecipientData {
  id: number;
  nama: string;
  no_telepon: string;
  alamat: string;
  full_kecamatan: string;
  is_default: boolean;
}

interface CardRecipientProps {
  data: RecipientData;
  isOpenEdit: boolean;
  handleOpenEdit?: (id: number) => void;
  handleCloseEdit?: () => Promise<void>;
  handleSubmitEdit?: () => Promise<void>;
  handleOpenDelete: (id: number) => void;
  handleCloseDelete: () => void;
  handleSubmitDelete: () => Promise<void>;
}

const CardRecipient: React.FC<CardRecipientProps> = ({
  data,
  isOpenEdit,
  handleOpenEdit,
  handleCloseEdit,
  handleSubmitEdit,
  handleOpenDelete,
  handleCloseDelete,
  handleSubmitDelete,
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex justify-between gap-1 w-full'>
            <div className='flex flex-col gap-1'>
              <span className='text-lg font-semibold'>{data?.nama}</span>
              <div className='flex gap-2 items-center'>
                <Phone size={15} />
                <p className='text-sm font-normal'>{data?.no_telepon}</p>
              </div>
            </div>
            <div className='h-fit w-fit flex items-center justify-end gap-1.5'>
              {data?.is_default ? (
                <Chip color='primary' size={'sm'}>
                  <b>Default</b>
                </Chip>
              ) : (
                ''
              )}
              <Dropdown>
                <DropdownTrigger>
                  <button>
                    <Settings size={22} />
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                  <DropdownItem
                    key='edit'
                    onClick={() => {
                      if (handleOpenEdit) {
                        handleOpenEdit(data?.id);
                      }
                    }}
                  >
                    <div className='flex items-center gap-2'>
                      <SquarePen size={22} />
                      <span>Edit</span>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    key='delete'
                    onClick={() => {
                      if (handleOpenDelete) {
                        handleOpenDelete(data?.id);
                      }
                    }}
                  >
                    <div className='flex items-center gap-2'>
                      <Trash size={22} color='red' />
                      <span className='text-red-500'>Delete</span>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='flex flex-col gap-1'>
            <div className='flex gap-2'>
              <div className='!w-4 mt-1'>
                <House size={15} />
              </div>
              <p className='text-base'>{data?.alamat}</p>
            </div>
            <div className='flex gap-2'>
              <div className='!w-4 mt-1'>
                <MapPin size={15} />
              </div>
              <p className='text-base'>{data?.full_kecamatan}</p>
            </div>
          </div>
        </CardBody>
      </Card>
      <ModalConfirmDelete
        isOpen={isOpenEdit}
        handleClose={handleCloseDelete}
        handleSubmit={handleSubmitDelete}
      />
    </>
  );
};

export default CardRecipient;
