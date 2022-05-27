import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.cookies.uid) {
    return NextResponse.next();
  } else {
    return new Response(JSON.stringify({}), { status: 403 });
  }
}
