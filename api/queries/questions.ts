import { useRouter } from 'next/router';
import { useQuery, UseQueryOptions } from 'react-query';
import { axiosWithUser } from '@api';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// 면접 리스트 GET
export const fetchQuestions = async (
  interviewId: string | string[] | undefined,
  option?: AxiosRequestConfig<any>
) => {
  const { data } = await axiosWithUser.get<ResQuestions>(
    `/questions/${interviewId}`,
    option
  );
  return data;
};
export const useQuestions = (
  option?: UseQueryOptions<
    ResQuestions,
    AxiosError,
    ResQuestions,
    ['questions', string | string[] | undefined]
  >
) => {
  const router = useRouter();

  return useQuery(
    ['questions', router.query.interviewId],
    () => fetchQuestions(router.query.interviewId),
    {
      enabled: !!router.query.interviewId,
      retry: false,
      onError: (error) => {
        if (error?.response?.status === 403) {
          router.push('/login');
        }
      },
      ...option,
    }
  );
};
