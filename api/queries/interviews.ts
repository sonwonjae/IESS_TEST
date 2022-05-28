import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { axiosWithUser } from '@api';
import { AxiosRequestConfig, AxiosError } from 'axios';

// 면접 리스트 GET
export const fetchInterviews = async (option?: AxiosRequestConfig<any>) => {
  const { data } = await axiosWithUser.get<Interviews>('/interviews', option);
  return data;
};
export const useInterviews = () => {
  const router = useRouter();
  return useQuery<Interviews, AxiosError, Interviews, string[]>(
    ['interviews'],
    fetchInterviews,
    {
      retry: false,
      onError: (error) => {
        if (error?.response?.status === 403) {
          router.push('/login');
        }
      },
    }
  );
};
