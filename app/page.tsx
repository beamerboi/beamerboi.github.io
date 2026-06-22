"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Moon,
  Phone,
  Server,
  Sparkles,
  Sun,
  type LucideIcon,
} from "lucide-react";

const email = "ghassen.jemaii2@gmail.com";
const phone = "+39 352 059 9620";

type Language = "en" | "it";
type Theme = "light" | "dark";

const languageOptions: { id: Language; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "it", label: "IT" },
];

const content = {
  en: {
    nav: {
      experience: "experience",
      projects: "projects",
      skills: "skills",
      contact: "contact",
    },
    actions: {
      email: "Email",
      cv: "CV",
      top: "Top",
      languageLabel: "Language",
      themeLabel: "Theme",
      lightTheme: "Light theme",
      darkTheme: "Dark theme",
    },
    hero: {
      eyebrow: "Software engineer based in Italy",
      title: "Ghassen Jemiai",
      description:
        "I build scalable SaaS platforms, payment integrations, automation systems, and AI-backed products. Most of my work sits where product speed, backend reliability, and maintainable systems meet.",
    },
    today: {
      eyebrow: "today",
      title: "What I'm focused on now",
      items: [
        {
          title: "master's degree in computer science",
          text: "Studying computer science at Universita di Firenze while building practical software products.",
        },
        {
          title: "building ReGuardian",
          text: "Building an AI-backed compliance automation product for UK employment contracts, with document analysis, clause mapping, suggested rewrites, and audit trails for HR and legal teams.",
        },
      ],
    },
    experience: {
      eyebrow: "past",
      title: "Experience shaped by product work",
      items: [
        {
          company: "Chicks Group Inc",
          role: "Product Development Engineer",
          period: "Sep 2023 - Mar 2026",
          place: "Toronto, Canada",
          summary:
            "Shipped SaaS features, payment flows, SEO templates, realtime chat improvements, and platform performance work.",
          stack: ".NET Core, SignalR, MySQL, AureliaJS",
          icon: Server,
        },
        {
          company: "Focus Corporation",
          role: "Software Engineer",
          period: "Jan 2023 - Aug 2025",
          place: "Tunis, Tunisia",
          summary:
            "Built enterprise application features, coordinated three developers, and designed AI architectures, agent systems, and RAG solutions.",
          stack: ".NET, Angular, TypeScript, SQL Server, Python, TensorFlow",
          icon: BriefcaseBusiness,
        },
        {
          company: "OneTech Business Solutions",
          role: "Software Engineering Intern",
          period: "Feb 2023 - May 2023",
          place: "Tunis, Tunisia",
          summary:
            "Built microservices for banking process digitization, integrated Backbase services, and deployed on Linux RHEL.",
          stack: "Spring Boot, Angular, PostgreSQL, Docker",
          icon: Code2,
        },
      ],
    },
    projects: {
      eyebrow: "projects",
      title: "Personal product experiments",
      items: [
        {
          name: "ScopePilot",
          type: "AI SaaS",
          status: "Building",
          description:
            "Analyzes client requests, detects scope drift, and generates change orders with cost estimates.",
          stack: "AI, SaaS, workflow automation",
          href: "https://scopepilot.io/",
        },
        {
          name: "Kavoo",
          type: "Geo-social",
          status: "Concept",
          description:
            "Location-based product for discovering nearby activities, places, and social plans.",
          stack: "Mobile product, maps, social discovery",
          href: "https://kavoo.io/",
        },
        {
          name: "ReGuardian",
          type: "Compliance SaaS",
          status: "Building",
          description:
            "AI-backed compliance automation for UK employment contracts. It analyzes document clauses, maps them to UK employment law and UK GDPR, flags impacted sections, and keeps an audit trail for HR/legal review.",
          stack: "AI, document analysis, compliance automation",
          href: "https://reguardian.northlinestudio.io/",
        },
      ],
    },
    skills: {
      eyebrow: "skills",
      title: "A stack organized by how I use it",
      intro:
        "Specialized in product engineering and AI systems across backend platforms, workflow automation, enterprise UI, and data-backed services.",
      groups: [
        {
          id: "systems",
          label: "systems",
          icon: Server,
          sentence:
            "Backend services, API architecture, microservices, event-driven architecture, Kafka, C#, Java, Spring Framework, Django, FastAPI, SignalR, and platform performance.",
          items: [
            ".NET Core",
            "C#",
            "Java",
            "Spring Framework",
            "Django",
            "FastAPI",
            "Microservices",
            "Kafka",
            "Event-driven",
          ],
          proof:
            "Used across SaaS platforms where reliability, integration quality, and speed matter.",
        },
        {
          id: "ai",
          label: "ai",
          icon: BrainCircuit,
          sentence:
            "Python, Django, RAG systems, agent workflows, TensorFlow, and applied automation.",
          items: ["Python", "Django", "RAG", "Agents"],
          proof:
            "Applied to enterprise AI architecture, product concepts, and automation-heavy workflows.",
        },
        {
          id: "frontend",
          label: "frontend",
          icon: Layers3,
          sentence:
            "Angular, AureliaJS, Next.js, TypeScript, Tailwind CSS, Bootstrap, and product workflow screens.",
          items: [
            "Angular",
            "AureliaJS",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Bootstrap",
          ],
          proof:
            "Used for practical interfaces tied to real business operations and product teams.",
        },
        {
          id: "data",
          label: "data",
          icon: Database,
          sentence:
            "SQL Server, MySQL, PostgreSQL, MongoDB, Docker, and deployment-aware service design.",
          items: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "Docker"],
          proof:
            "Supports the data layer behind SaaS, banking, and automation systems.",
        },
      ],
    },
    education: {
      eyebrow: "education",
      title: "Formal background, still product-minded",
      items: [
        {
          school: "Universita di Firenze",
          credential: "Master's Degree in Computer Science",
          period: "Sep 2025 - Present",
          note: "Computer science, software systems, and applied product engineering.",
        },
        {
          school: "SESAME",
          credential: "Degree in Engineering",
          period: "Sep 2023 - Jul 2025",
          note: "Engineering foundation with software development and system design.",
        },
        {
          school: "University of Tunis El Manar",
          credential: "Bachelor's Degree in Computer Science",
          period: "Sep 2020 - Jun 2023",
          note: "Computer science fundamentals, databases, algorithms, and software projects.",
        },
      ],
    },
    contact: {
      eyebrow: "contact",
      title: "Building AI-ready platforms, integrations, and automation systems.",
      location: "Based in Italy",
    },
  },
  it: {
    nav: {
      experience: "esperienza",
      projects: "progetti",
      skills: "competenze",
      contact: "contatto",
    },
    actions: {
      email: "Email",
      cv: "CV",
      top: "Su",
      languageLabel: "Lingua",
      themeLabel: "Tema",
      lightTheme: "Tema chiaro",
      darkTheme: "Tema scuro",
    },
    hero: {
      eyebrow: "Software engineer basato in Italia",
      title: "Ghassen Jemiai",
      description:
        "Costruisco piattaforme SaaS scalabili, integrazioni di pagamento, sistemi di automazione e prodotti basati su AI. Il mio lavoro unisce velocita di prodotto, affidabilita backend e sistemi mantenibili.",
    },
    today: {
      eyebrow: "oggi",
      title: "Su cosa sto lavorando ora",
      items: [
        {
          title: "laurea magistrale in informatica",
          text: "Studio informatica all'Universita di Firenze mentre costruisco prodotti software concreti.",
        },
        {
          title: "costruendo ReGuardian",
          text: "Sto costruendo un prodotto di compliance automation basato su AI per contratti di lavoro UK, con analisi documentale, mappatura delle clausole, riscritture suggerite e audit trail per team HR e legal.",
        },
      ],
    },
    experience: {
      eyebrow: "percorso",
      title: "Esperienza costruita sul lavoro di prodotto",
      items: [
        {
          company: "Chicks Group Inc",
          role: "Product Development Engineer",
          period: "Set 2023 - Mar 2026",
          place: "Toronto, Canada",
          summary:
            "Ho sviluppato funzionalita SaaS, flussi di pagamento, template SEO, miglioramenti alla chat realtime e lavoro sulle performance della piattaforma.",
          stack: ".NET Core, SignalR, MySQL, AureliaJS",
          icon: Server,
        },
        {
          company: "Focus Corporation",
          role: "Software Engineer",
          period: "Gen 2023 - Ago 2025",
          place: "Tunisi, Tunisia",
          summary:
            "Ho sviluppato funzionalita per applicazioni enterprise, coordinato tre sviluppatori e progettato architetture AI, sistemi agent-based e soluzioni RAG.",
          stack: ".NET, Angular, TypeScript, SQL Server, Python, TensorFlow",
          icon: BriefcaseBusiness,
        },
        {
          company: "OneTech Business Solutions",
          role: "Software Engineering Intern",
          period: "Feb 2023 - Mag 2023",
          place: "Tunisi, Tunisia",
          summary:
            "Ho costruito microservizi per la digitalizzazione di processi bancari, integrato servizi Backbase e distribuito su Linux RHEL.",
          stack: "Spring Boot, Angular, PostgreSQL, Docker",
          icon: Code2,
        },
      ],
    },
    projects: {
      eyebrow: "progetti",
      title: "Esperimenti di prodotto personali",
      items: [
        {
          name: "ScopePilot",
          type: "AI SaaS",
          status: "In sviluppo",
          description:
            "Analizza le richieste dei clienti, rileva attivita fuori scope e genera change order con stime di costo.",
          stack: "AI, SaaS, workflow automation",
          href: "https://scopepilot.io/",
        },
        {
          name: "Kavoo",
          type: "Geo-social",
          status: "Concept",
          description:
            "Prodotto location-based per scoprire attivita vicine, luoghi e piani sociali.",
          stack: "Mobile product, mappe, social discovery",
          href: "https://kavoo.io/",
        },
        {
          name: "ReGuardian",
          type: "Compliance SaaS",
          status: "In sviluppo",
          description:
            "Compliance automation basata su AI per contratti di lavoro UK. Analizza le clausole, le collega a UK employment law e UK GDPR, segnala le sezioni impattate e mantiene audit trail per la revisione HR/legal.",
          stack: "AI, analisi documentale, compliance automation",
          href: "https://reguardian.northlinestudio.io/",
        },
      ],
    },
    skills: {
      eyebrow: "competenze",
      title: "Stack organizzato per uso pratico",
      intro:
        "Specializzato in product engineering e sistemi AI su piattaforme backend, workflow automation, interfacce enterprise e servizi basati su dati.",
      groups: [
        {
          id: "systems",
          label: "sistemi",
          icon: Server,
          sentence:
            "Servizi backend, architettura API, microservizi, architetture event-driven, Kafka, C#, Java, Spring Framework, Django, FastAPI, SignalR e performance di piattaforma.",
          items: [
            ".NET Core",
            "C#",
            "Java",
            "Spring Framework",
            "Django",
            "FastAPI",
            "Microservices",
            "Kafka",
            "Event-driven",
          ],
          proof:
            "Usati in piattaforme SaaS dove contano affidabilita, qualita delle integrazioni e velocita.",
        },
        {
          id: "ai",
          label: "ai",
          icon: BrainCircuit,
          sentence:
            "Python, Django, sistemi RAG, workflow agent-based, TensorFlow e automazione applicata.",
          items: ["Python", "Django", "RAG", "Agents"],
          proof:
            "Applicati ad architetture AI enterprise, concept di prodotto e workflow ad alta automazione.",
        },
        {
          id: "frontend",
          label: "frontend",
          icon: Layers3,
          sentence:
            "Angular, AureliaJS, Next.js, TypeScript, Tailwind CSS, Bootstrap e schermate di workflow prodotto.",
          items: [
            "Angular",
            "AureliaJS",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Bootstrap",
          ],
          proof:
            "Usati per interfacce pratiche legate a operazioni aziendali e team di prodotto.",
        },
        {
          id: "data",
          label: "dati",
          icon: Database,
          sentence:
            "SQL Server, MySQL, PostgreSQL, MongoDB, Docker e service design orientato al deployment.",
          items: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "Docker"],
          proof:
            "Supporta il data layer dietro prodotti SaaS, banking e sistemi di automazione.",
        },
      ],
    },
    education: {
      eyebrow: "formazione",
      title: "Formazione solida, orientata al prodotto",
      items: [
        {
          school: "Universita di Firenze",
          credential: "Laurea Magistrale in Informatica",
          period: "Set 2025 - Presente",
          note: "Informatica, sistemi software e product engineering applicato.",
        },
        {
          school: "SESAME",
          credential: "Laurea in Ingegneria",
          period: "Set 2023 - Lug 2025",
          note: "Base ingegneristica con sviluppo software e system design.",
        },
        {
          school: "University of Tunis El Manar",
          credential: "Laurea in Informatica",
          period: "Set 2020 - Giu 2023",
          note: "Fondamenti di informatica, database, algoritmi e progetti software.",
        },
      ],
    },
    contact: {
      eyebrow: "contatto",
      title: "Costruisco piattaforme AI-ready, integrazioni e sistemi di automazione.",
      location: "Basato in Italia",
    },
  },
} as const;

type SiteCopy = typeof content.en;
type SkillGroupId = (typeof content.en.skills.groups)[number]["id"];

function SectionTitle({
  eyebrow,
  title,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-blueprint">
          <Icon className="h-4 w-4" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight">{title}</h2>
      </div>
    </div>
  );
}

function HeroMark() {
  return (
    <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-beam sm:mx-0">
      <div className="absolute inset-0 soft-grid opacity-70" />
      <div className="absolute left-5 top-5 h-12 w-12 rounded-2xl bg-blueprint text-center font-mono text-lg font-bold leading-[3rem] text-white">
        GJ
      </div>
      <div className="absolute bottom-5 left-5 right-5 space-y-2">
        <div className="h-2 w-24 rounded-full bg-ink/80" />
        <div className="h-2 w-16 rounded-full bg-blueprint" />
        <div className="h-2 w-20 rounded-full bg-mint" />
      </div>
      <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-rose/20 bg-rose/10 text-rose">
        <Sparkles className="h-5 w-5" aria-hidden="true" />
      </div>
    </div>
  );
}

function TodayPanel({ copy }: { copy: SiteCopy["today"] }) {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-10">
      <SectionTitle eyebrow={copy.eyebrow} title={copy.title} icon={Sparkles} />
      <div className="rounded-lg border border-line bg-surface/90 p-5 shadow-sm">
        <div className="space-y-5">
          {copy.items.map((item, index) => (
            <article
              key={item.title}
              className="grid gap-3 border-line/70 pb-5 last:pb-0 sm:grid-cols-[4rem_1fr] [&:not(:last-child)]:border-b"
            >
              <p className="font-mono text-xs font-semibold text-blueprint">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection({ copy }: { copy: SiteCopy["experience"] }) {
  return (
    <section id="experience" className="mx-auto w-full max-w-3xl px-5 py-12">
      <SectionTitle
        eyebrow={copy.eyebrow}
        title={copy.title}
        icon={BriefcaseBusiness}
      />
      <div className="space-y-3">
        {copy.items.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.company}
              className="group rounded-lg border border-line bg-surface/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blueprint hover:shadow-beam"
            >
              <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-line bg-paper text-blueprint transition group-hover:border-blueprint">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold leading-tight">
                        {item.company}
                      </h3>
                      <p className="mt-1 font-mono text-sm text-ink/58">
                        {item.role} / {item.place}
                      </p>
                    </div>
                    <p className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-xs font-semibold text-ink/58">
                      {item.period}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-ink/74">{item.summary}</p>
                  <p className="mt-4 border-t border-line/70 pt-3 font-mono text-xs text-blueprint">
                    {item.stack}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProjectsSection({ copy }: { copy: SiteCopy["projects"] }) {
  return (
    <section id="projects" className="mx-auto w-full max-w-3xl px-5 py-12">
      <SectionTitle eyebrow={copy.eyebrow} title={copy.title} icon={Layers3} />
      <div className="grid gap-4">
        {copy.items.map((project, index) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-4 rounded-lg border border-line bg-surface/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blueprint hover:shadow-beam sm:grid-cols-[4.5rem_1fr]"
          >
            <div>
              <p className="font-mono text-xs font-semibold text-blueprint">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 rounded-full border border-line bg-paper px-2 py-1 text-center font-mono text-[11px] font-semibold text-ink/56">
                {project.status}
              </p>
            </div>
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase text-rose">
                    {project.type}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{project.name}</h3>
                </div>
                <ArrowUpRight
                  className="h-5 w-5 text-blueprint transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-ink/74">{project.description}</p>
              <p className="mt-4 font-mono text-xs text-ink/52">{project.stack}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function SkillsSection({ copy }: { copy: SiteCopy["skills"] }) {
  const [activeId, setActiveId] = useState<SkillGroupId>("systems");
  const active = copy.groups.find((group) => group.id === activeId) ?? copy.groups[0];
  const ActiveIcon = active.icon;

  return (
    <section id="skills" className="mx-auto w-full max-w-3xl px-5 py-12">
      <SectionTitle eyebrow={copy.eyebrow} title={copy.title} icon={BrainCircuit} />
      <div className="rounded-lg border border-line bg-surface/90 p-5 shadow-sm sm:p-6">
        <p className="text-lg leading-8 text-ink/76">{copy.intro}</p>

        <div className="mt-6 grid gap-2 sm:grid-cols-4">
          {copy.groups.map((group) => {
            const isActive = activeId === group.id;

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveId(group.id)}
                aria-pressed={isActive}
                className={`h-11 rounded-md border px-3 text-left font-mono text-xs font-semibold uppercase transition ${
                  isActive
                    ? "border-blueprint bg-blueprint text-white shadow-sm"
                    : "border-line bg-paper text-ink/62 hover:border-blueprint hover:text-blueprint"
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 rounded-lg border border-line bg-paper/70 p-4 sm:grid-cols-[auto_1fr]">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blueprint text-white">
            <ActiveIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{active.sentence}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/70">{active.proof}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-4">
              {active.items.map((item, index) => (
                <div
                  key={item}
                  className="rounded-md border border-line bg-surface px-3 py-3"
                >
                  <p className="font-mono text-[11px] text-ink/42">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationSection({ copy }: { copy: SiteCopy["education"] }) {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-12">
      <SectionTitle
        eyebrow={copy.eyebrow}
        title={copy.title}
        icon={GraduationCap}
      />
      <div className="rounded-lg border border-line bg-surface/90 p-5 shadow-sm">
        <div className="space-y-5">
          {copy.items.map((item, index) => (
            <article
              key={item.school}
              className="grid gap-3 border-line/70 pb-5 last:pb-0 sm:grid-cols-[4.5rem_1fr] [&:not(:last-child)]:border-b"
            >
              <p className="font-mono text-xs font-semibold text-blueprint">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold">{item.credential}</h3>
                  <p className="font-mono text-xs text-ink/50">{item.period}</p>
                </div>
                <p className="mt-1 font-mono text-sm text-ink/58">{item.school}</p>
                <p className="mt-3 text-sm leading-6 text-ink/70">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const copy = content[language] as SiteCopy;
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("language");
    const nextLanguage =
      savedLanguage === "en" || savedLanguage === "it"
        ? savedLanguage
        : navigator.language.toLowerCase().startsWith("it")
          ? "it"
          : "en";

    window.setTimeout(() => setLanguage(nextLanguage), 0);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const nextTheme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    window.setTimeout(() => setTheme(nextTheme), 0);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("language", nextLanguage);
  }

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <main className="min-h-screen bg-paper text-ink canvas-grid">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-5">
        <a href="#top" className="font-mono text-sm font-semibold">
          ghassen jemiai
        </a>
        <nav className="hidden items-center gap-5 font-mono text-xs text-ink/68 sm:flex">
          <a className="transition hover:text-blueprint" href="#experience">
            {copy.nav.experience}
          </a>
          <a className="transition hover:text-blueprint" href="#projects">
            {copy.nav.projects}
          </a>
          <a className="transition hover:text-blueprint" href="#skills">
            {copy.nav.skills}
          </a>
          <a className="transition hover:text-blueprint" href="#contact">
            {copy.nav.contact}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 items-center rounded-full border border-line bg-surface p-1 shadow-sm"
            aria-label={copy.actions.languageLabel}
          >
            {languageOptions.map((option) => {
              const isActive = language === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => changeLanguage(option.id)}
                  className={`h-7 rounded-full px-2 font-mono text-[11px] font-semibold transition ${
                    isActive
                      ? "bg-blueprint text-white"
                      : "text-ink/62 hover:text-blueprint"
                  }`}
                  aria-pressed={isActive}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-blueprint shadow-sm transition hover:border-blueprint"
            aria-label={
              theme === "dark" ? copy.actions.lightTheme : copy.actions.darkTheme
            }
            title={theme === "dark" ? copy.actions.lightTheme : copy.actions.darkTheme}
          >
            <ThemeIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <a
            href="/my-cv.pdf"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-3 font-mono text-xs font-semibold text-blueprint shadow-sm transition hover:border-blueprint"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {copy.actions.cv}
          </a>
        </div>
      </header>

      <section id="top" className="mx-auto w-full max-w-3xl px-5 pb-12 pt-8">
        <div className="grid gap-7 sm:grid-cols-[auto_1fr] sm:items-center">
          <HeroMark />
          <div className="text-center sm:text-left">
            <p className="font-mono text-sm font-semibold uppercase text-blueprint">
              {copy.hero.eyebrow}
            </p>
            <h1 className="mt-3 text-5xl font-semibold leading-none text-ink sm:text-6xl">
              {copy.hero.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/74">{copy.hero.description}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href={`mailto:${email}`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 font-mono text-xs font-semibold text-blueprint shadow-sm transition hover:border-blueprint"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {copy.actions.email}
              </a>
              <a
                href="/my-cv.pdf"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 font-mono text-xs font-semibold text-blueprint shadow-sm transition hover:border-blueprint"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {copy.actions.cv}
              </a>
            </div>
          </div>
        </div>
      </section>

      <TodayPanel copy={copy.today} />
      <ExperienceSection copy={copy.experience} />
      <ProjectsSection copy={copy.projects} />
      <SkillsSection copy={copy.skills} />
      <EducationSection copy={copy.education} />

      <section id="contact" className="mx-auto w-full max-w-3xl px-5 pb-12 pt-8">
        <div className="rounded-lg border border-line bg-surface/92 p-5 shadow-sm sm:p-6">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase text-blueprint">
                {copy.contact.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight">
                {copy.contact.title}
              </h2>
            </div>
            <a
              href={`mailto:${email}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-blueprint bg-blueprint px-4 font-mono text-xs font-semibold text-white transition hover:bg-ink"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {copy.actions.email}
            </a>
          </div>
          <div className="mt-7 grid gap-3 font-mono text-sm text-ink/66 sm:grid-cols-3">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blueprint" aria-hidden="true" />
              {email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blueprint" aria-hidden="true" />
              {phone}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blueprint" aria-hidden="true" />
              {copy.contact.location}
            </p>
          </div>
        </div>
        <footer className="flex items-center justify-between gap-4 py-8 font-mono text-sm text-ink/46">
          <p>(c) 2026 Ghassen Jemiai</p>
          <a
            href="#top"
            className="inline-flex items-center gap-1 transition hover:text-blueprint"
          >
            {copy.actions.top}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </footer>
      </section>
    </main>
  );
}
