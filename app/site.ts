const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const deploymentUrl =
  process.env.SITE_URL?.trim() || `https://beamerboi.github.io${basePath}`;

export const site = {
  name: "Ghassen Jemiai",
  title: "Ghassen Jemiai | Software Engineer",
  description:
    "Ghassen Jemiai is a software engineer based in Italy, building SaaS products, web applications, AI systems, and automation. Explore his work and projects.",
  url: new URL(`${deploymentUrl.replace(/\/+$/, "")}/`),
  imageAlt:
    "Ghassen Jemiai — Software Engineer. Good ideas. Great software. Blue, lavender, and lime building blocks.",
  profiles: ["https://github.com/beamerboi", "https://x.com/jemi3i"],
};

export function assetPath(filename: string) {
  return `${basePath}/${filename}`;
}
