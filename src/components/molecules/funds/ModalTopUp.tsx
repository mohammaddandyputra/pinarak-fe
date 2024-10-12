import React from 'react';
import {
  Accordion,
  AccordionItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Divider,
} from '@nextui-org/react';
import {
  DivAction,
  ErrorValidation,
  TextInputNominal,
} from '@/components/atoms';
import { convertToNominal } from '@/utils';

interface ModalTopUpProps {
  isOpen: boolean;
  payload: Record<string, any>;
  validation: any;
  handleClose: () => void;
  handleChangePayload?: (property: string, value: any) => void;
}

const ModalTopUp = ({
  isOpen,
  payload,
  validation,
  handleClose,
  handleChangePayload,
}: ModalTopUpProps) => {
  const nominalList = [50000, 100000, 250000, 500000, 750000, 1000000];

  return (
    <Modal
      size='lg'
      aria-label='Modal Top Up'
      isOpen={isOpen}
      onClose={handleClose}
      isDismissable={false}
      isKeyboardDismissDisabled
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Top up</ModalHeader>
        <Divider />
        <ModalBody className='p-5 flex-col gap-4'>
          <Card className='p-2'>
            <CardBody className='flex flex-col gap-3'>
              <TextInputNominal
                placeholder='0'
                value={payload?.nominal || '0'}
                handleChange={(value) =>
                  handleChangePayload?.('nominal', value)
                }
                startIcon={
                  <div className='h-full -ml-2 px-2 flex items-center justify-center border-r-3 border-white'>
                    Rp.
                  </div>
                }
              />
              {validation?.nominal ? (
                <ErrorValidation message={validation?.nominal} />
              ) : (
                ''
              )}
              <div className='grid grid-cols-3 gap-3'>
                {nominalList?.map((value, index) => {
                  return (
                    <DivAction
                      key={index}
                      className='border rounded-xl border-gray-300 bg-gray-200 flex justify-center items-center py-2'
                      handleClick={() =>
                        handleChangePayload?.('nominal', value?.toString())
                      }
                    >
                      {convertToNominal(value)}
                    </DivAction>
                  );
                })}
              </div>
              <Accordion>
                <AccordionItem key='1' aria-label='QRIS' title='QRIS'>
                  test
                </AccordionItem>
                <AccordionItem
                  key='2'
                  aria-label='Transfer Bank'
                  title='Transfer Bank'
                >
                  test
                </AccordionItem>
                <AccordionItem
                  key='3'
                  aria-label='Dompet Digital'
                  title='Dompet Digital'
                >
                  test
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
          <Button color='primary' variant='solid' onPress={handleClose}>
            <span className='font-semibold text-base'>Konfirmasi & Top up</span>
          </Button>
        </ModalBody>
        {/* <ModalFooter>
          <Button color='danger' variant='light' onPress={handleClose}>
            Tidak
          </Button>
          <Button color='primary' onPress={handleSubmit}>
            Ya, Hapus
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default ModalTopUp;
