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
}

type Questions = Question[];
