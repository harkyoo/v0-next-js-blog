import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>DevBlog</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/blog"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              All Posts
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t bg-muted/50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Built with Next.js, MDX, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
