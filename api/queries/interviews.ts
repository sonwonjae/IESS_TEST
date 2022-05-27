import { useQuery } from 'react-query';
import { axiosWithUser } from '@api';

// 면접 리스트 GET
const fetchInterviews = async () => {
  const { data } = await axiosWithUser.get<Interviews>('/interviews');
  return data;
};
export const useInterviews = () => {
  return useQuery(['interviews'], fetchInterviews);
};
