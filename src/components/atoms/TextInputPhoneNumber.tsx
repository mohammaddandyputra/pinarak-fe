import React from 'react';
import { Input } from '@nextui-org/react';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import { ImageFlagIndonesia, ImageFlagSingapore } from '@/utils/imageUrl';

interface TextInputPhoneNumberProps {
  placeholder: string;
  value?: string;
  selectValue?: string;
  label?: string;
  handleChange?: (value: string) => void;
  handleChangeSelect?: (value: string) => void;
}

const TextInputPhoneNumber = ({
  placeholder = '',
  value = '',
  selectValue = '',
  label,
  handleChange = () => {},
  handleChangeSelect = () => {},
}: TextInputPhoneNumberProps) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (/^0+/.test(inputValue)) {
      inputValue = inputValue.replace(/^0+/, '');
    }

    if (/^\d*$/.test(inputValue)) {
      handleChange(inputValue);
    }
  };

  return (
    <Input
      type='text'
      radius='sm'
      label={label ? label : undefined}
      startContent={
        <div className='h-full -ml-2 px-2 flex items-center justify-center border-r-3 border-white'>
          <Phone size={20} />
        </div>
      }
      endContent={
        <div className='flex items-center'>
          <select
            className='outline-none border-0 bg-transparent text-default-400 text-small'
            value={selectValue}
            onChange={(e) => handleChangeSelect(e.target.value)}
          >
            <option value='id'>(+62) Indonesia</option>
            <option value='sg'>(+65) Singapore</option>
          </select>
        </div>
      }
      placeholder={placeholder}
      value={value}
      onChange={handleChangeValue}
    />
  );
};

export default TextInputPhoneNumber;
