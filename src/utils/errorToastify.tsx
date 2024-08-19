import { toast } from 'react-toastify';

const errorToastify = (message: string) => {
  return toast.error(message, { theme: 'colored' });
};

export default errorToastify;
