import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import Layout from '@layout';

import { QuestionGroupCard } from '@components/Card';

import { fetchInterview, useInterview } from '@api/queries/interview';
import { fetchQuestions, useQuestions } from '@api/queries/questions';
import { dehydrate, QueryClient } from 'react-query';

const Note: NextPage = () => {
  const { data: interview, isLoading, isError } = useInterview();
  const { data } = useQuestions();

  const questions = data ? data.questions : [];

  return (
    <>
      <Head>
        <title>IESS | {interview?.title}</title>
      </Head>
      <Layout>
        <h2>INTERVIEW NOTE</h2>
        <div>
          {questions.map((questionGroup) => {
            const [groupName] = questionGroup;
            return (
              <QuestionGroupCard
                key={groupName}
                reqQuestionFormData={data}
                questionGroup={questionGroup}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { interviewId } = context.query;
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery(['interview', interviewId], () =>
      fetchInterview(interviewId, {
        headers: { uid: context.req.cookies.uid },
      })
    );
    await queryClient.prefetchQuery(['questions', interviewId], () =>
      fetchQuestions(interviewId, {
        headers: { uid: context.req.cookies.uid },
      })
    );
  } catch (error) {}
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
  return { props: {} };
};

export default Note;
