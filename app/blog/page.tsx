import { PostList } from '@/components/blog/post-list'
import { getAllPosts, getAllTags } from '@/lib/posts'

export const metadata = {
  title: 'Blog | Insights & Tutorials',
  description: 'Explore our latest articles on web development, design, and technology.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Harkyoo&apos;s Blog
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Thoughts, tutorials, and insights on modern web development
          </p>
        </header>

        <PostList posts={posts} tags={tags} />
      </div>
    </main>
  )
}
