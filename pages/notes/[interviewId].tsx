import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useSetRecoilState } from 'recoil';
import { showBasicModalState } from '@store/modal';

import Layout from '@layout';
import { BasicModal } from '@layout/Modal';

import { QuestionForm } from '@components/Form';
import { useState } from 'react';
import { useInterview } from '@api/queries/interview';
import { useQuestions } from '@api/queries/questions';

const Note: NextPage = () => {
  const router = useRouter();
  const setShowBasicModal = useSetRecoilState(showBasicModalState);
  const [initQuestionFormData, setInitQuestionFormData] = useState<
    Question | undefined
  >();
  const { data: interview, isLoading, isError } = useInterview();
  const { data: questions } = useQuestions({
    enabled: !!router.query.interviewId && !!interview,
  });
  console.log({ questions });

  const openModal = () => {
    setShowBasicModal(true);
  };

  return (
    <>
      <Head>
        <title>IESS | {interview?.title}</title>
      </Head>
      <Layout>
        <h2>INTERVIEW NOTE</h2>
        <button onClick={openModal}>질문 추가하기</button>
      </Layout>
      <BasicModal>
        <QuestionForm initFormData={initQuestionFormData} />
      </BasicModal>
    </>
  );
};

export default Note;
