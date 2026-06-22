/** @type {import('next').NextConfig} */
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const isProjectPages = isGitHubPages && !repositoryName.endsWith('.github.io');
const basePath = isProjectPages ? `/${repositoryName}` : '';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
