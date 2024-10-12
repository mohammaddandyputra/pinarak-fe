import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

interface ModalConfirmDeleteProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => Promise<void>;
}

const ModalConfirmDelete = ({
  isOpen,
  handleClose,
  handleSubmit,
}: ModalConfirmDeleteProps) => {
  return (
    <Modal
      aria-label='Modal confirm delete'
      isOpen={isOpen}
      isDismissable={false}
      isKeyboardDismissDisabled
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          Konfirmasi Penghapusan
        </ModalHeader>
        <ModalBody>
          <p>Apakah Anda yakin ingin menghapus item ini?</p>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={handleClose}>
            Tidak
          </Button>
          <Button color='primary' onPress={handleSubmit}>
            Ya, Hapus
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirmDelete;
