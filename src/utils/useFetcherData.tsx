import { ApiResponse } from '@/interfaces/common';
import { useAuth } from '@clerk/nextjs';

const useFetcherData = () => {
  const { getToken } = useAuth();

  const fetcher = async (url: string): Promise<ApiResponse> => {
    const token = await getToken();

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
