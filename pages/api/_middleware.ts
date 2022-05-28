import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const manualUid = req.headers.get('uid');

  if (manualUid) {
    req.cookies.uid = manualUid;
  }
  if (manualUid || req.cookies.uid) {
    return NextResponse.next();
  } else {
    return new Response(JSON.stringify({}), { status: 403 });
  }
}
