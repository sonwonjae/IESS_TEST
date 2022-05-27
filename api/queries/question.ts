import { useRouter } from 'next/router';
import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithUser } from '@api';

// 질문 추가
export const useCreateQuestion = (
  options?: UseMutationOptions<
    AxiosResponse<{ message: string; questionId: string }>,
    AxiosError<any>,
    ReqQuestion,
    MutationFunction
  >
) => {
  const router = useRouter();

  return useMutation(
    (reqData) =>
      axiosWithUser.post(`/question/${router.query.interviewId}`, reqData),
    options
  );
};

// 질문 업데이트
export const useUpdateQuestion = (
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError<any>,
    Question,
    MutationFunction
  >
) => {
  return useMutation(
    (reqData) => axiosWithUser.put('/question', reqData),
    options
  );
};
