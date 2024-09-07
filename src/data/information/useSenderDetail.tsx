import { useQuery } from '@tanstack/react-query';
import { useFetcherData } from '@/utils';
import { ApiResponse } from '@/interfaces/common';

interface IParamsProps {
  id: string;
}

const useSenderDetail = ({ id }: IParamsProps) => {
  const fetcher = useFetcherData();

  const {
    data: senderDetailData,
    error: senderDetailError,
    isLoading: senderDetailIsLoading,
    refetch: senderDetailRefetch,
  } = useQuery<ApiResponse, Error>({
    queryKey: ['senderDetail', id],
    queryFn: () => fetcher(`${process.env.NEXT_PUBLIC_API_URL}/pengirim/${id}`),
  });

  return {
    senderDetailData,
    senderDetailIsLoading,
    senderDetailError,
    senderDetailRefetch,
  };
};

export default useSenderDetail;
