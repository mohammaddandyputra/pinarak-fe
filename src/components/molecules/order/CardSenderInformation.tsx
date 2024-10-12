import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Textarea,
  Checkbox,
} from '@nextui-org/react';
import { FormLabel, SenderSelect } from '../common';
import { LocationSelect, TextInputPhoneNumber } from '@/components/atoms';
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
                <SenderSelect
                  selectedValue={
                    data?.pengirim_id
                      ? {
                          id: data?.pengirim_id,
                          nama: data?.pengirim_nama,
                          no_telepon: data?.pengirim_no_telepon,
                        }
                      : null
                  }
                  placeholder='Masukkan nama pengirim'
                  handleChangeValue={(value) => handleChangeSelection?.(value)}
                  handleInputValue={(value) =>
                    handleChangePayload?.('pengirim_nama', value)
                  }
                  handleResetValue={() => handleResetPayload?.('pengirim_nama')}
                />
              }
              errors={validation?.pengirim_nama}
              labelPositionTop
            />
            <FormLabel
              label='Nomer Telepon*'
              form={
                <TextInputPhoneNumber
                  value={data?.pengirim_no_telepon}
                  selectValue={data?.pengirim_kode_negara}
                  placeholder='Masukkan nomer telepon pengirim'
                  handleChange={(value) => {
                    handleChangePayload?.('pengirim_no_telepon', value);
                  }}
                  handleChangeSelect={(value) =>
                    handleChangePayload?.('pengirim_kode_negara', value)
                  }
                />
              }
              errors={validation?.pengirim_no_telepon}
              labelPositionTop
            />
            <FormLabel
              label='Kecamatan, Kota Asal*'
              form={
                <LocationSelect
                  selectedValue={data?.pengirim_kecamatan || null}
                  placeholder='Ketik atau pilih alamat tujuan'
                  handleChangeValue={(value) =>
                    handleChangePayload?.('pengirim_kecamatan', value)
                  }
                  handleResetValue={() =>
                    handleResetPayload?.('pengirim_kecamatan')
                  }
                />
              }
              errors={validation?.pengirim_kecamatan_id}
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
                  value={data?.pengirim_alamat || ''}
                  onChange={(e) =>
                    handleChangePayload?.('pengirim_alamat', e.target.value)
                  }
                />
              }
              errors={validation?.pengirim_alamat}
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
