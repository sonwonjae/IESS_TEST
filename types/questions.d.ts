interface Question {
  title: string;
  answer: string;
  hints: string[];
  isPublic: boolean;
  withInterview: boolean;
  group: string;
  searchKeyword?: string[];
  likedUsers?: string[];
  interviewId?: string;
  questionId?: string;
}

type Questions = Question[];

interface GroupOrderMap {
  [groupName: string]: number;
}

interface OrdersMap {
  [groupName: string]: Questions;
}

interface QuestionsOrderMap {
  [groupName: string]: {
    [questionId: string]: number;
  };
}

interface QuestionsOrder {
  groupOrder: string[];
  orders: {
    [groupName: string]: string[];
  };
}

type ResQuestionsData = [string, Questions][];

interface ReqQuestion extends QuestionsOrder {
  question: Question;
}

interface ResQuestions extends QuestionsOrder {
  questions: ResQuestionsData;
}
