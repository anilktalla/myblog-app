import { getPage, , getPageTitle, getPageContent,getPageTags, getPageCategories, getPageFeaturedImage } from '@/lib/notion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPage(params.id);
  const featuredImage = getPageFeaturedImage(post);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="mb-8 inline-block">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Home
          </Button>
        </Link>

        <article className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden">
          {featuredImage && (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={featuredImage}
                alt={getPageTitle(post)}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {getPageTitle(post)}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {getPageTags(post).map((tag, index) => (
                <Badge key={index} variant="outline">{tag}</Badge>
              ))}
            </div>

            <div className="prose prose-lg max-w-none mb-8 dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {getPageContent(post)}
              </ReactMarkdown>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {getPageCategories(post).map((category, index) => (
                <Badge key={index} variant="default">{category}</Badge>
              ))}
            </div>

            <div className="text-sm text-muted-foreground border-t pt-4">
              <p>Posted on: {new Date(post.created_time).toDateString()}</p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}