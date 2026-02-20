import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  author: { name: string; image: any };
  categories: { title: string }[];
  body: any[];
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    author->{name, image},
    categories[]->{title},
    body
  }`;
  return client.fetch(query, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Noctra Studio`,
    description: post.title, // Could be improved if there was an excerpt field
    openGraph: {
      images: post.mainImage ? [urlFor(post.mainImage).url()] : [],
    },
  };
}

const components = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 mt-12">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-10">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 mt-8">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-base text-neutral-400 leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-emerald-500 pl-6 py-2 my-8 italic text-neutral-300 text-lg md:text-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-400">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-neutral-400">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-emerald-500 hover:text-emerald-400 hover:underline transition-all">
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <div className="relative aspect-video my-12 rounded-2xl overflow-hidden border border-white/10">
        <Image
          src={urlFor(value).url()}
          alt="Blog image"
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
      </div>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-8 relative overflow-hidden">
      {/* Background Noise */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat bg-[length:100px_100px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group text-sm font-medium">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Articles
        </Link>

        <article>
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              {post.categories?.map((cat) => (
                <span
                  key={cat.title}
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {cat.title}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-neutral-500 text-sm border-y border-white/5 py-6">
              <div className="flex items-center gap-3">
                {post.author?.image && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
                    <Image
                      src={urlFor(post.author.image).url()}
                      alt={post.author.name}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="font-medium text-neutral-400">
                  {post.author?.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-600" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </header>

          {/* Main Image */}
          {post.mainImage && (
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="max-w-3xl mx-auto prose prose-invert prose-neutral">
            <PortableText value={post.body} components={components} />
          </div>

          {/* Footer Metadata */}
          <footer className="mt-24 pt-12 border-t border-white/5 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-2xl text-sm font-bold border border-neutral-800 hover:border-neutral-700 transition-all">
              <ArrowLeft className="w-4 h-4" />
              More Articles
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}
