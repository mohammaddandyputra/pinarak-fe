import { getCookie } from 'cookies-next';

const getTokenConfig = (): RequestInit => {
  const token = getCookie('token') as string | undefined;

  const config: RequestInit = {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    credentials: 'include',
  };

  return config;
};

export default getTokenConfig;
