import { useQuery } from '@tanstack/react-query';
import { useFetcherData } from '@/utils';
import { ApiResponse } from '@/interfaces/common';

const useRecipientList = (filter: any) => {
  const fetcher = useFetcherData();

  const {
    data: recipientListData,
    error: recipientListError,
    isLoading: recipientListIsLoading,
    refetch: recipientListRefetch,
  } = useQuery<ApiResponse, Error>({
    queryKey: ['recipientList', filter],
    queryFn: () =>
      fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/penerima?page=${filter?.page || 1}&limit=${filter?.limit || 8}&nama=${filter?.nama || ''}&no_telepon=${filter?.no_telepon || ''}&alamat=${filter?.alamat || ''}`
      ),
  });

  return {
    recipientListData,
    recipientListIsLoading,
    recipientListError,
    recipientListRefetch,
  };
};

export default useRecipientList;
