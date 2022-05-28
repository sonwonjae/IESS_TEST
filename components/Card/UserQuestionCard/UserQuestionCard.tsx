import { PropsWithChildren } from 'react';

interface UserQuestionCardProps {
  question: Question;
}

function UserQuestionCard({
  question: {
    questionId,
    group,
    title,
    answer,
    hints,
    isPublic,
    withInterview,
  },
}: PropsWithChildren<UserQuestionCardProps>) {
  return <>Q. {title}</>;
}

export default UserQuestionCard;
