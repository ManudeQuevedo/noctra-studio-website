import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getWorkspace } from '@/lib/workspace';
import { PUBLIC_PROJECTS_TAG } from '@/lib/site/projects';

const ALLOWED_REVALIDATE_PREFIXES = [
  '/work',
  '/es/work',
  '/en/work',
  '/forge',
  '/es/forge',
  '/en/forge',
];

const ALLOWED_TAGS = new Set([PUBLIC_PROJECTS_TAG]);

function isSecretAuthorized(req: NextRequest) {
  const secret = process.env.PUBLIC_SITE_REVALIDATE_SECRET;
  const authorization = req.headers.get('authorization');

  if (!secret || !authorization?.startsWith('Bearer ')) {
    return false;
  }

  return authorization.slice('Bearer '.length) === secret;
}

export async function POST(req: NextRequest) {
  const secretAuthorized = isSecretAuthorized(req);

  if (!secretAuthorized) {
    const ctx = await getWorkspace();
    if (!ctx) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!['owner', 'admin'].includes(ctx.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  const body = await req.json().catch(() => null);
  const { searchParams } = new URL(req.url);
  const paths: string[] = Array.isArray(body?.paths)
    ? body.paths.filter((path: unknown): path is string => typeof path === 'string')
    : [searchParams.get('path') || '/'];
  const tags: string[] = Array.isArray(body?.tags)
    ? body.tags.filter((tag: unknown): tag is string => typeof tag === 'string')
    : [];

  const invalidPath = paths.find((path) => {
    if (typeof path !== 'string' || !path.startsWith('/')) {
      return true;
    }

    return !(
      path === '/' ||
      ALLOWED_REVALIDATE_PREFIXES.some((prefix) => path.startsWith(prefix))
    );
  });

  if (invalidPath) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const invalidTag = tags.find(
    (tag) => typeof tag !== 'string' || !ALLOWED_TAGS.has(tag),
  );

  if (invalidTag) {
    return NextResponse.json({ error: 'Invalid tag' }, { status: 400 });
  }

  paths.forEach((path) => revalidatePath(path));
  tags.forEach((tag) => revalidateTag(tag, 'max'));

  return NextResponse.json({ revalidated: true, paths, tags });
}
