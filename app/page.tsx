'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/blog')
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <p className="text-center text-sm text-muted-foreground">
        Redirecting to the blog...
        {' '}
        <Link href="/blog" className="font-medium text-foreground underline">
          Open it manually
        </Link>
      </p>
    </main>
  )
}
