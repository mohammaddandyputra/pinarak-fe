import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { DivAction } from '@/components/atoms';

interface CardContentShipmentTypeProps {
  name: 'lite' | 'express' | 'reguler' | 'trucking';
  description: string;
  isSelected: boolean;
  handleClick: (name: 'lite' | 'express' | 'reguler' | 'trucking') => void;
}

const CardContentShipmentType = ({
  name,
  description,
  isSelected,
  handleClick,
}: CardContentShipmentTypeProps) => {
  const colorClasses = {
    lite: 'bg-green-300',
    express: 'bg-orange-300',
    reguler: 'bg-blue-300',
    trucking: 'bg-red-300',
  };

  const colorClass = colorClasses[name];

  return (
    <DivAction handleClick={() => handleClick(name)}>
      <Card className='h-full'>
        <CardHeader
          className={isSelected ? colorClass : 'bg-gray-300 opacity-50'}
        >
          <div className='w-full flex justify-center'>
            <p className='text-xl font-semibold'>{name.toUpperCase()}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className={isSelected ? '' : 'opacity-50'}>
          <div className='w-full flex justify-center'>
            <p className='text-sm font-normal'>{description}</p>
          </div>
        </CardBody>
      </Card>
    </DivAction>
  );
};

export default CardContentShipmentType;
