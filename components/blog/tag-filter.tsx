"use client"

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface TagFilterProps {
  tags: string[]
  selectedTag: string | null
  onTagSelect: (tag: string | null) => void
}

export function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selectedTag === null ? 'default' : 'outline'}
        className={cn(
          'cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground',
          selectedTag === null && 'bg-primary text-primary-foreground'
        )}
        onClick={() => onTagSelect(null)}
      >
        All Posts
      </Badge>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTag === tag ? 'default' : 'outline'}
          className={cn(
            'cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground',
            selectedTag === tag && 'bg-primary text-primary-foreground'
          )}
          onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}
