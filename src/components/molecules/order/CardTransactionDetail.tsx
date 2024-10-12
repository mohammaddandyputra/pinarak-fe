import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import CardContentShipmentType from './CardContentShipmentType';
import { ErrorValidation } from '@/components/atoms';

interface CardTransactionDetailProps {
  data: Record<string, any>;
  validation: any;
  handleClick: (value: string) => void;
}

const CardTransactionDetail = ({
  data,
  validation,
  handleClick,
}: CardTransactionDetailProps) => {
  return (
    <Card>
      <CardHeader className='gap-2'>
        <p className='text-base font-semibold'>Jenis Pengiriman</p>
        {validation?.jenis_pengiriman ? (
          <ErrorValidation message={validation?.jenis_pengiriman} />
        ) : (
          ''
        )}
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='grid grid-cols-4 gap-4 p-2'>
          <CardContentShipmentType
            name='lite'
            description='Pengiriman Murah & Ekonomis'
            isSelected={data?.jenis_pengiriman === 'lite'}
            handleClick={handleClick}
          />
          <CardContentShipmentType
            name='express'
            description='Pengiriman Cepat & Prioritas'
            isSelected={data?.jenis_pengiriman === 'express'}
            handleClick={handleClick}
          />
          <CardContentShipmentType
            name='reguler'
            description='Pengiriman Standar'
            isSelected={data?.jenis_pengiriman === 'reguler'}
            handleClick={handleClick}
          />
          <CardContentShipmentType
            name='trucking'
            description='Pengiriman Paket Besar'
            isSelected={data?.jenis_pengiriman === 'trucking'}
            handleClick={handleClick}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default CardTransactionDetail;
