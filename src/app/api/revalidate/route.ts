import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getWorkspace } from '@/lib/workspace';

const ALLOWED_REVALIDATE_PREFIXES = [
  '/work',
  '/es/work',
  '/en/work',
  '/forge',
  '/es/forge',
  '/en/forge',
];

export async function POST(req: NextRequest) {
  const ctx = await getWorkspace();
  if (!ctx) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!['owner', 'admin'].includes(ctx.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path') || '/';

  const isAllowedPath =
    path === '/' ||
    ALLOWED_REVALIDATE_PREFIXES.some((prefix) => path.startsWith(prefix));

  if (!isAllowedPath || !path.startsWith('/')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  revalidatePath(path);
  return NextResponse.json({ revalidated: true, path });
}
