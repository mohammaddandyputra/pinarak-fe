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
  const formatNominal = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const unformatNominal = (value: string) => {
    return value.replace(/\./g, '');
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    let unformattedValue = unformatNominal(inputValue);

    if (/^\d*$/.test(unformattedValue)) {
      if (value === '0' && unformattedValue.length > 1) {
        unformattedValue = unformattedValue.replace(/^0+/, '');
      }
      handleChange(unformattedValue);
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
