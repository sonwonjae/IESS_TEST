import { useRouter } from 'next/router';
import { useQuery, UseQueryOptions } from 'react-query';
import { axiosWithUser } from '@api';
import { AxiosError, AxiosResponse } from 'axios';

// 면접 리스트 GET
const fetchQuestions = async (interviewId: string | string[] | undefined) => {
  const { data } = await axiosWithUser.get<Questions>(
    `/questions/${interviewId}`
  );
  return data;
};
export const useQuestions = (
  option?: UseQueryOptions<
    Questions,
    AxiosError<any>,
    Questions,
    ['questions', string | string[] | undefined]
  >
) => {
  const router = useRouter();

  return useQuery(
    ['questions', router.query.interviewId],
    () => fetchQuestions(router.query.interviewId),
    {
      retry: false,
      ...option,
    }
  );
};
