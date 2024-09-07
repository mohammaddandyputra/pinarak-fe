import { TextInputNumber } from '@/components/atoms';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Input,
  Divider,
} from '@nextui-org/react';
import { Phone } from 'lucide-react';
import { FormLabel } from '../common';

interface ModalFilterRecipientProps {
  isOpen: boolean;
  payload: Record<string, any>;
  handleCloseModal: () => void;
  handleChangePayload?: (property: string, value: any) => void;
  handleReset: () => void;
  handleSubmit: () => Promise<void>;
}

const ModalFilterRecipient = ({
  isOpen,
  payload,
  handleCloseModal,
  handleChangePayload,
  handleReset,
  handleSubmit,
}: ModalFilterRecipientProps) => {
  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Filter Data</ModalHeader>
        <Divider />
        <ModalBody>
          <div className='flex flex-col gap-4  pt-2 pb-3'>
            <FormLabel
              label='Nama Pengirim'
              form={
                <Input
                  type='text'
                  placeholder='Masukkan nama pengirim'
                  radius='sm'
                  value={payload?.nama || ''}
                  onChange={(e) => {
                    if (handleChangePayload) {
                      handleChangePayload('nama', e.target.value);
                    }
                  }}
                />
              }
              labelPositionTop
            />
            <FormLabel
              label='Nomer Telepon Pengirim'
              form={
                <TextInputNumber
                  value={payload?.no_telepon}
                  placeholder='Masukkan nomer telepon pengirim'
                  startIcon={
                    <div className='h-full -ml-2 px-2 flex items-center justify-center border-r-3 border-white'>
                      <Phone size={20} />
                    </div>
                  }
                  handleChange={(value) => {
                    if (handleChangePayload) {
                      handleChangePayload('no_telepon', value);
                    }
                  }}
                />
              }
              labelPositionTop
            />
            <FormLabel
              label='Alamat Pengirim'
              form={
                <Textarea
                  placeholder='Masukkan alamat pengirim'
                  radius='sm'
                  disableAutosize
                  classNames={{
                    input: 'resize-y min-h-[105px]',
                  }}
                  value={payload?.alamat || ''}
                  onChange={(e) => {
                    if (handleChangePayload) {
                      handleChangePayload?.('alamat', e.target.value);
                    }
                  }}
                />
              }
              labelPositionTop
            />
          </div>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button color='danger' variant='light' onPress={handleReset}>
            Reset
          </Button>
          <Button color='primary' onPress={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalFilterRecipient;
