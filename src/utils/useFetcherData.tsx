import { ApiResponse } from '@/interfaces/common';
import { useSession } from 'next-auth/react';

interface Session {
  user: {
    id?: number;
    nama?: string;
    email?: string;
    role_id?: number;
    unit_id?: number;
    is_superadmin?: boolean;
    is_verified?: boolean;
  };
  accessToken?: string;
}

const useFetcherData = () => {
  const { data: session } = useSession();

  const fetcher = async (url: string): Promise<ApiResponse> => {
    const token = (session as Session)?.accessToken;

    if (!token) {
      throw new Error('Token is null or undefined');
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Network response error:', response.statusText);
      throw new Error('Network response error');
    }

    return response.json();
  };

  return fetcher;
};

export default useFetcherData;
