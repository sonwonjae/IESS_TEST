import Head from 'next/head';

import { FormEventHandler, PropsWithChildren, useState } from 'react';

import { useCreateQuestion } from '@api/queries/question';

import { useSetRecoilState } from 'recoil';
import { showBasicModalState } from '@store/modal';

import * as FormStyled from '../Form.style';

import { TextInput, ToggleInput, HintInput } from '@components/Form/FormItem';

import { makeSearchKeyword } from '@utils/question';
import { useRouter } from 'next/router';

interface QuestionFormProps {
  initFormData?: Question;
}

function QuestionForm({
  initFormData: init = {
    title: '',
    answer: '',
    hints: [],
    isPublic: true,
    withInterview: false,
    group: '',
  },
}: PropsWithChildren<QuestionFormProps>) {
  const router = useRouter();
  // 데이터 관련 상태
  const [title, setTitle] = useState(init.title);
  const [answer, setAnswer] = useState(init.answer);
  const [hint, setHint] = useState('');
  const [hints, setHints] = useState(init.hints);
  const [changedHints, setChangedHints] = useState(true);
  const [isPublic, setIsPublic] = useState(init.isPublic);
  const [withInterview, setWithInterview] = useState(init.withInterview);
  const [group, setGroup] = useState(init.group);
  const setShowBasicModal = useSetRecoilState(showBasicModalState);

  // 유효성 관련 상태
  const isValid =
    title && (init.title !== title || init.answer !== answer || changedHints);

  const createQuestionMutate = useCreateQuestion({
    onSuccess: (res) => {
      console.log({ res });
    },
  });

  const checkChangedHints = (hints: string[]) => {
    const initHints = [...init.hints].sort();
    const newHints = [...hints].sort();
    const baseHints = initHints.length > newHints.length ? initHints : newHints;

    setChangedHints(
      !baseHints.every((_, idx) => initHints[idx] === newHints[idx])
    );
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    createQuestionMutate.mutate({
      title,
      answer,
      hints,
      isPublic,
      withInterview,
      group: group || 'none',
      searchKeyword: makeSearchKeyword(title),
      likedUsers: [],
      interviewId: router.query.interviewId as string,
    });
    setShowBasicModal(false);
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      <FormStyled.Form onSubmit={onSubmit}>
        <TextInput
          id="title"
          value={title}
          setValue={setTitle}
          required
          placeholder={'질문을 입력해주세요.'}
        >
          질문
        </TextInput>

        <ToggleInput id="isPublic" value={isPublic} setValue={setIsPublic}>
          사람들과 공유
        </ToggleInput>

        <ToggleInput
          id="withInterview"
          value={withInterview}
          setValue={setWithInterview}
        >
          모의 면접 리스트에 추가
        </ToggleInput>

        <HintInput
          hint={hint}
          setHint={setHint}
          hints={hints}
          setHints={setHints}
          checkChangedHints={checkChangedHints}
        >
          힌트 키워드
        </HintInput>

        <TextInput
          id="answer"
          type="textarea"
          value={answer}
          setValue={setAnswer}
          placeholder={'답변을 입력해주세요.'}
        >
          답변
        </TextInput>

        <FormStyled.SubmitButton type="submit" disabled={!isValid}>
          {!!init ? '질문 추가' : '질문 업데이트'}
        </FormStyled.SubmitButton>
      </FormStyled.Form>
    </>
  );
}

export default QuestionForm;
