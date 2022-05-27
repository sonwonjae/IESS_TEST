import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@firebase';
import { doc, setDoc } from 'firebase/firestore';

import { makeId } from '@utils/api';
interface ResQuestion {
  message: string;
  questionId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResQuestion>
) {
  const {
    method,
    cookies,
    query: { interviewId },
  } = req;

  const body = req.body as ReqQuestion;

  const questionsCollectionId = 'questions';
  const questionsOrderCollectionId = 'questions_order';
  const newQuestionId = makeId(questionsCollectionId, cookies.uid);

  switch (method) {
    case 'POST':
      const newGroupOrder = new Set(body.groupOrder);
      newGroupOrder.add(body.question.group);
      if (body.orders[body.question.group]) {
        body.orders[body.question.group].push(newQuestionId);
      } else {
        body.orders[body.question.group] = [newQuestionId];
      }

      await setDoc(doc(db, questionsOrderCollectionId, interviewId as string), {
        groupOrder: [...newGroupOrder],
        orders: body.orders,
      });
      await setDoc(doc(db, questionsCollectionId, newQuestionId), {
        ...body.question,
        uid: cookies.uid,
        interviewId: interviewId,
      });
      res
        .status(200)
        .json({ message: 'question 추가 성공', questionId: newQuestionId });
      break;
    case 'PUT':
      res.status(200).json({ message: 'question 업데이트 성공' });
      break;
    case 'DELETE':
      res.status(200).json({ message: 'question 삭제 성공' });
      break;
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
