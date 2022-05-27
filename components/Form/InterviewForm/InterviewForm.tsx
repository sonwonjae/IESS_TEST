import Head from 'next/head';

import {
  ChangeEventHandler,
  FormEventHandler,
  PropsWithChildren,
  useState,
} from 'react';

import { useCreateInterview } from '@api/queries/interview';

import * as InterviewFormStyled from './InterviewForm.style';

interface InterviewFormProps {}

function InterviewForm({}: PropsWithChildren<InterviewFormProps>) {
  // 데이터 관련 상태
  const [title, setTitle] = useState('');
  const createInterviewMutate = useCreateInterview({
    onSuccess: (res) => {
      console.log({ res });
    },
  });

  const changeInterview: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    createInterviewMutate.mutate({
      title,
      groups: ['none'],
    });
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      <InterviewFormStyled.InterviewForm onSubmit={onSubmit}>
        <input type="text" value={title} onChange={changeInterview} />
        <InterviewFormStyled.SubmitButton type="submit">
          저장
        </InterviewFormStyled.SubmitButton>
      </InterviewFormStyled.InterviewForm>
    </>
  );
}

export default InterviewForm;
