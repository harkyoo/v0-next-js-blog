"use client"

import { useState, useMemo } from 'react'
import { PostCard } from './post-card'
import { SearchBar } from './search-bar'
import { TagFilter } from './tag-filter'
import type { Post } from '@/lib/types'

interface PostListProps {
  posts: Post[]
  tags: string[]
}

export function PostList({ posts, tags }: PostListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontmatter.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTag = selectedTag === null || post.frontmatter.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [posts, searchQuery, selectedTag])

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <TagFilter tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">No posts found matching your criteria.</p>
          <button
            className="mt-4 text-primary underline-offset-4 hover:underline"
            onClick={() => {
              setSearchQuery('')
              setSelectedTag(null)
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.frontmatter.slug} post={post} />
          ))}
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Showing {filteredPosts.length} of {posts.length} posts
      </p>
    </div>
  )
}
