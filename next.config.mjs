/** @type {import('next').NextConfig} */
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const isProjectPages = isGitHubPages && !repositoryName.endsWith(".github.io");
const basePath = isProjectPages ? `/${repositoryName}` : "";

const nextConfig = {
  output: "export",
  // Keep fixture exports separate from the deployable site in out/.
  distDir: process.env.BLOG_BUILD_CHECK === "true" ? ".blog-test-output" : ".next",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
