import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react';
import { Trash } from 'lucide-react';
import { TextInputNumber } from '@/components/atoms';

interface TableItemsProps {
  data: Record<string, any>;
  validation: any;
  handleChangePayload?: (property: string, index: number, value: any) => void;
  handleClickDelete?: (index: number) => void;
}

const TableItems = ({
  data,
  validation,
  handleChangePayload,
  handleClickDelete,
}: TableItemsProps) => {
  return (
    <Table color='success'>
      <TableHeader>
        <TableColumn>
          <p className='text-sm text-black'>Action</p>
        </TableColumn>
        <TableColumn>
          {' '}
          <p className='text-sm text-black'>Berat Barang (gr)</p>
        </TableColumn>
        <TableColumn>
          {' '}
          <p className='text-sm text-black'>Dimensi/Paket (P x L x T) (cm)</p>
        </TableColumn>
        <TableColumn>
          {' '}
          <p className='text-sm text-black'>Berat Volume</p>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={'No rows to display.'}>
        {data?.length
          ? data?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell width={60}>
                  <Button
                    isIconOnly
                    color='danger'
                    variant='faded'
                    size='sm'
                    onClick={() => handleClickDelete?.(index)}
                  >
                    <Trash size={20} />
                  </Button>
                </TableCell>
                <TableCell>
                  <TextInputNumber
                    value={item?.berat_barang}
                    placeholder='0'
                    handleChange={(value) =>
                      handleChangePayload?.('berat_barang', index, value)
                    }
                  />
                </TableCell>
                <TableCell width={300}>
                  <div className='flex gap-3'>
                    <TextInputNumber
                      value={item?.panjang}
                      label='P'
                      placeholder='0'
                      handleChange={(value) =>
                        handleChangePayload?.('panjang', index, value)
                      }
                    />
                    <TextInputNumber
                      value={item?.lebar}
                      label='L'
                      placeholder='0'
                      handleChange={(value) =>
                        handleChangePayload?.('lebar', index, value)
                      }
                    />
                    <TextInputNumber
                      value={item?.tinggi}
                      label='T'
                      placeholder='0'
                      handleChange={(value) =>
                        handleChangePayload?.('tinggi', index, value)
                      }
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <TextInputNumber
                    value={item?.berat_volume}
                    placeholder='0'
                    handleChange={(value) =>
                      handleChangePayload?.('berat_volume', index, value)
                    }
                  />
                </TableCell>
              </TableRow>
            ))
          : []}
      </TableBody>
    </Table>
  );
};

export default TableItems;
