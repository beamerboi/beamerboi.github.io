import { ArrowUpRight, Github } from "lucide-react";
import { githubUrl } from "./github-data";

export function SocialLinks({ language }: { language: "en" | "it" }) {
  const newTab =
    language === "it" ? "si apre in una nuova scheda" : "opens in a new tab";
  return (
    <div className="social-links">
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`GitHub @beamerboi (${newTab})`}
      >
        <Github size={16} aria-hidden="true" />
        <span>GitHub</span>
        <ArrowUpRight size={13} aria-hidden="true" />
      </a>
      <a
        href="https://x.com/jemi3i"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`X @jemi3i (${newTab})`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.8-8.9L.8 2h6.5l5.6 7.4L18.9 2ZM17.8 20h1.7L6.3 3.9H4.5L17.8 20Z" />
        </svg>
        <span>
          X <span className="social-handle">@jemi3i</span>
        </span>
        <ArrowUpRight size={13} aria-hidden="true" />
      </a>
    </div>
  );
}
