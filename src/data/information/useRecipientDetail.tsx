import { useQuery } from '@tanstack/react-query';
import getFetcherData from '@/utils/getFetcherData';
import { ApiResponse } from '@/interfaces/common';

interface IParamsProps {
  id: string;
}

const useRecipientDetail = ({ id }: IParamsProps) => {
  const {
    data: recipientDetailData,
    error: recipientDetailError,
    isLoading: recipientDetailIsLoading,
    refetch: recipientDetailRefetch,
  } = useQuery<ApiResponse, Error>({
    queryKey: ['recipientDetail', id],
    queryFn: () =>
      getFetcherData(`${process.env.NEXT_PUBLIC_API_URL}/penerima/${id}`),
  });

  return {
    recipientDetailData,
    recipientDetailIsLoading,
    recipientDetailError,
    recipientDetailRefetch,
  };
};

export default useRecipientDetail;
