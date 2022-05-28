import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResQuestions>
) {
  const {
    method,
    cookies,
    headers,
    query: { interviewId },
  } = req;
  const uid = (cookies.uid || headers.uid) as string;

  const questionsCollectionId = 'questions';
  const questionsRef = collection(db, questionsCollectionId);
  const questionsQuery = query(
    questionsRef,
    where('uid', '==', uid),
    where('interviewId', '==', interviewId)
  );
  const questionsOrderCollectionId = 'questions_order';
  const questionsOrderRef = doc(
    db,
    questionsOrderCollectionId,
    interviewId as string
  );

  switch (method) {
    case 'GET':
      const questions: ResQuestionsData = [];
      const groupOrderMap: GroupOrderMap = {};
      const ordersMap: OrdersMap = {};
      const questionsOrderMap: QuestionsOrderMap = {};

      // questions_order
      const questionsOrderSnap = await getDoc(questionsOrderRef);
      const { groupOrder, orders } =
        questionsOrderSnap.data() as QuestionsOrder;

      for (const [groupName, order] of Object.entries(orders)) {
        order.forEach((questionId, idx) => {
          questionsOrderMap[groupName] = questionsOrderMap[groupName] || {};
          questionsOrderMap[groupName][questionId] = idx;
        });
      }
      groupOrder.forEach((groupName, idx) => {
        groupOrderMap[groupName] = idx;
        ordersMap[groupName] = [];
      });

      // questions
      const questionsQuerySnpshot = await getDocs(questionsQuery);
      questionsQuerySnpshot.forEach((doc) => {
        const question: Question = {
          ...(doc.data() as Question),
          questionId: doc.id,
        };
        const questionOrderIdx = questionsOrderMap[question.group][doc.id];

        ordersMap[question.group][questionOrderIdx] = question;
      });

      for (const [groupName, questionsInMap] of Object.entries(ordersMap)) {
        const groupOrderIdx = groupOrderMap[groupName];
        questions[groupOrderIdx] = [groupName, questionsInMap];
      }

      res.status(200).json({
        groupOrder,
        orders,
        questions,
      });
      break;
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
