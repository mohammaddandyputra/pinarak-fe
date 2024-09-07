import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Textarea,
  Checkbox,
  Button,
} from '@nextui-org/react';
import { FormLabel, RecipientSelect } from '../common';
import { LocationSelect, TextInputPhoneNumber } from '@/components/atoms';
import { Home, Building } from 'lucide-react';
import _ from 'lodash';

interface CardSenderInformationProps {
  data: Record<string, any>;
  validation: any;
  handleChangeSelection?: (value: any) => void;
  handleChangePayload?: (property: string, value: any) => void;
  handleResetPayload?: (property: string) => void;
}

const CardSenderInformation = ({
  data,
  validation,
  handleChangeSelection,
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
                <RecipientSelect
                  selectedValue={
                    data?.penerima_id
                      ? {
                          id: data?.penerima_id,
                          nama: data?.penerima_nama,
                          no_telepon: data?.penerima_no_telepon,
                        }
                      : null
                  }
                  placeholder='Masukkan nama penerima'
                  handleChangeValue={(value) => handleChangeSelection?.(value)}
                  handleInputValue={(value) =>
                    handleChangePayload?.('penerima_nama', value)
                  }
                  handleResetValue={() => handleResetPayload?.('penerima_nama')}
                />
              }
              errors={validation?.penerima_nama}
              labelPositionTop
            />
            <FormLabel
              label='Nomer Telepon*'
              form={
                <TextInputPhoneNumber
                  value={data?.penerima_no_telepon}
                  selectValue={data?.penerima_kode_negara}
                  placeholder='Masukkan nomer telepon penerima'
                  handleChange={(value) => {
                    handleChangePayload?.('penerima_no_telepon', value);
                  }}
                  handleChangeSelect={(value) =>
                    handleChangePayload?.('penerima_kode_negara', value)
                  }
                />
              }
              errors={validation?.penerima_no_telepon}
              labelPositionTop
            />
            <FormLabel
              label='Kecamatan, Kota Asal*'
              form={
                <LocationSelect
                  selectedValue={data?.penerima_kecamatan || null}
                  placeholder='Ketik atau pilih alamat tujuan'
                  handleChangeValue={(value) =>
                    handleChangePayload?.('penerima_kecamatan', value)
                  }
                  handleResetValue={() =>
                    handleResetPayload?.('penerima_kecamatan')
                  }
                />
              }
              errors={validation?.penerima_kecamatan_id}
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
                  value={data?.penerima_alamat || ''}
                  onChange={(e) =>
                    handleChangePayload?.('penerima_alamat', e.target.value)
                  }
                />
              }
              errors={validation?.penerima_alamat}
              labelPositionTop
            />
            <div className='min-h-[1.1rem]' />
            <div className='flex justify-end'>
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

export default CardSenderInformation;
