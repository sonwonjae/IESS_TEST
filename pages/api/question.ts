// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface ResQuestion {
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResQuestion>
) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      console.log({ body });
      res.status(200).json({ message: '성공' });
      break;
    case 'PUT':
      res.status(200).json({ message: '성공' });
      break;
    case 'DELETE':
      res.status(200).json({ message: '성공' });
      break;
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
