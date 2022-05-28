import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import Layout from '@layout';
import { InterviewForm } from '@components/Form';
import { useInterviews, fetchInterviews } from '@api/queries/interviews';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { dehydrate, QueryClient } from 'react-query';

interface NotesProps {}

const Notes: NextPage<NotesProps> = () => {
  const router = useRouter();
  const { data: interviews, isLoading, isError } = useInterviews();

  if (isError) {
    return <>Error</>;
  }

  return (
    <>
      <Head>
        <title>IESS | note list</title>
      </Head>
      <Layout>
        <h2>NOTES</h2>
        <ul>
          {interviews?.map((interview) => {
            const { interviewId, title, groups } = interview;
            return (
              <li key={interviewId}>
                <Link href={`${router.pathname}/${interviewId}`}>
                  <a>{title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
        <InterviewForm />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery(['interviews'], () =>
      fetchInterviews({
        headers: { uid: context.req.cookies.uid },
      })
    );
  } catch (error) {}
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Notes;
