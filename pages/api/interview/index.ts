import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@firebase';
import { doc, setDoc } from 'firebase/firestore';

import { makeId } from '@utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Interviews>
) {
  const { method, body, cookies } = req;

  const collectionId = 'interviews';
  const newInterviewId = makeId(collectionId, cookies.uid);

  switch (method) {
    case 'POST':
      await setDoc(doc(db, collectionId, newInterviewId), {
        ...body,
        uid: cookies.uid,
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
