import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@firebase';
import { doc, setDoc } from 'firebase/firestore';

import { v5 } from 'uuid';
interface ResQuestion {
  message: string;
}

const createQuestionId = (...strings: string[]) => {
  const newStrings = [...strings, new Date().toISOString()];
  const uuidName = newStrings.reduce((acc, string) => acc + string, '');
  return v5(uuidName, v5.URL);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResQuestion>
) {
  const { method, headers, body } = req;

  const collectionId = 'questions';
  const newQuesetionId = createQuestionId(collectionId, headers.uid as string);

  switch (method) {
    case 'POST':
      await setDoc(doc(db, collectionId, newQuesetionId), body);
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
