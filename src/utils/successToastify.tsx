import { toast } from 'react-toastify';

const successToastify = (message: string) => {
  return toast.success(message, { theme: 'colored' });
};

export default successToastify;
