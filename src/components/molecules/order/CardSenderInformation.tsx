import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Textarea,
  Checkbox,
} from '@nextui-org/react';
import { FormLabel } from '../common';
import { LocationSelect, TextInputPhoneNumber } from '@/components/atoms';

interface CardSenderInformationProps {
  data: Record<string, any>;
  validation: any;
  handleChangePayload?: (property: string, value: any) => void;
  handleResetPayload?: (property: string) => void;
}

const CardSenderInformation = ({
  data,
  validation,
  handleChangePayload,
  handleResetPayload,
}: CardSenderInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <p className='text-base font-semibold'>Informasi Pengirim</p>
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
                  placeholder='Masukkan nama pengirim'
                  radius='sm'
                  value={data?.pengirim_nama || ''}
                  onChange={(e) =>
                    handleChangePayload?.('pengirim_nama', e.target.value)
                  }
                />
              }
              labelPositionTop
            />
            <FormLabel
              label='Nomer Telepon*'
              form={
                <TextInputPhoneNumber
                  value={data?.pengirim_no_telepon}
                  placeholder='Masukkan nomer telepon pengirim'
                  handleChange={(value) => {
                    handleChangePayload?.('pengirim_no_telepon', value);
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
                  placeholder='Masukkan alamat pengirim'
                  radius='sm'
                  disableAutosize
                  classNames={{
                    input: 'resize-y min-h-[105px]',
                  }}
                  value={data?.alamat || ''}
                  onChange={(e) =>
                    handleChangePayload?.('pengirim_alamat', e.target.value)
                  }
                />
              }
              labelPositionTop
            />
            <div className='min-h-[1.1rem]' />
            <div className='flex justify-end'>
              <Checkbox
                isSelected={data?.pengirim_is_save}
                value={data?.pengirim_is_save}
                onValueChange={(value) => {
                  handleChangePayload?.('pengirim_is_save', value);
                }}
              >
                <span className='text-sm'>Simpan Data Pengirim</span>
              </Checkbox>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardSenderInformation;
