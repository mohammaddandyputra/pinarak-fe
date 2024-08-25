import { useQuery } from '@tanstack/react-query';
import getFetcherData from '@/utils/getFetcherData';
import { ApiResponse } from '@/interfaces/common';

interface UseLocationParams {
  keyword: string;
}

const useLocation = ({ keyword }: UseLocationParams) => {
  const {
    data: locationData,
    error: locationError,
    isLoading: locationIsLoading,
    refetch: locationMutate,
  } = useQuery<ApiResponse, Error>({
    queryKey: ['location', keyword],
    queryFn: () =>
      getFetcherData(
        `${process.env.NEXT_PUBLIC_API_URL}/kecamatan?filter=${keyword}`
      ),
  });

  return {
    locationData,
    locationIsLoading,
    locationError,
    locationMutate,
  };
};

export default useLocation;
