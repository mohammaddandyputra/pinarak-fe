import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { DivAction } from '@/components/atoms';

interface CardContentShipmentTypeProps {
  name: 'lite' | 'express' | 'reguler' | 'trucking';
  description: string;
  handleClick: (name: 'lite' | 'express' | 'reguler' | 'trucking') => void;
}

const CardContentShipmentType = ({
  name,
  description,
  handleClick,
}: CardContentShipmentTypeProps) => {
  const colorClasses = {
    lite: 'bg-green-300',
    express: 'bg-orange-300',
    reguler: 'bg-blue-300',
    trucking: 'bg-red-300',
  };

  const colorClass = colorClasses[name] || 'bg-gray-500';

  return (
    <DivAction handleClick={() => handleClick(name)}>
      <Card>
        <CardHeader className={colorClass}>
          <div className='w-full flex justify-center'>
            <p className='text-xl font-semibold'>{name.toUpperCase()}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='w-full flex justify-center'>
            <p className='text-sm font-normal'>{description}</p>
          </div>
        </CardBody>
      </Card>
    </DivAction>
  );
};

export default CardContentShipmentType;
