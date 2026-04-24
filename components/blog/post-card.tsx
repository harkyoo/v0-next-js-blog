import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Post } from '@/lib/types'
import { withBasePath } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { frontmatter, readingTime } = post
  const { title, slug, summary, date, tags, thumbnail } = frontmatter

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={withBasePath(thumbnail)}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="line-clamp-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-muted-foreground">{summary}</p>
        </CardContent>
        <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
