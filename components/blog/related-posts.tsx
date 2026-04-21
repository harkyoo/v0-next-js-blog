import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Post } from '@/lib/types'

interface RelatedPostsProps {
  posts: Post[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 border-t pt-12">
      <h2 className="mb-8 text-2xl font-bold tracking-tight">Related Posts</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.frontmatter.slug}
            href={`/blog/${post.frontmatter.slug}`}
            className="group"
          >
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md hover:ring-1 hover:ring-primary/20">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.frontmatter.thumbnail}
                  alt={post.frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex flex-wrap gap-1">
                  {post.frontmatter.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="line-clamp-2 font-semibold transition-colors group-hover:text-primary">
                  {post.frontmatter.title}
                </h3>
                <p className="mt-2 flex items-center text-sm text-primary">
                  Read more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
