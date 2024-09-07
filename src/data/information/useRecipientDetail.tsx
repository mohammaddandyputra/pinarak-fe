import { useQuery } from '@tanstack/react-query';
import { useFetcherData } from '@/utils';
import { ApiResponse } from '@/interfaces/common';

interface IParamsProps {
  id: string;
}

const useRecipientDetail = ({ id }: IParamsProps) => {
  const fetcher = useFetcherData();

  const {
    data: recipientDetailData,
    error: recipientDetailError,
    isLoading: recipientDetailIsLoading,
    refetch: recipientDetailRefetch,
  } = useQuery<ApiResponse, Error>({
    queryKey: ['recipientDetail', id],
    queryFn: () => fetcher(`${process.env.NEXT_PUBLIC_API_URL}/penerima/${id}`),
  });

  return {
    recipientDetailData,
    recipientDetailIsLoading,
    recipientDetailError,
    recipientDetailRefetch,
  };
};

export default useRecipientDetail;
