import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FinalCTA from "@/components/home/FinalCTA";
import BlogDetailHero from "@/components/blogs/BlogDetailHero";
import BlogDetailContent from "@/components/blogs/BlogDetailContent";
import {
  getBlogBySlug,
  getAllBlogs,
  getLatestBlogs,
  getAllCategories,
  getRelatedBlogs,
} from "@/data/blogs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | A Plus Business Link",
      description: "The requested guide or article could not be found.",
    };
  }

  return {
    title: `${post.title} | A Plus Business Link`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const latestBlogs = getLatestBlogs(3, post.slug);
  const categories = getAllCategories();
  const relatedBlogs = getRelatedBlogs(post.categorySlug, post.slug, 3);

  return (
    <main className="min-h-screen bg-neutral-100/60 font-sans flex flex-col">
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section with Static BG Image, Breadcrumbs, Title & Author Meta */}
      <BlogDetailHero post={post} />

      {/* 2-Column Main Content & Sidebar */}
      <BlogDetailContent
        post={post}
        latestBlogs={latestBlogs}
        categories={categories}
        relatedBlogs={relatedBlogs}
      />

      {/* Final Call to Action */}
      <FinalCTA />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
