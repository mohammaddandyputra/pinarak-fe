import { useQuery } from '@tanstack/react-query';
import getFetcherData from '@/utils/getFetcherData';

const useBannerList = () => {
  const {
    data: bannerListData,
    error: bannerListError,
    isLoading: bannerListIsLoading,
    refetch: bannerListMutate,
  } = useQuery<any[], Error>({
    queryKey: ['bannerList'],
    queryFn: () => getFetcherData(`${process.env.NEXT_PUBLIC_API_URL}/banner`),
  });

  return {
    bannerListData,
    bannerListIsLoading,
    bannerListError,
    bannerListMutate,
  };
};

export default useBannerList;
