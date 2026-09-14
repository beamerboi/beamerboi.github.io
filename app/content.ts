import {
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Layers3,
  Server,
} from "lucide-react";

export const content = {
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
        "I am a software engineer focused on building practical products that are fast to ship, reliable to run, and easy to maintain. My work spans SaaS platforms, payment flows, automation tools, and AI-backed systems.",
    },
    today: {
      eyebrow: "today",
      title: "What I'm focused on now",
      items: [
        {
          title: "master's degree in computer science",
          text: "Studying computer science at Università di Firenze while building practical software products.",
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
          school: "Università di Firenze",
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
      title:
        "Building AI-ready platforms, integrations, and automation systems.",
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
        "Sono un software engineer concentrato sulla costruzione di prodotti pratici, veloci da rilasciare, affidabili in produzione e facili da mantenere. Il mio lavoro include piattaforme SaaS, flussi di pagamento, strumenti di automazione e sistemi basati su AI.",
    },
    today: {
      eyebrow: "oggi",
      title: "Su cosa sto lavorando ora",
      items: [
        {
          title: "laurea magistrale in informatica",
          text: "Studio informatica all'Università di Firenze mentre costruisco prodotti software concreti.",
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
            "Ho sviluppato funzionalità SaaS, flussi di pagamento, template SEO, miglioramenti alla chat realtime e lavoro sulle performance della piattaforma.",
          stack: ".NET Core, SignalR, MySQL, AureliaJS",
          icon: Server,
        },
        {
          company: "Focus Corporation",
          role: "Software Engineer",
          period: "Gen 2023 - Ago 2025",
          place: "Tunisi, Tunisia",
          summary:
            "Ho sviluppato funzionalità per applicazioni enterprise, coordinato tre sviluppatori e progettato architetture AI, sistemi agent-based e soluzioni RAG.",
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
            "Analizza le richieste dei clienti, rileva attività fuori scope e genera change order con stime di costo.",
          stack: "AI, SaaS, workflow automation",
          href: "https://scopepilot.io/",
        },
        {
          name: "Kavoo",
          type: "Geo-social",
          status: "Concept",
          description:
            "Prodotto location-based per scoprire attività vicine, luoghi e piani sociali.",
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
            "Usati in piattaforme SaaS dove contano affidabilità, qualità delle integrazioni e velocità.",
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
          school: "Università di Firenze",
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
      title:
        "Costruisco piattaforme AI-ready, integrazioni e sistemi di automazione.",
      location: "Basato in Italia",
    },
  },
} as const;
export const ui = {
  en: {
    work: "Work",
    about: "About",
    toolkit: "Toolkit",
    contact: "Let’s talk",
    menu: "Open navigation",
    closeMenu: "Close navigation",
    skip: "Skip to content",
    location: "Software engineer · Based in Italy",
    hello: "Hi, I’m Ghassen Jemiai.",
    headline: ["Good ideas.", "Great software."],
    intro:
      "I turn complex problems into thoughtful digital products. Building across the web, AI, and everything in between.",
    explore: "Explore my work",
    resume: "Download CV",
    current: "A little life update",
    building: "Building ReGuardian",
    studying: "Studying at Università di Firenze",
    selected: "Selected work",
    projectsTitle: "Ideas into the real world.",
    projectsIntro: "Independent projects. Real problems. A little curiosity.",
    visit: "Explore project",
    newTab: "opens in a new tab",
    experienceLabel: "The journey",
    experienceTitle: "Good software is a team sport.",
    experienceIntro:
      "From enterprise systems to early-stage products, I care about the details that make software useful.",
    roleDetails: "Role details",
    toolkitLabel: "My toolkit",
    toolkitTitle: "The right tools. A builder’s mindset.",
    skillNames: {
      systems: "Backend & systems",
      ai: "AI & automation",
      frontend: "Frontend",
      data: "Data & infrastructure",
    },
    skillDescriptions: {
      systems: "Reliable foundations for ambitious products.",
      ai: "Intelligence that solves everyday problems.",
      frontend: "Interfaces that make complex things feel simple.",
      data: "The infrastructure behind a smooth experience.",
    },
    educationLabel: "Always learning",
    educationTitle: "Curiosity doesn’t graduate.",
    contactLabel: "Have something in mind?",
    contactTitle: ["Let’s build", "something good."],
    contactIntro:
      "An idea, an interesting challenge, or just a hello. My inbox is open.",
    back: "Back to top",
    footer: "Made with care. Built with curiosity.",
    illustration: "PRODUCT-MINDED. SYSTEMS-DRIVEN.",
    document: "Contract review",
    documentStatus: "Clarity in every clause.",
    scope: "A new client request",
    inScope: "In scope",
    outScope: "Change order",
    nearby: "Good plans, closer.",
  },
  it: {
    work: "Progetti",
    about: "Percorso",
    toolkit: "Competenze",
    contact: "Parliamone",
    menu: "Apri navigazione",
    closeMenu: "Chiudi navigazione",
    skip: "Vai al contenuto",
    location: "Software engineer · In Italia",
    hello: "Ciao, sono Ghassen Jemiai.",
    headline: ["Buone idee.", "Ottimo software."],
    intro:
      "Trasformo problemi complessi in prodotti digitali curati. Tra web, AI e tutto quello che li collega.",
    explore: "Esplora i progetti",
    resume: "Scarica CV",
    current: "In questo momento",
    building: "Sto costruendo ReGuardian",
    studying: "Studio all’Università di Firenze",
    selected: "Progetti selezionati",
    projectsTitle: "Dalle idee al mondo reale.",
    projectsIntro:
      "Progetti personali. Problemi concreti. Un po’ di curiosità.",
    visit: "Esplora il progetto",
    newTab: "si apre in una nuova scheda",
    experienceLabel: "Il percorso",
    experienceTitle: "Il buon software nasce in squadra.",
    experienceIntro:
      "Dai sistemi enterprise ai prodotti emergenti, curo i dettagli che rendono il software utile.",
    roleDetails: "Dettagli del ruolo",
    toolkitLabel: "Le mie competenze",
    toolkitTitle: "Gli strumenti giusti. La voglia di costruire.",
    skillNames: {
      systems: "Backend e sistemi",
      ai: "AI e automazione",
      frontend: "Frontend",
      data: "Dati e infrastruttura",
    },
    skillDescriptions: {
      systems: "Fondamenta affidabili per prodotti ambiziosi.",
      ai: "Intelligenza per risolvere problemi quotidiani.",
      frontend: "Interfacce che rendono semplice la complessità.",
      data: "L’infrastruttura dietro un’esperienza fluida.",
    },
    educationLabel: "Sempre imparando",
    educationTitle: "La curiosità non si laurea.",
    contactLabel: "Hai qualcosa in mente?",
    contactTitle: ["Costruiamo", "qualcosa di bello."],
    contactIntro:
      "Un’idea, una sfida interessante o un semplice saluto. Scrivimi.",
    back: "Torna su",
    footer: "Fatto con cura. Costruito con curiosità.",
    illustration: "PENSATO PER IL PRODOTTO. COSTRUITO PER DURARE.",
    document: "Revisione contratti",
    documentStatus: "Chiarezza in ogni clausola.",
    scope: "Una richiesta del cliente",
    inScope: "Nello scope",
    outScope: "Change order",
    nearby: "Bei programmi, vicini.",
  },
} as const;
