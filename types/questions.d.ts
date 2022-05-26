interface Question {
  question: string;
  answer: string;
  hints: string[];
  isPublic: boolean;
  withInterview: boolean;
  group: string;
  searchKeyword?: string[];
  likedUsers?: string[];
}

type Questions = {
  [questionId: string]: Question;
};
