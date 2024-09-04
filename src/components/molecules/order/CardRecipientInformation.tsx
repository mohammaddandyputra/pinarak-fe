import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Textarea,
  Checkbox,
  Button,
} from '@nextui-org/react';
import { FormLabel } from '../common';
import {
  LocationSelect,
  TextInputNumber,
  TextInputPhoneNumber,
} from '@/components/atoms';
import { Home, Building } from 'lucide-react';

interface CardRecipientInformationProps {
  data: Record<string, any>;
  validation: any;
  handleChangePayload?: (property: string, value: any) => void;
  handleResetPayload?: (property: string) => void;
}

const CardRecipientInformation = ({
  data,
  validation,
  handleChangePayload,
  handleResetPayload,
}: CardRecipientInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <p className='text-base font-semibold'>Informasi Penerima</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='w-full flex gap-4'>
          <div className='w-1/2 flex flex-col gap-4'>
            <FormLabel
              label='Nama*'
              form={
                <Input
                  type='text'
                  placeholder='Masukkan nama penerima'
                  radius='sm'
                  value={data?.penerima_nama || ''}
                  onChange={(e) =>
                    handleChangePayload?.('penerima_nama', e.target.value)
                  }
                />
              }
              labelPositionTop
            />
            <FormLabel
              label='Nomer Telepon*'
              form={
                <TextInputPhoneNumber
                  value={data?.penerima_no_telepon}
                  placeholder='Masukkan nomer telepon penerima'
                  handleChange={(value) => {
                    handleChangePayload?.('penerima_no_telepon', value);
                  }}
                />
              }
              labelPositionTop
            />
            <FormLabel
              label='Kecamatan, Kota Asal*'
              form={
                <LocationSelect
                  selectedValue={data?.kecamatan || null}
                  placeholder='Ketik atau pilih alamat tujuan'
                  handleChangeValue={(value) =>
                    handleChangePayload?.('penerima_kecamatan', value)
                  }
                  handleResetValue={() =>
                    handleResetPayload?.('penerima_kecamatan')
                  }
                />
              }
              labelPositionTop
            />
          </div>
          <div className='w-1/2 flex flex-col gap-4'>
            <FormLabel
              label='Alamat*'
              form={
                <Textarea
                  placeholder='Masukkan alamat penerima'
                  radius='sm'
                  disableAutosize
                  classNames={{
                    input: 'resize-y min-h-[105px]',
                  }}
                  value={data?.alamat || ''}
                  onChange={(e) =>
                    handleChangePayload?.('penerima_alamat', e.target.value)
                  }
                />
              }
              labelPositionTop
            />
            <div className='min-h-[1rem]' />
            <div
              className='flex justify-between'
              color={
                data?.penerima_jenis_alamat === 'rumah' ? 'danger' : 'default'
              }
            >
              <div className='flex gap-3'>
                <Button
                  size='sm'
                  variant='bordered'
                  color={
                    data?.penerima_jenis_alamat === 'rumah'
                      ? 'danger'
                      : 'default'
                  }
                  onClick={() =>
                    handleChangePayload?.('penerima_jenis_alamat', 'rumah')
                  }
                >
                  <Home
                    size={18}
                    color={
                      data?.penerima_jenis_alamat === 'rumah' ? 'red' : 'gray'
                    }
                  />
                  <span
                    className={`font-semibold text-base ${data?.penerima_jenis_alamat === 'rumah' ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    Rumah
                  </span>
                </Button>
                <Button
                  size='sm'
                  variant='bordered'
                  color={
                    data?.penerima_jenis_alamat === 'kantor'
                      ? 'danger'
                      : 'default'
                  }
                  onClick={() =>
                    handleChangePayload?.('penerima_jenis_alamat', 'kantor')
                  }
                >
                  <Building
                    size={18}
                    color={
                      data?.penerima_jenis_alamat === 'kantor' ? 'red' : 'gray'
                    }
                  />
                  <span
                    className={`font-semibold text-base ${data?.penerima_jenis_alamat === 'kantor' ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    Kantor
                  </span>
                </Button>
              </div>
              <Checkbox
                isSelected={data?.penerima_is_save}
                value={data?.penerima_is_save}
                onValueChange={(value) => {
                  handleChangePayload?.('penerima_is_save', value);
                }}
              >
                <span className='text-sm'>Simpan Data Penerima</span>
              </Checkbox>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardRecipientInformation;
