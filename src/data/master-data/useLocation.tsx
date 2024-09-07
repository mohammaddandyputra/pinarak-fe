import { useQuery } from '@tanstack/react-query';
import { useFetcherData } from '@/utils';
import { ApiResponse } from '@/interfaces/common';

interface UseLocationParams {
  keyword: string;
}

const useLocation = ({ keyword }: UseLocationParams) => {
  const fetcher = useFetcherData();

  const { data, error, isLoading, refetch } = useQuery<ApiResponse, Error>({
    queryKey: ['location', keyword],
    queryFn: () =>
      fetcher(`${process.env.NEXT_PUBLIC_API_URL}/kecamatan?filter=${keyword}`),
    enabled: !!keyword,
  });

  console.log('Location Data:', data);

  return {
    locationData: data,
    locationIsLoading: isLoading,
    locationError: error,
    locationMutate: refetch,
  };
};

export default useLocation;
