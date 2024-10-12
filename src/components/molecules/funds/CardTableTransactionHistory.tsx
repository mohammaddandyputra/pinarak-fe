import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';

interface CardTableTransactionHistoryProps {
  data?: Record<string, any>;
}

const CardTableTransactionHistory = ({
  data,
}: CardTableTransactionHistoryProps) => {
  return (
    <Card>
      <CardHeader className='gap-2'>
        <span className='text-base font-semibold'>Riwayat Transaksi</span>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='w-full flex flex-col gap-4 p-2'>
          <Table color='success'>
            <TableHeader>
              <TableColumn>
                {' '}
                <p className='text-sm text-black'>ID Transaksi</p>
              </TableColumn>
              <TableColumn>
                {' '}
                <p className='text-sm text-black'>Jenis Transaksi</p>
              </TableColumn>
              <TableColumn>
                {' '}
                <p className='text-sm text-black'>Jumlah Transaksi</p>
              </TableColumn>
              <TableColumn>
                {' '}
                <p className='text-sm text-black'>Tanggal Transaksi</p>
              </TableColumn>
              <TableColumn>
                {' '}
                <p className='text-sm text-black'>Status</p>
              </TableColumn>
            </TableHeader>
            <TableBody emptyContent={'No rows to display.'}>
              {data?.length
                ? data?.map((item: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>
                        <p className='text-sm text-black'>{item?.order_id}</p>
                      </TableCell>
                      <TableCell>
                        <p className='text-sm text-black'>
                          {item?.transaction_type}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className='text-sm text-black'>
                          {item?.gross_amount}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className='text-sm text-black'>{item?.created_at}</p>
                      </TableCell>
                      <TableCell>
                        <p className='text-sm text-black'>
                          {item?.payment_status}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))
                : []}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardTableTransactionHistory;
