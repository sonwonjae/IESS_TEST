import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Questions>
) {
  const {
    method,
    cookies,
    query: { interviewId },
  } = req;

  const collectionId = 'questions';
  const questionsRef = collection(db, collectionId);
  const questionsQuery = query(
    questionsRef,
    where('uid', '==', cookies.uid),
    where('interviewId', '==', interviewId)
  );

  switch (method) {
    case 'GET':
      const resBody: Questions = [];
      const questionsQuerySnpshot = await getDocs(questionsQuery);
      questionsQuerySnpshot.forEach((doc) => {
        const data = doc.data() as Question;
        resBody.push(data);
      });
      console.log({ resBody });
      res.status(200).json(resBody);
      break;
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
