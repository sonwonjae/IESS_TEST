import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@firebase';
import { doc, setDoc } from 'firebase/firestore';

import { makeId } from '@utils/api';
interface ResQuestion {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResQuestion>
) {
  const {
    method,
    cookies,
    body,
    query: { interviewId },
  } = req;

  const collectionId = 'questions';
  const newQuestionId = makeId(collectionId, cookies.uid as string);

  switch (method) {
    case 'POST':
      await setDoc(doc(db, collectionId, newQuestionId), {
        ...body,
        uid: cookies.uid,
        interviewId: interviewId,
      });
      res.status(200).json({ message: 'question 추가 성공' });
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
