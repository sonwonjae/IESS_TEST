import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '@layout';

import { QuestionGroupCard } from '@components/Card';

import { useInterview } from '@api/queries/interview';
import { useQuestions } from '@api/queries/questions';

const Note: NextPage = () => {
  const router = useRouter();
  const { data: interview, isLoading, isError } = useInterview();
  const { data } = useQuestions({
    enabled: !!router.query.interviewId && !!interview,
  });

  if (!data) {
    return <></>;
  }

  const { questions } = data;

  console.log({ questions });
  return (
    <>
      <Head>
        <title>IESS | {interview?.title}</title>
      </Head>
      <Layout>
        <h2>INTERVIEW NOTE</h2>
        <div>
          {questions?.map((questionGroup) => {
            const [groupName] = questionGroup;
            return (
              <QuestionGroupCard
                key={groupName}
                questionGroup={questionGroup}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default Note;
