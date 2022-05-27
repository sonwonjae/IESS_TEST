import type { NextPage } from 'next';
import Head from 'next/head';

import Layout from '@layout';
import { InterviewForm } from '@components/Form';
import { useInterviews } from '@api/queries/interviews';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Notes: NextPage = () => {
  const router = useRouter();

  const { data: interviews, isLoading } = useInterviews();
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

export default Notes;
