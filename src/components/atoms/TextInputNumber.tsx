import React from 'react';
import { Input } from '@nextui-org/react';

interface TextInputNumberProps {
  placeholder: string;
  value: string;
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  handleChange?: (value: string) => void;
}

const TextInputNumber = ({
  placeholder = '',
  value = '',
  label,
  startIcon,
  endIcon,
  handleChange = () => {},
}: TextInputNumberProps) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (inputValue.startsWith('0') && inputValue.length > 1) {
      inputValue = inputValue.replace(/^0+/, '');
    }

    if (/^(0|[1-9]\d*)$/.test(inputValue) || inputValue === '') {
      handleChange(inputValue);
    }
  };

  return (
    <Input
      type='text'
      radius='sm'
      label={label ? label : null}
      startContent={startIcon ? startIcon : null}
      endContent={endIcon ? endIcon : null}
      placeholder={placeholder}
      value={value}
      onChange={handleChangeValue}
    />
  );
};

export default TextInputNumber;
