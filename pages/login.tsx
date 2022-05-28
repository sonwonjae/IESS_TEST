import { useConfirmLogin, useLogin, useLogout } from '@api/queries/user';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const loginMutate = useLogin();
  const logoutMutate = useLogout({
    onSuccess: (res) => {
      router.push('/');
    },
  });
  const { isLoading } = useConfirmLogin();
  const handleLogin = () => {
    loginMutate.mutate();
  };
  const handleLogout = () => {
    logoutMutate.mutate();
  };

  if (isLoading) {
    return <h1>로그인 정보 확인중...</h1>;
  }

  return (
    <>
      <Head>
        <title>IESS | LOGIN</title>
      </Head>
      {isLoading ? (
        <h1>로그인 정보 확인중...</h1>
      ) : (
        <>
          <h2>LOGIN</h2>
          <button onClick={handleLogin}>구글 로그인</button>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      )}
    </>
  );
};

export default Home;
