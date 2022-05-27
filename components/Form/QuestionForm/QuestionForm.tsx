import Head from 'next/head';

import {
  FormEventHandler,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

import { useCreateQuestion } from '@api/queries/question';

import * as FormStyled from '../Form.style';

import { TextInput, ToggleInput, HintInput } from '@components/Form/FormItem';

import { makeSearchKeyword } from '@utils/question';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

interface QuestionFormProps {
  reqQuestionFormData: ResQuestions | undefined;
  initFormData?: Question;
  initGroup?: string;
  setShowBasicModal: (value: SetStateAction<boolean>) => void;
}

function QuestionForm({
  reqQuestionFormData,
  initFormData: init = {
    title: '',
    answer: '',
    hints: [],
    isPublic: true,
    withInterview: false,
    group: '',
  },
  initGroup = 'none',
  setShowBasicModal,
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
  const [group, setGroup] = useState(initGroup);

  // 유효성 관련 상태
  const isValid =
    title && (init.title !== title || init.answer !== answer || changedHints);
  const queryClient = useQueryClient();

  const createQuestionMutate = useCreateQuestion({
    onSuccess: (res) => {
      const queryKey = ['questions', router.query.interviewId];

      if (!reqQuestionFormData) return;
      const { questions, groupOrder, orders } = reqQuestionFormData;
      const newQuestions = questions.map(([groupName, qInNewQuestions]) => {
        if (groupName === group) {
          qInNewQuestions.push({
            title,
            answer,
            hints,
            isPublic,
            withInterview,
            group,
            searchKeyword: makeSearchKeyword(title),
            likedUsers: [],
            interviewId: router.query.interviewId as string,
            questionId: res.data.questionId,
          });
        }
        return [groupName, qInNewQuestions];
      });
      const newGroupOrder = new Set(groupOrder);
      newGroupOrder.add(group);

      if (orders[group]) {
        orders[group].push(res.data.questionId);
      } else {
        orders[group] = [res.data.questionId];
      }

      queryClient.setQueryData(queryKey, {
        questions: newQuestions,
        groupOrder: [...newGroupOrder],
        orders,
      });
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

    if (!reqQuestionFormData) return;
    createQuestionMutate.mutate({
      question: {
        title,
        answer,
        hints,
        isPublic,
        withInterview,
        group: group,
        searchKeyword: makeSearchKeyword(title),
        likedUsers: [],
        interviewId: router.query.interviewId as string,
      },
      groupOrder: reqQuestionFormData.groupOrder,
      orders: reqQuestionFormData.orders,
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
