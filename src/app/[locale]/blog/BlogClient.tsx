"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
          "description": pt::text(body[0..1])
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
    <main className="min-h-screen bg-black text-white px-4 py-24 relative overflow-hidden">
      {/* Background Noise */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat bg-[length:100px_100px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto">
            {t("description")}
          </motion.p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[400px] bg-neutral-900/50 rounded-2xl animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-neutral-900/30 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="block h-full flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {post.mainImage && (
                      <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      {post.categories?.map((cat) => (
                        <span
                          key={cat.title}
                          className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-white/80">
                          {cat.title}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-neutral-400 text-sm line-clamp-3 mb-4 flex-1">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-neutral-500 mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        {post.author?.image && (
                          <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image
                              src={urlFor(post.author.image).url()}
                              alt={post.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span>{post.author?.name}</span>
                      </div>
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-500">
            No posts found yet. Check back soon!
          </div>
        )}
      </div>
    </main>
  );
}
