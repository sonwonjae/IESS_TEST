import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@firebase';
import { doc, setDoc } from 'firebase/firestore';

import { makeId } from '@utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Interviews>
) {
  const { method, body, headers,cookies } = req;
  const uid = (cookies.uid || headers.uid) as string;

  const questionsOrderCollectionId = 'questions_order';
  const collectionId = 'interviews';
  const newInterviewId = makeId(collectionId, uid);

  switch (method) {
    case 'POST':
      await setDoc(doc(db, questionsOrderCollectionId, newInterviewId), {
        groupOrder: ['none'],
        orders: {
          none: [],
        },
      });
      await setDoc(doc(db, collectionId, newInterviewId), {
        ...body,
        uid,
      });
      res.status(200);
      break;
    case 'PUT':
      res.status(200);
      break;
    case 'DELETE':
      res.status(200);
      break;
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
