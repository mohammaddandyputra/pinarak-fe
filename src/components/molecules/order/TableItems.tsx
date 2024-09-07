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
import { TextInputNumber, ErrorValidation } from '@/components/atoms';

interface TableItemsProps {
  data: Record<string, any>;
  dataShipmentType: string;
  validation: any;
  isDisabled?: boolean;
  handleChangePayload?: (property: string, index: number, value: any) => void;
  handleClickDelete?: (index: number) => void;
}

const TableItems = ({
  data,
  dataShipmentType,
  validation,
  isDisabled = false,
  handleChangePayload,
  handleClickDelete,
}: TableItemsProps) => {
  return (
    <Table color='success'>
      <TableHeader>
        <TableColumn className={isDisabled ? 'hidden' : ''}>
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
                <TableCell width={60} className={isDisabled ? 'hidden' : ''}>
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
                    isDisabled={isDisabled}
                    handleChange={(value) =>
                      handleChangePayload?.('berat_barang', index, value)
                    }
                  />
                  {validation[`barang[0].berat_barang`] ? (
                    <ErrorValidation
                      message={validation[`barang[0].berat_barang`]}
                    />
                  ) : (
                    ''
                  )}
                </TableCell>
                <TableCell width={300}>
                  <div className='flex gap-3'>
                    <div>
                      <TextInputNumber
                        value={item?.panjang}
                        label='P'
                        placeholder='0'
                        isDisabled={isDisabled}
                        handleChange={(value) =>
                          handleChangePayload?.('panjang', index, value)
                        }
                      />
                      {validation[`barang[0].panjang`] ? (
                        <ErrorValidation
                          message={validation[`barang[0].panjang`]}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                      <TextInputNumber
                        value={item?.lebar}
                        label='L'
                        placeholder='0'
                        isDisabled={isDisabled}
                        handleChange={(value) =>
                          handleChangePayload?.('lebar', index, value)
                        }
                      />
                      {validation[`barang[0].lebar`] ? (
                        <ErrorValidation
                          message={validation[`barang[0].lebar`]}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                      <TextInputNumber
                        value={item?.tinggi}
                        label='T'
                        placeholder='0'
                        isDisabled={isDisabled}
                        handleChange={(value) =>
                          handleChangePayload?.('tinggi', index, value)
                        }
                      />
                      {validation[`barang[0].tinggi`] ? (
                        <ErrorValidation
                          message={validation[`barang[0].tinggi`]}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <TextInputNumber
                    value={item?.berat_volume}
                    placeholder='0'
                    isDisabled
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
