import { useRouter } from 'next/router';
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQuery,
} from 'react-query';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosWithUser } from '@api';

// 면접 GET
export const fetchInterview = async (
  interviewId: string | string[] | undefined,
  option?: AxiosRequestConfig<any>
) => {
  const { data } = await axiosWithUser.get<Interview>(
    `/interview/${interviewId}`,
    option
  );
  return data;
};
export const useInterview = () => {
  const router = useRouter();

  return useQuery<
    Interview,
    AxiosError,
    Interview,
    (string | string[] | undefined)[]
  >(
    ['interview', router.query.interviewId],
    () => fetchInterview(router.query.interviewId),
    {
      enabled: !!router.query.interviewId,
      retry: false,
      onError: (error) => {
        if (error?.response?.status === 403) {
          router.push('/login');
        }
      },
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
