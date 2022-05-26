import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useSetRecoilState } from 'recoil';
import { showBasicModalState } from '@store/modal';

import Layout from '@layout';
import { BasicModal } from '@layout/Modal';

import { QuestionForm } from '@components';
import { useState } from 'react';

const Note: NextPage = () => {
  const router = useRouter();
  const setShowBasicModal = useSetRecoilState(showBasicModalState);
  const [initQuestionFormData, setInitQuestionFormData] = useState<
    Question | undefined
  >();

  const openModal = () => {
    setShowBasicModal(true);
  };

  return (
    <>
      <Head>
        <title>IESS | {router.query.interviewId}</title>
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
