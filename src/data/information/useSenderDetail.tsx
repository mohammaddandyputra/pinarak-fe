import { useQuery } from '@tanstack/react-query';
import getFetcherData from '@/utils/getFetcherData';
import { ApiResponse } from '@/interfaces/common';

interface IParamsProps {
  id: string;
}

const useSenderDetail = ({ id }: IParamsProps) => {
  const {
    data: senderDetailData,
    error: senderDetailError,
    isLoading: senderDetailIsLoading,
    refetch: senderDetailRefetch,
  } = useQuery<ApiResponse, Error>({
    queryKey: ['senderDetail', id],
    queryFn: () =>
      getFetcherData(`${process.env.NEXT_PUBLIC_API_URL}/pengirim/${id}`),
  });

  return {
    senderDetailData,
    senderDetailIsLoading,
    senderDetailError,
    senderDetailRefetch,
  };
};

export default useSenderDetail;
