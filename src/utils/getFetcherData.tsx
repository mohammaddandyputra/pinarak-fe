import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

const useFetcherData = (url: string) => {
  const { getToken } = useAuth();

  const fetchData = async () => {
    const token = await getToken();
    console.log('Token:', token); // Logging token

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

  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchData', url],
    queryFn: fetchData,
  });

  return { data, error, isLoading };
};

export default useFetcherData;