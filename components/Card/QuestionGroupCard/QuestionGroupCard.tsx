import { PropsWithChildren, useState } from 'react';

import { BasicModal } from '@layout/Modal';

import { UserQuestionCard } from '@components/Card';
import { QuestionForm } from '@components/Form';

interface QuestionGroupCardProps {
  questionGroup?: [string, Questions];
}

function QuestionGroupCard({
  questionGroup,
}: PropsWithChildren<QuestionGroupCardProps>) {
  const [showBasicModal, setShowBasicModal] = useState(false);
  const [initQuestionFormData, setInitQuestionFormData] = useState<
    Question | undefined
  >();

  if (!questionGroup)
    return (
      <>
        <h3>none</h3>
        <ul></ul>
      </>
    );

  const [groupName, questions] = questionGroup;
  const openModal = () => {
    setShowBasicModal(true);
  };
  return (
    <>
      <h3>{groupName}</h3>
      <ul>
        {questions.map((question) => {
          return (
            <li key={question.questionId}>
              <UserQuestionCard question={question} />
            </li>
          );
        })}
      </ul>
      <button onClick={openModal}>질문 추가하기</button>
      <BasicModal
        showBasicModal={showBasicModal}
        setShowBasicModal={setShowBasicModal}
      >
        <QuestionForm
          initFormData={initQuestionFormData}
          initGroup={groupName}
          setShowBasicModal={setShowBasicModal}
        />
      </BasicModal>
    </>
  );
}

export default QuestionGroupCard;
