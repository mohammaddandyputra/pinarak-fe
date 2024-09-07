import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import CardContentShipmentType from './CardContentShipmentType';
import { ErrorValidation } from '@/components/atoms';

interface CardShipmentTypeProps {
  data: Record<string, any>;
  validation: any;
  handleClick: (value: string) => void;
}

const CardShipmentType = ({
  data,
  validation,
  handleClick,
}: CardShipmentTypeProps) => {
  return (
    <Card>
      <CardHeader>
        <div className='flex justify-center items-center gap-2'>
          <p className='text-base font-semibold'>Jenis Pengiriman</p>
          {validation?.shipment_type ? (
            <ErrorValidation
              message={validation?.shipment_type}
              className='font-bold'
            />
          ) : (
            ''
          )}
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='grid grid-cols-4 gap-4 p-2'>
          <CardContentShipmentType
            name='lite'
            description='Pengiriman Murah & Ekonomis'
            isSelected={data?.shipment_type === 'lite'}
            handleClick={handleClick}
          />
          <CardContentShipmentType
            name='express'
            description='Pengiriman Cepat & Prioritas'
            isSelected={data?.shipment_type === 'express'}
            handleClick={handleClick}
          />
          <CardContentShipmentType
            name='reguler'
            description='Pengiriman Standar'
            isSelected={data?.shipment_type === 'reguler'}
            handleClick={handleClick}
          />
          <CardContentShipmentType
            name='trucking'
            description='Pengiriman Paket Besar'
            isSelected={data?.shipment_type === 'trucking'}
            handleClick={handleClick}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default CardShipmentType;
