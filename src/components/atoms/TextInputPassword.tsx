import { Input } from '@nextui-org/react';
import { KeyRound, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface TextInputPasswordProps {
  withIcon?: boolean;
  placeholder?: string;
}

const TextInputPassword = ({
  withIcon,
  placeholder,
}: TextInputPasswordProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      placeholder={placeholder ? placeholder : ''}
      labelPlacement='outside'
      startContent={
        <div className='mr-2'>
          <KeyRound />
        </div>
      }
      endContent={
        <button
          className='focus:outline-none'
          type='button'
          onClick={toggleVisibility}
          aria-label='toggle password visibility'
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </button>
      }
    />
  );
};

export default TextInputPassword;
