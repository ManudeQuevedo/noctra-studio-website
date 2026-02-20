"use client";

import { useTranslations } from "next-intl";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  author: { name: string; image: any };
  categories: { title: string }[];
  description: string;
}

export default function BlogClient() {
  const t = useTranslations("BlogPage");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          author->{name, image},
          categories[]->{title},
          "description": coalesce(pt::text(body[0..1]), "")
        }`;
        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
    <main className="min-h-screen bg-black text-white px-6 py-32 relative overflow-hidden">
      {/* Background Accents - Noctra Glow */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Background Noise */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat bg-[length:100px_100px]" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 rounded-full px-4 py-1.5 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              {t("badge")}
            </span>
          </m.div>

          <div className="space-y-6 max-w-4xl">
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]">
              {t("title")}
            </m.h1>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </m.p>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="h-[450px] bg-neutral-900/40 rounded-3xl animate-pulse border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts.map((post, index) => (
              <m.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col h-full rounded-3xl bg-neutral-900/20 border border-white/5 hover:border-emerald-500/20 transition-all duration-500 overflow-hidden backdrop-blur-sm">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

                <Link
                  href={`/blog/${post.slug.current}`}
                  className="flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {post.mainImage && (
                      <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent opacity-60" />

                    {/* Category Overlay */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {post.categories?.slice(0, 1).map((cat) => (
                        <span
                          key={cat.title}
                          className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-xl">
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-8 flex flex-col flex-1 space-y-4">
                    <h2 className="text-2xl font-bold leading-tight group-hover:text-emerald-400 transition-colors duration-300 line-clamp-3 md:line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 flex-1 font-medium">
                      {post.description}
                    </p>

                    {/* Footer / Meta */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
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
                        <span className="text-xs font-bold text-neutral-300">
                          {post.author?.name}
                        </span>
                      </div>
                      <time className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                        {new Date(post.publishedAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </time>
                    </div>
                  </div>
                </Link>
              </m.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-white/5 rounded-3xl">
            <p className="text-neutral-500 font-mono text-sm tracking-widest uppercase">
              // NO_POSTS_FOUND_IN_DATA_STREAM
            </p>
          </div>
        )}
      </div>
    </main>
    </LazyMotion>
  );
}
