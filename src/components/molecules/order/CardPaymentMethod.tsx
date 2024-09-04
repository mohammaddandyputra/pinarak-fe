import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  RadioGroup,
  Radio,
} from '@nextui-org/react';

interface CardPaymentMethodProps {
  data?: Record<string, any>;
  validation?: any;
  handleChangePayload?: (property: string, value: any) => void;
}

const CardPaymentMethod = ({
  data,
  validation,
  handleChangePayload,
}: CardPaymentMethodProps) => {
  return (
    <Card>
      <CardHeader>
        <p className='text-base font-semibold'>Metode Pembayaran</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='p-2'>
          <RadioGroup>
            <div className='flex gap-4'>
              <Radio value='buenos-aires'>Non-COD</Radio>
              <Radio value='sydney'>COD (Cash On Delivery)</Radio>
            </div>
          </RadioGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardPaymentMethod;
