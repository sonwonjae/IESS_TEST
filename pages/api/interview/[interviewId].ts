import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Interview>
) {
  const {
    method,
    headers,
    cookies,
    query: { interviewId },
  } = req;
  const uid = (cookies.uid || headers.uid) as string;

  const collectionId = 'interviews';
  const interviewRef = doc(db, collectionId, interviewId as string);

  switch (method) {
    case 'GET':
      const interviewSnap = await getDoc(interviewRef);
      const data = interviewSnap.data() as Interview;

      if (data) {
        res.status(200).json({
          ...data,
          interviewId: interviewSnap.id,
        });
      } else {
        res.status(404).end('Not Found');
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
