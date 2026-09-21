"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Asterisk,
  Check,
  ChevronDown,
  Code2,
  Download,
  GraduationCap,
  MapPin,
  Menu,
  Moon,
  Plus,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { content, ui } from "./content";
import { GitHubActivity } from "./github-activity";
import { SocialLinks } from "./social-links";
import { assetPath } from "./site";

type Language = "en" | "it";
type Theme = "light" | "dark";
type SiteCopy = (typeof content)[Language];
type SkillGroupId = (typeof content.en.skills.groups)[number]["id"];
const email = "ghassen.jemaii2@gmail.com";
const phone = "+39 352 059 9620";
const cvPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/my-cv.pdf`;

type InterfaceCopy = (typeof ui)[Language];

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

function HeroArtwork({ caption }: { caption: string }) {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="art-orbit" />
      <span className="art-cross art-cross-one">+</span>
      <span className="art-cross art-cross-two">+</span>
      <svg className="building-blocks" viewBox="0 0 480 430" fill="none">
        <ellipse
          cx="247"
          cy="373"
          rx="155"
          ry="26"
          fill="currentColor"
          opacity=".035"
        />
        <g className="block-bottom">
          <path
            d="M94 278 249 195 404 278 249 366Z"
            fill="#DDFC87"
            stroke="#202620"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M94 278 249 366V394L94 307Z"
            fill="#B9D868"
            stroke="#202620"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M249 366 404 278V307L249 394Z"
            fill="#C8E977"
            stroke="#202620"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="m122 278 126-68 126 68-126 71Z"
            stroke="#8DAD4C"
            strokeDasharray="4 5"
          />
        </g>
        <g className="block-middle">
          <path
            d="M112 187 249 113 386 187 249 263Z"
            fill="#D8CEFD"
            stroke="#292238"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M112 187 249 263V302L112 227Z"
            fill="#AFA0E5"
            stroke="#292238"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M249 263 386 187V227L249 302Z"
            fill="#C1B3F1"
            stroke="#292238"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="m183 192 39-21m13 50 79-43m-116 24 39-21"
            stroke="#8171B2"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="135" cy="213" r="3" fill="#F4F0FF" />
          <circle cx="148" cy="220" r="3" fill="#F4F0FF" />
          <circle cx="161" cy="227" r="3" fill="#F4F0FF" />
        </g>
        <g className="block-top">
          <path
            d="M135 100 249 39 363 100 249 164Z"
            fill="#597AFA"
            stroke="#1C328A"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M135 100 249 164V214L135 151Z"
            fill="#3155DC"
            stroke="#1C328A"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M249 164 363 100V151L249 214Z"
            fill="#4266ED"
            stroke="#1C328A"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="m224 82-29 16 29 16m49-32 29 16-29 16m-17-40-17 49"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m270 177 20-11m10-5 10-6"
            stroke="#AABEFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
        <path
          d="M87 182H53V121H87M410 205h25v63h-25"
          stroke="currentColor"
          strokeOpacity=".2"
          strokeDasharray="4 5"
        />
        <circle cx="53" cy="121" r="4" fill="#4266ED" />
        <circle cx="435" cy="268" r="4" fill="#AFA0E5" />
      </svg>
      <div className="art-note art-note-code">
        <Code2 size={17} />
        <span>engineered with care</span>
      </div>
      <div className="art-note art-note-spark">
        <Sparkles size={18} />
      </div>
      <p className="art-caption">{caption}</p>
    </div>
  );
}

function ProjectArtwork({ name, copy }: { name: string; copy: InterfaceCopy }) {
  if (name === "ReGuardian") {
    return (
      <div className="project-art project-art-guardian" aria-hidden="true">
        <div className="guardian-ring" />
        <div className="document-preview">
          <div className="document-header">
            <ShieldCheck size={19} />
            <span>ReGuardian</span>
            <span className="document-dot" />
          </div>
          <p className="document-title">{copy.document}</p>
          <div className="document-line" />
          <div className="document-line short" />
          <div className="document-highlight">
            <span />
            <Check size={13} />
          </div>
          <div className="document-line" />
          <div className="document-line medium" />
          <div className="document-highlight lavender">
            <span />
            <Check size={13} />
          </div>
          <div className="document-footer">
            <ShieldCheck size={13} />
            {copy.documentStatus}
          </div>
        </div>
        <span className="guardian-seal">
          <ShieldCheck size={26} strokeWidth={1.5} />
        </span>
      </div>
    );
  }
  if (name === "ScopePilot") {
    return (
      <div className="project-art project-art-scope" aria-hidden="true">
        <div className="scope-orbit" />
        <div className="scope-orbit second" />
        <div className="scope-request">
          <span className="scope-icon">
            <Sparkles size={18} />
          </span>
          {copy.scope}
          <Plus size={15} />
        </div>
        <svg className="scope-connectors" viewBox="0 0 300 94">
          <path
            d="M150 0V37M70 93V55Q70 37 88 37H212Q230 37 230 55V93"
            fill="none"
            stroke="#9482BF"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle cx="150" cy="37" r="5" fill="#7760AF" />
        </svg>
        <div className="scope-results">
          <span>
            <Check size={15} />
            {copy.inScope}
          </span>
          <span>
            <ArrowUpRight size={15} />
            {copy.outScope}
          </span>
        </div>
        <span className="scope-wordmark">
          ScopePilot<span>↗</span>
        </span>
      </div>
    );
  }
  return (
    <div className="project-art project-art-kavoo" aria-hidden="true">
      <svg className="map-lines" viewBox="0 0 360 280" fill="none">
        <path
          d="M-25 70C60 160 91-29 208 22S277 163 393 88M-30 99C56 189 105 6 207 51S272 192 397 121M-36 130C56 220 107 42 208 83S279 226 403 154M-26 167C60 254 107 77 211 118S274 260 397 190M-23 202C62 285 109 111 215 152S285 294 403 227"
          stroke="#B4C8F4"
          strokeWidth="1.3"
        />
        <path
          d="M53-10 123 300M252-10 304 300M-10 84 372 222"
          stroke="#C6D6F8"
          strokeWidth="13"
        />
        <path
          d="M53-10 123 300M252-10 304 300M-10 84 372 222"
          stroke="#F3F6FF"
          strokeWidth="10"
        />
      </svg>
      <span className="map-dot map-dot-one">
        <span>✳</span>
      </span>
      <span className="map-dot map-dot-two">
        <span>☕</span>
      </span>
      <span className="map-pin">
        <MapPin size={29} strokeWidth={1.8} />
      </span>
      <div className="kavoo-label">
        <strong>
          kavoo<span>✳</span>
        </strong>
        <span>{copy.nearby}</span>
      </div>
    </div>
  );
}

function Projects({
  copy,
  labels,
}: {
  copy: SiteCopy["projects"];
  labels: InterfaceCopy;
}) {
  const projects = [copy.items[2], copy.items[0], copy.items[1]];
  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <SectionLabel number="01">{labels.selected}</SectionLabel>
      <div className="section-heading">
        <h2 id="projects-title">{labels.projectsTitle}</h2>
        <p>{labels.projectsIntro}</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <a
            className="project-card"
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} — ${labels.visit} (${labels.newTab})`}
          >
            <div className="project-art-wrap">
              <ProjectArtwork name={project.name} copy={labels} />
              <span className="project-index">0{index + 1}</span>
              <span className="project-art-arrow">
                <ArrowUpRight size={20} />
              </span>
            </div>
            <div className="project-meta">
              <span>{project.type}</span>
              <span
                className={`project-status ${project.status === "Concept" ? "concept" : ""}`}
              >
                <i />
                {project.status}
              </span>
            </div>
            <h3>
              {project.name}
              <ArrowUpRight size={23} aria-hidden="true" />
            </h3>
            <p className="project-description">{project.description}</p>
            <p className="project-stack">{project.stack}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function Skills({
  copy,
  labels,
}: {
  copy: SiteCopy["skills"];
  labels: InterfaceCopy;
}) {
  const [activeId, setActiveId] = useState<SkillGroupId>("systems");
  const active =
    copy.groups.find((group) => group.id === activeId) ?? copy.groups[0];
  const ActiveIcon = active.icon;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const last = copy.groups.length - 1;
    let nextIndex: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      nextIndex = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      nextIndex = index === 0 ? last : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = last;
    else return;
    event.preventDefault();
    setActiveId(copy.groups[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }
  return (
    <section
      id="skills"
      className="section toolkit-section"
      aria-labelledby="skills-title"
    >
      <SectionLabel number="04">{labels.toolkitLabel}</SectionLabel>
      <div className="section-heading">
        <h2 id="skills-title">{labels.toolkitTitle}</h2>
      </div>
      <div className="toolkit-layout">
        <div className="skill-tabs" role="tablist" aria-label={labels.toolkit}>
          {copy.groups.map((group, index) => {
            const Icon = group.icon;
            return (
              <button
                type="button"
                key={group.id}
                role="tab"
                id={`tab-${group.id}`}
                aria-controls={`panel-${group.id}`}
                aria-selected={activeId === group.id}
                tabIndex={activeId === group.id ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onClick={() => setActiveId(group.id)}
                className={
                  activeId === group.id ? "skill-tab active" : "skill-tab"
                }
              >
                <Icon size={20} aria-hidden="true" />
                <span>{labels.skillNames[group.id]}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            );
          })}
        </div>
        {copy.groups.map((group) => (
          <div
            key={group.id}
            id={`panel-${group.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${group.id}`}
            tabIndex={0}
            hidden={activeId !== group.id}
            className="skill-panel"
          >
            {activeId === group.id && (
              <>
                <span className={`skill-panel-icon icon-${active.id}`}>
                  <ActiveIcon size={29} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3>{labels.skillDescriptions[active.id]}</h3>
                <p>{active.proof}</p>
                <div className="skill-tags">
                  {active.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const copy = content[language];
  const labels = ui[language];
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  useEffect(() => {
    let savedLanguage: string | null = null;
    let savedTheme: string | null = null;
    try {
      savedLanguage = window.localStorage.getItem("language");
      savedTheme = window.localStorage.getItem("theme");
    } catch {
      /* Browser storage is optional. */
    }
    const nextLanguage =
      savedLanguage === "en" || savedLanguage === "it"
        ? savedLanguage
        : navigator.language.toLowerCase().startsWith("it")
          ? "it"
          : "en";
    const nextTheme =
      savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
    const timer = window.setTimeout(() => {
      setLanguage(nextLanguage);
      setTheme(nextTheme);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    try {
      window.localStorage.setItem("language", nextLanguage);
    } catch {
      /* Optional preference persistence. */
    }
  }
  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {
      /* Optional preference persistence. */
    }
  }
  const navLinks = [
    { href: "#projects", label: labels.work },
    { href: "#github", label: "GitHub" },
    { href: "#experience", label: labels.about },
    { href: "#skills", label: labels.toolkit },
    { href: assetPath("blog/"), label: "Blog" },
  ];

  return (
    <>
      <a className="skip-link" href="#main-content">
        {labels.skip}
      </a>
      <header className="site-header" id="top">
        <div className="header-inner container">
          <a
            className="wordmark"
            href="#top"
            aria-label="Ghassen Jemiai — home"
          >
            <span className="monogram">
              g<span>j</span>
              <i />
            </span>
            <span className="wordmark-name">
              Ghassen Jemiai<span>Software engineer</span>
            </span>
          </a>
          <nav
            className="desktop-nav"
            aria-label={
              language === "it" ? "Navigazione principale" : "Main navigation"
            }
          >
            {navLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <div
              className="language-control"
              role="group"
              aria-label={copy.actions.languageLabel}
            >
              {(["en", "it"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  lang={option}
                  aria-label={option === "en" ? "English" : "Italiano"}
                  aria-pressed={language === option}
                  onClick={() => changeLanguage(option)}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="icon-button theme-button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? copy.actions.lightTheme
                  : copy.actions.darkTheme
              }
              title={
                theme === "dark"
                  ? copy.actions.lightTheme
                  : copy.actions.darkTheme
              }
            >
              <ThemeIcon size={17} aria-hidden="true" />
            </button>
            <a className="header-contact" href="#contact">
              {labels.contact}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button
              ref={menuButton}
              type="button"
              className="icon-button menu-button"
              aria-label={menuOpen ? labels.closeMenu : labels.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav container"
          aria-label={
            language === "it" ? "Navigazione mobile" : "Mobile navigation"
          }
          hidden={!menuOpen}
        >
          {[...navLinks, { href: "#contact", label: labels.contact }].map(
            (link) => (
              <a
                href={link.href}
                key={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ),
          )}
        </nav>
      </header>
      <main id="main-content" className="container" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span className="status-dot" />
              {labels.location}
            </p>
            <h1 id="hero-title">
              {labels.headline[0]}
              <br />
              <span>
                {labels.headline[1]}
                <svg
                  viewBox="0 0 570 16"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M3 11Q240-3 565 7" />
                </svg>
              </span>
            </h1>
            <p className="hero-intro">
              <strong>{labels.hello}</strong>
              <br />
              {labels.intro}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                {labels.explore}
                <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a
                className="button button-text"
                href={cvPath}
                download="Ghassen-Jemiai-CV.pdf"
              >
                {labels.resume}
                <Download size={16} aria-hidden="true" />
              </a>
            </div>
            <SocialLinks language={language} />
          </div>
          <HeroArtwork caption={labels.illustration} />
        </section>
        <aside className="now-strip" aria-label={copy.today.title}>
          <p>
            <span className="status-dot" />
            {labels.current}
          </p>
          <a
            href={copy.projects.items[2].href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="now-icon lime">
              <Code2 size={17} aria-hidden="true" />
            </span>
            {labels.building}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href="#education">
            <span className="now-icon lilac">
              <GraduationCap size={19} aria-hidden="true" />
            </span>
            {labels.studying}
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </aside>
        <Projects copy={copy.projects} labels={labels} />
        <GitHubActivity language={language} />
        <section
          id="experience"
          className="section experience-section"
          aria-labelledby="experience-title"
        >
          <div className="experience-intro">
            <SectionLabel number="03">{labels.experienceLabel}</SectionLabel>
            <h2 id="experience-title">{labels.experienceTitle}</h2>
            <p>{labels.experienceIntro}</p>
            <a
              className="text-link"
              href={cvPath}
              download="Ghassen-Jemiai-CV.pdf"
            >
              {labels.resume}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <Asterisk
              className="experience-asterisk"
              strokeWidth={1.1}
              aria-hidden="true"
            />
          </div>
          <div className="experience-list">
            {copy.experience.items.map((item, index) => (
              <article key={item.company} className="experience-item">
                <div
                  className={`company-mark company-${index}`}
                  aria-hidden="true"
                >
                  {index === 0 ? "cg" : index === 1 ? "f." : "ot"}
                </div>
                <div className="experience-body">
                  <p className="experience-period">{item.period}</p>
                  <h3>{item.company}</h3>
                  <p className="experience-role">{item.role}</p>
                  <p className="experience-summary">{item.summary}</p>
                  <details className="role-details">
                    <summary>
                      {labels.roleDetails}
                      <ChevronDown size={14} aria-hidden="true" />
                    </summary>
                    <div>
                      <p>
                        <MapPin size={13} aria-hidden="true" />
                        {item.place}
                      </p>
                      <p>{item.stack}</p>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>
        <Skills copy={copy.skills} labels={labels} />
        <section
          id="education"
          className="section education-section"
          aria-labelledby="education-title"
        >
          <SectionLabel number="05">{labels.educationLabel}</SectionLabel>
          <div className="section-heading">
            <h2 id="education-title">{labels.educationTitle}</h2>
            <GraduationCap size={31} strokeWidth={1.3} aria-hidden="true" />
          </div>
          <div className="education-grid">
            {copy.education.items.map((item, index) => (
              <article key={item.school} className="education-item">
                <p className="education-period">
                  <span className={`education-dot dot-${index}`} />
                  {item.period}
                </p>
                <h3>{item.school}</h3>
                <p>{item.credential}</p>
                <p className="education-note">{item.note}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="contact-copy">
            <p className="section-label">
              <span className="status-dot" />
              {labels.contactLabel}
            </p>
            <h2 id="contact-title">
              {labels.contactTitle[0]}
              <br />
              {labels.contactTitle[1]}
            </h2>
            <p>{labels.contactIntro}</p>
            <a className="contact-email" href={`mailto:${email}`}>
              {email}
              <ArrowUpRight size={25} aria-hidden="true" />
            </a>
          </div>
          <a
            className="contact-arrow"
            href={`mailto:${email}`}
            aria-label={`${labels.contact} — ${email}`}
          >
            <ArrowUpRight strokeWidth={1} aria-hidden="true" />
          </a>
          <div className="contact-bottom">
            <span>
              <MapPin size={15} aria-hidden="true" />
              {copy.contact.location}
            </span>
            <a href="tel:+393520599620">{phone}</a>
            <SocialLinks language={language} />
          </div>
          <Asterisk
            className="contact-asterisk"
            strokeWidth={1}
            aria-hidden="true"
          />
        </section>
      </main>
      <footer className="site-footer container">
        <a href="#top" className="footer-name">
          Ghassen Jemiai<span>© 2026</span>
        </a>
        <p>{labels.footer}</p>
        <a href="#top" className="back-to-top">
          {labels.back}
          <ArrowUp size={15} aria-hidden="true" />
        </a>
      </footer>
    </>
  );
}
