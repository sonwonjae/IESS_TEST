import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQuery,
} from 'react-query';
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  getRedirectResult,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@firebase';

interface ResData {
  message: string;
}

const provider = new GoogleAuthProvider();

// 로그인 정보 확인
const confirmLogin = async () => {
  try {
    const User = await getRedirectResult(auth);

    if (!!User) {
      document.cookie = `uid=${User.user.uid}`;
    }
    return !!User;
  } catch (error) {}
};
export const useConfirmLogin = () => {
  return useQuery('confirmLogin', confirmLogin);
};

// 로그인
const login = async () => {
  try {
    await signInWithRedirect(auth, provider);
    return { message: '로그인 성공' };
  } catch (error) {
    return { message: '로그인 실패' };
  }
};
export const useLogin = (
  options?: UseMutationOptions<ResData, FirebaseError, void, MutationFunction>
) => {
  return useMutation(login, options);
};

// 로그아웃
const logout = async () => {
  try {
    await signOut(auth);
    return { message: '로그아웃 성공' };
  } catch (error) {
    return { message: '로그아웃 실패' };
  }
};
export const useLogout = (
  options?: UseMutationOptions<ResData, FirebaseError, void, MutationFunction>
) => {
  return useMutation(logout, options);
};
