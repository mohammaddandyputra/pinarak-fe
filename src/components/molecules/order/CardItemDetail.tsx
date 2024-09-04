import { Card, CardHeader, CardBody, Divider, Button } from '@nextui-org/react';
import TableItems from './TableItems';
import { Plus } from 'lucide-react';

interface CardItemDetailProps {
  data?: Record<string, any>;
  validation?: any;
  handleChangePayload?: (property: string, value: any) => void;
  handleChangePayloadItem?: (
    property: string,
    index: number,
    value: any
  ) => void;
  handleResetPayload?: (property: string) => void;
  handleClickAddItem?: () => void;
  handleClickDeleteItem?: (index: number) => void;
}

const CardItemDetail = ({
  data,
  validation,
  handleChangePayload,
  handleChangePayloadItem,
  handleResetPayload,
  handleClickAddItem,
  handleClickDeleteItem,
}: CardItemDetailProps) => {
  return (
    <Card>
      <CardHeader>
        <p className='text-base font-semibold'>Detail Barang</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='w-full flex flex-col gap-4 p-2'>
          <TableItems
            data={data?.barang}
            validation={validation}
            handleChangePayload={handleChangePayloadItem}
            handleClickDelete={handleClickDeleteItem}
          />
          <div className='w-full flex justify-end'>
            <Button
              color='primary'
              startContent={<Plus size={20} />}
              onClick={handleClickAddItem}
            >
              <span className='font-semibold'>Tambah Barang</span>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardItemDetail;
