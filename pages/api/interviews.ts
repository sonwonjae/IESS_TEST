import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Interviews>
) {
  const { method, cookies, headers } = req;
  const uid = (cookies.uid || headers.uid) as string;

  const collectionId = 'interviews';
  const interviewsRef = collection(db, collectionId);
  const interviewsQuery = query(interviewsRef, where('uid', '==', uid));

  switch (method) {
    case 'GET':
      const resBody: Interviews = [];
      const interviewsQuerySnpshot = await getDocs(interviewsQuery);
      interviewsQuerySnpshot.forEach((doc) => {
        const data = {
          ...(doc.data() as Interview),
          interviewId: doc.id,
        };
        resBody.push(data);
      });
      res.status(200).json(resBody);
      break;
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
