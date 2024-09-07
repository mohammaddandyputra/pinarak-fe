import { getCookie } from 'cookies-next';
import { useSession } from 'next-auth/react';

const getTokenConfig = (): RequestInit => {
  const { data: session } = useSession();

  const accessToken = (session?.user as any)?.accessToken;

  const config: RequestInit = {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };

  return config;
};

export default getTokenConfig;
