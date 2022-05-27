import { useRouter } from 'next/router';
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQuery,
} from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithUser } from '@api';

// 면접 GET
const fetchInterview = async (interviewId: string | string[] | undefined) => {
  const { data } = await axiosWithUser.get<Interview>(
    `/interview/${interviewId}`
  );
  return data;
};
export const useInterview = () => {
  const router = useRouter();

  return useQuery(
    ['interview', router.query.interviewId],
    () => fetchInterview(router.query.interviewId),
    {
      enabled: !!router.query.interviewId,
      retry: false,
    }
  );
};

// 면접 추가
export const useCreateInterview = (
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError<any>,
    Interview,
    MutationFunction
  >
) => {
  return useMutation(
    (reqData) => axiosWithUser.post('/interview', reqData),
    options
  );
};
