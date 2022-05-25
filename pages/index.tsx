import { useCreateQuestion } from '@api/queries/question';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const createQuestionMutate = useCreateQuestion({
    onSuccess: (res) => {
      console.log({ res });
    },
  });

  return (
    <>
      <Head>
        <title>IESS</title>
      </Head>
      <>
        <h2>HOME</h2>
        <button
          onClick={() => {
            createQuestionMutate.mutate({
              question: '테스트용 질문 1',
              answer: '',
              hints: ['답변 힌트 1', '답변 힌트 2'],
              isPublic: true,
              withInterview: false,
              group: 'none',
              searchKeyword: ['테', '스', '트', '용', '질', '문', '1'],
              likedUsers: [],
            });
          }}
        >
          질문 추가
        </button>
      </>
    </>
  );
};

export default Home;
