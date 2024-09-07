import { useQuery } from '@tanstack/react-query';
import { useFetcherData } from '@/utils';
import { ApiResponse } from '@/interfaces/common';

const useSenderList = (filter: any) => {
  const fetcher = useFetcherData();

  const {
    data: senderListData,
    error: senderListError,
    isLoading: senderListIsLoading,
    refetch: senderListRefetch,
  } = useQuery<ApiResponse, Error>({
    queryKey: ['senderList', filter],
    queryFn: () =>
      fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/pengirim?page=${filter?.page || 1}&limit=${filter?.limit || 8}&nama=${filter?.nama || ''}&no_telepon=${filter?.no_telepon || ''}&alamat=${filter?.alamat || ''}`
      ),
  });

  return {
    senderListData,
    senderListIsLoading,
    senderListError,
    senderListRefetch,
  };
};

export default useSenderList;
