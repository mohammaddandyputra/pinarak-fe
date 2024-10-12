import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { Wallet, SquarePlus } from 'lucide-react';
import { DivAction } from '@/components/atoms';

interface CardSaldoProps {
  data: Record<string, any>;
  handleClickTopUp: () => void;
}

const CardSaldo = ({ data, handleClickTopUp }: CardSaldoProps) => {
  return (
    <Card className='w-fit'>
      <div className='flex min-h-20'>
        <div className='flex items-center gap-2 py-4 px-6'>
          <div className='border-2 rounded-full bg-gray-100 p-1.5'>
            <Wallet />
          </div>
          <span>Rp. 350.000.000.000.000</span>
        </div>
        <DivAction
          handleClick={handleClickTopUp}
          className='bg-blue-700 hover:bg-blue-600 w-24 flex flex-col items-center justify-center gap-1'
        >
          <SquarePlus color='white' />
          <p className='text-base font-semibold text-white'>Top Up</p>
        </DivAction>
      </div>
    </Card>
  );
};

export default CardSaldo;
