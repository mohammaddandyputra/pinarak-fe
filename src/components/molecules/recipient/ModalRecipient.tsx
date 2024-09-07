import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Divider,
  Checkbox,
} from '@nextui-org/react';
import { FormLabel } from '../common';
import { LocationSelect, TextInputNumber } from '@/components/atoms';
import { Phone } from 'lucide-react';

interface ModalRecipientProps {
  isOpen: boolean;
  payload: Record<string, any>;
  validation: any;
  handleCloseModal: () => void;
  handleChangePayload?: (property: string, value: any) => void;
  handleResetPayload?: (property: string) => void;
  handleSubmit: () => Promise<void>;
}

const ModalRecipient = ({
  isOpen,
  payload,
  validation,
  handleCloseModal,
  handleChangePayload,
  handleResetPayload,
  handleSubmit,
}: ModalRecipientProps) => {
  const handleChangeValue = (property: string, value: any) => {
    if (handleChangePayload) {
      handleChangePayload(property, value);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          Add Recipient Details
        </ModalHeader>
        <Divider />
        <ModalBody>
          <div className='flex flex-col gap-4 pt-2 pb-3'>
            <FormLabel
              label='Nama*'
              labelPositionTop
              form={
                <Input
                  type='text'
                  placeholder='Masukkan nama pengirim'
                  radius='sm'
                  value={payload?.nama || ''}
                  onChange={(e) => handleChangeValue('nama', e.target.value)}
                />
              }
              errors={validation?.nama}
            />
            <FormLabel
              labelPositionTop
              label='Nomer Telepon*'
              form={
                <TextInputNumber
                  value={payload?.no_telepon}
                  placeholder='Masukkan nomer telepon pengirim'
                  startIcon={
                    <div className='h-full -ml-2 px-2 flex items-center justify-center border-r-3 border-white'>
                      <Phone size={20} />
                    </div>
                  }
                  handleChange={(value) =>
                    handleChangePayload
                      ? handleChangePayload('no_telepon', value)
                      : null
                  }
                />
              }
              errors={validation?.no_telepon}
            />
            <FormLabel
              labelPositionTop
              label='Alamat*'
              form={
                <Textarea
                  placeholder='Masukkan alamat pengirim'
                  radius='sm'
                  disableAutosize
                  classNames={{
                    input: 'resize-y min-h-[105px]',
                  }}
                  value={payload?.alamat || ''}
                  onChange={(e) =>
                    handleChangePayload?.('alamat', e.target.value)
                  }
                />
              }
              errors={validation?.alamat}
            />
            <FormLabel
              labelPositionTop
              label='Kecamatan, Kota Asal*'
              form={
                <LocationSelect
                  selectedValue={payload?.kecamatan || null}
                  placeholder='Ketik atau pilih alamat tujuan'
                  handleChangeValue={(value) =>
                    handleChangePayload?.('kecamatan', value)
                  }
                  handleResetValue={() => handleResetPayload?.('kecamatan')}
                />
              }
              errors={validation?.kecamatan_id}
            />
            <Checkbox
              isSelected={payload?.is_default}
              value={payload?.is_default}
              onValueChange={(value) => {
                if (handleChangePayload) {
                  handleChangePayload('is_default', value);
                }
              }}
            >
              <span className='text-sm'>Jadikan alamat utama</span>
            </Checkbox>
          </div>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button color='primary' onPress={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalRecipient;
