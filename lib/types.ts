export interface PostFrontmatter {
  title: string
  slug: string
  summary: string
  date: string
  tags: string[]
  thumbnail: string
  relatedPosts?: string[]
}

export interface Post {
  frontmatter: PostFrontmatter
  content: string
  readingTime: string
}
