const [repoOwner = '', repoName = ''] = (
  process.env.GITHUB_REPOSITORY ?? ''
).split('/')

const isGitHubActionsBuild = process.env.GITHUB_ACTIONS === 'true'
const isUserOrOrgSite = repoName === `${repoOwner}.github.io`
const basePath =
  isGitHubActionsBuild && repoName && !isUserOrOrgSite ? `/${repoName}` : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
