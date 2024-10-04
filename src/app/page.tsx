import {
  getDatabase,
  NotionPage,
  getPageTitle,
  getPageCategories,
  getPageFeaturedImage,
} from "@/lib/notion";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AboutMe from "@/components/AboutMe";

export default async function Home() {
  const posts = await getDatabase();

  return (
    <main className="min-h-screen ">
      <AboutMe />
      <h2 className="text-3xl font-semibold my-8">My recent stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: NotionPage) => {
          const featuredImage = getPageFeaturedImage(post);
          return (
            <Link
              href={`/post/${post.id}`}
              key={post.id}
              className="transition-transform hover:scale-105 block h-full"
            >
              <Card className="h-[400px] w-full bg-card hover:bg-accent overflow-hidden relative">
                {featuredImage && (
                  <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${featuredImage})` }}
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10 h-full flex flex-col bg-black bg-opacity-50 text-white p-6">
                  <CardHeader className="flex-grow">
                    <CardTitle className="text-2xl font-bold mb-4 line-clamp-3">
                      {getPageTitle(post)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow"></CardContent>
                  <CardFooter className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {getPageCategories(post).map((category, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="bg-opacity-70 backdrop-blur-sm"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
