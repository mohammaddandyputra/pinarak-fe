import { useQuery } from '@tanstack/react-query';
import getFetcherData from '@/utils/getFetcherData';

const useUser = () => {
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
    refetch: userMutate,
  } = useQuery<any[], Error>({
    queryKey: ['users'],
    queryFn: () =>
      getFetcherData(`${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow`),
  });

  return {
    userData,
    userIsLoading,
    userError,
    userMutate,
  };
};

export default useUser;
