import React from 'react';
import { Input } from '@nextui-org/react';

interface TextInputNominalProps {
  placeholder: string;
  value?: string;
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  handleChange?: (value: string) => void;
}

const TextInputNominal = ({
  placeholder = '',
  value = '',
  label,
  startIcon,
  endIcon,
  handleChange = () => {},
}: TextInputNominalProps) => {
  // Fungsi untuk memformat angka dengan titik setiap ribuan
  const formatNominal = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      handleChange(inputValue);
    }
  };

  return (
    <Input
      type='text'
      radius='sm'
      label={label ? label : undefined}
      startContent={startIcon ? startIcon : undefined}
      endContent={endIcon ? endIcon : undefined}
      placeholder={placeholder}
      value={formatNominal(value)}
      onChange={handleChangeValue}
    />
  );
};

export default TextInputNominal;
