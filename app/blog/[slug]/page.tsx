import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MDXContent } from '@/components/blog/mdx-content'
import { RelatedPosts } from '@/components/blog/related-posts'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/posts'
import { withBasePath } from '@/lib/utils'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.frontmatter.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.frontmatter.title} | Blog`,
    description: post.frontmatter.summary,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const relatedPosts = getRelatedPosts(post, allPosts)

  const { frontmatter, content, readingTime } = post
  const { title, date, tags, thumbnail, summary } = frontmatter

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">{summary}</p>

          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={date}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime}</span>
            </div>
          </div>
        </header>

        <div className="relative mb-10 aspect-video overflow-hidden rounded-xl">
          <Image
            src={withBasePath(thumbnail)}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <MDXContent content={content} />

        <RelatedPosts posts={relatedPosts} />
      </article>
    </main>
  )
}
