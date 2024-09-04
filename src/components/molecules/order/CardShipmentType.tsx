import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import CardContentShipmentType from './CardContentShipmentType';

interface CardShipmentTypeProps {
  handleClick: (value: string) => void;
}

const CardShipmentType = ({ handleClick }: CardShipmentTypeProps) => {
  return (
    <Card>
      <CardHeader>
        <p className='text-base font-semibold'>Jenis Pengiriman</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='grid grid-cols-4 gap-4 p-2'>
          <CardContentShipmentType
            name='lite'
            description='Pengiriman Murah & Ekonomis'
            handleClick={handleClick}
          />
          <CardContentShipmentType
            name='express'
            description='Pengiriman Cepat & Prioritas'
            handleClick={handleClick}
          />
          <CardContentShipmentType
            name='reguler'
            description='Pengiriman Standar'
            handleClick={handleClick}
          />
          <CardContentShipmentType
            name='trucking'
            description='Pengiriman Paket Besar'
            handleClick={handleClick}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default CardShipmentType;
