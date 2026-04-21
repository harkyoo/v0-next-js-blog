import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Post, PostFrontmatter } from './types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory).filter((file) => /\.mdx?$/.test(file))
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const mdxPath = path.join(postsDirectory, `${realSlug}.mdx`)
  const mdPath = path.join(postsDirectory, `${realSlug}.md`)

  let fullPath = ''
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  return {
    frontmatter: {
      ...data,
      slug: realSlug,
    } as PostFrontmatter,
    content,
    readingTime: stats.text,
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.mdx?$/, '')))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())

  return posts
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagsSet = new Set<string>()
  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet).sort()
}

export function getRelatedPosts(currentPost: Post, allPosts: Post[]): Post[] {
  const { relatedPosts, tags, slug } = currentPost.frontmatter

  // First, try to get explicitly defined related posts
  if (relatedPosts && relatedPosts.length > 0) {
    const explicit = relatedPosts
      .map((relatedSlug) => allPosts.find((p) => p.frontmatter.slug === relatedSlug))
      .filter((p): p is Post => p !== undefined)

    if (explicit.length > 0) {
      return explicit.slice(0, 3)
    }
  }

  // Fallback: find posts with shared tags
  const otherPosts = allPosts.filter((p) => p.frontmatter.slug !== slug)

  const postsWithSharedTags = otherPosts
    .map((post) => {
      const sharedTags = post.frontmatter.tags.filter((tag) => tags.includes(tag))
      return { post, sharedCount: sharedTags.length }
    })
    .filter(({ sharedCount }) => sharedCount > 0)
    .sort((a, b) => b.sharedCount - a.sharedCount)
    .map(({ post }) => post)

  return postsWithSharedTags.slice(0, 3)
}
