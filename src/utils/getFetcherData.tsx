import { ApiResponse } from '@/interfaces/common';
import { useAuth } from '@clerk/nextjs';

const getFetcherData = async (url: string): Promise<ApiResponse> => {
  const { getToken } = useAuth();

  const token = await getToken();

  if (!token) {
    throw new Error('Token is null or undefined');
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error('Network response error:', res.statusText);
    throw new Error('Network response error');
  }

  return res.json();
};

export default getFetcherData;
