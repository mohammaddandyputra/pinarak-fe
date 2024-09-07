import { ErrorValidation } from '@/components/atoms';
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
      <CardHeader className='gap-2'>
        <p className='text-base font-semibold'>Metode Pembayaran</p>
        {validation?.metode_pembayaran ? (
          <ErrorValidation message={validation?.metode_pembayaran} />
        ) : (
          ''
        )}
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='p-2'>
          <RadioGroup
            value={data?.metode_pembayaran}
            defaultValue={data?.metode_pembayaran}
          >
            <div className='flex gap-4'>
              <Radio
                value='non-cod'
                onChange={(e) =>
                  handleChangePayload?.('metode_pembayaran', e.target.value)
                }
              >
                Non-COD
              </Radio>
              <Radio
                value='cod'
                onChange={(e) =>
                  handleChangePayload?.('metode_pembayaran', e.target.value)
                }
              >
                COD (Cash On Delivery)
              </Radio>
            </div>
          </RadioGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardPaymentMethod;
