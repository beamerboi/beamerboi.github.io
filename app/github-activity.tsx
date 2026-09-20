"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { ArrowUpRight, Github, GitBranch, RefreshCw } from "lucide-react";
import {
  calendarStats,
  calendarWeeks,
  fetchContributions,
  githubUrl,
  githubUsername,
  type Contribution,
} from "./github-data";
import styles from "./github-activity.module.css";

const copy = {
  en: {
    label: "Behind the builds",
    title: "One commit at a time.",
    intro:
      "The small steps behind the finished products. A look at what I’m building on GitHub.",
    profile: "Explore my GitHub",
    contributions: "contributions",
    period: "over the last year",
    activeDays: "active days",
    longestStreak: "longest streak (days)",
    less: "Less",
    more: "More",
    hint: "Every square, a day of building.",
    loadingCalendar: "Loading GitHub contributions…",
    unavailable:
      "Activity is taking a little break. You can still explore it on GitHub.",
    retry: "Try again",
    newTab: "opens in a new tab",
    calendarHelp: "Use the arrow keys to explore each day.",
    days: ["Mon", "Wed", "Fri"],
    contribution: "contribution",
  },
  it: {
    label: "Dietro i progetti",
    title: "Un commit alla volta.",
    intro:
      "I piccoli passi dietro i prodotti finiti. Uno sguardo a quello che costruisco su GitHub.",
    profile: "Esplora il mio GitHub",
    contributions: "contributi",
    period: "nell’ultimo anno",
    activeDays: "giorni di attività",
    longestStreak: "serie più lunga (giorni)",
    less: "Meno",
    more: "Più",
    hint: "Ogni quadrato, un giorno di lavoro.",
    loadingCalendar: "Caricamento dei contributi GitHub…",
    unavailable:
      "L’attività si prende una pausa. Puoi comunque esplorarla su GitHub.",
    retry: "Riprova",
    newTab: "si apre in una nuova scheda",
    calendarHelp: "Usa i tasti freccia per esplorare ogni giorno.",
    days: ["Lun", "Mer", "Ven"],
    contribution: "contributo",
  },
} as const;

type Language = keyof typeof copy;
type Resource = {
  status: "loading" | "ready" | "error";
  data: Contribution[] | null;
};

function useContributions() {
  const [resource, setResource] = useState<Resource>({
    status: "loading",
    data: null,
  });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), 15_000);
    fetchContributions(controller.signal)
      .then((data) => {
        if (active) setResource({ status: "ready", data });
      })
      .catch(() => {
        if (active) setResource({ status: "error", data: null });
      })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);
  return {
    ...resource,
    retry: () => {
      setResource({ status: "loading", data: null });
      setAttempt((n) => n + 1);
    },
  };
}

function Calendar({
  days,
  language,
}: {
  days: Contribution[];
  language: Language;
}) {
  const labels = copy[language];
  const locale = language === "it" ? "it-IT" : "en-GB";
  const weeks = calendarWeeks(days);
  const [selected, setSelected] = useState<Contribution | null>(null);
  const [focusDate, setFocusDate] = useState(days[days.length - 1].date);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const scrollArea = useRef<HTMLDivElement>(null);
  const dateFormat = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const monthFormat = new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
  });
  const dayLabel = (day: Contribution) =>
    `${day.count} ${day.count === 1 ? labels.contribution : labels.contributions} · ${dateFormat.format(new Date(day.date))}`;

  useEffect(() => {
    const area = scrollArea.current;
    if (area) area.scrollLeft = area.scrollWidth;
  }, []);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, date: string) {
    const index = days.findIndex((day) => day.date === date);
    const offsets: Record<string, number> = {
      ArrowLeft: -7,
      ArrowRight: 7,
      ArrowUp: -1,
      ArrowDown: 1,
    };
    let next = index;
    if (event.key in offsets)
      next = Math.max(0, Math.min(days.length - 1, index + offsets[event.key]));
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = days.length - 1;
    else return;
    event.preventDefault();
    setFocusDate(days[next].date);
    buttons.current.get(days[next].date)?.focus();
  }

  return (
    <>
      <p id="calendar-help" className="sr-only">
        {labels.calendarHelp}
      </p>
      <div className={styles.calendarScroll} ref={scrollArea}>
        <div
          className={styles.calendar}
          style={{ "--weeks": weeks.length } as CSSProperties}
          role="group"
          aria-label={labels.contributions}
          aria-describedby="calendar-help"
        >
          <div className={styles.months} aria-hidden="true">
            {weeks.map((week, index) => {
              const day =
                week.find((day) => day?.date.endsWith("-01")) ??
                (index === 0 ? week.find(Boolean) : null);
              return (
                <span key={index} style={{ gridColumn: index + 1 }}>
                  {day && index < weeks.length - 2
                    ? monthFormat.format(new Date(day.date))
                    : ""}
                </span>
              );
            })}
          </div>
          <div className={styles.weekdays} aria-hidden="true">
            {labels.days.map((day, index) => (
              <span key={day} style={{ gridRow: index * 2 + 2 }}>
                {day}
              </span>
            ))}
          </div>
          <div className={styles.weeks}>
            {weeks.map((week, index) => (
              <div className={styles.week} key={index}>
                {week.map((day, row) =>
                  day ? (
                    <button
                      type="button"
                      className={styles.day}
                      data-level={day.level}
                      key={day.date}
                      aria-label={dayLabel(day)}
                      title={dayLabel(day)}
                      tabIndex={focusDate === day.date ? 0 : -1}
                      ref={(element) => {
                        if (element) buttons.current.set(day.date, element);
                        else buttons.current.delete(day.date);
                      }}
                      onMouseEnter={() => setSelected(day)}
                      onMouseLeave={() => setSelected(null)}
                      onFocus={() => {
                        setSelected(day);
                        setFocusDate(day.date);
                      }}
                      onBlur={() => setSelected(null)}
                      onClick={() => {
                        setSelected(day);
                        setFocusDate(day.date);
                      }}
                      onKeyDown={(event) => navigate(event, day.date)}
                    />
                  ) : (
                    <span key={`empty-${row}`} />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.calendarFooter}>
        <p aria-live="polite" aria-atomic="true">
          {selected ? dayLabel(selected) : labels.hint}
        </p>
        <div className={styles.legend} aria-hidden="true">
          <span>{labels.less}</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <i className={styles.day} data-level={level} key={level} />
          ))}
          <span>{labels.more}</span>
        </div>
      </div>
    </>
  );
}

export function GitHubActivity({ language }: { language: Language }) {
  const labels = copy[language];
  const contributions = useContributions();
  const stats = contributions.data ? calendarStats(contributions.data) : null;
  const locale = language === "it" ? "it-IT" : "en-GB";
  const numberFormat = new Intl.NumberFormat(locale);

  function fallback() {
    return (
      <div className={styles.fallback} role="status">
        <GitBranch size={24} strokeWidth={1.4} aria-hidden="true" />
        <p>{labels.unavailable}</p>
        <div>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <button type="button" onClick={contributions.retry}>
            <RefreshCw size={13} aria-hidden="true" />
            {labels.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      id="github"
      className={`section ${styles.section}`}
      aria-labelledby="github-title"
    >
      <p className="section-label">
        <span>02</span>
        {labels.label}
      </p>
      <div className="section-heading">
        <h2 id="github-title">{labels.title}</h2>
        <p>{labels.intro}</p>
      </div>
      <div className={styles.card}>
        <div className={styles.profileBar}>
          <a
            className={styles.profile}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub @${githubUsername} (${labels.newTab})`}
          >
            <span className={styles.githubIcon}>
              <Github size={23} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span>
              <strong>@{githubUsername}</strong>
              <span>GitHub</span>
            </span>
          </a>
          <a
            className={styles.profileLink}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.profile}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div
          className={styles.calendarPanel}
          aria-busy={contributions.status === "loading"}
        >
          {stats && contributions.data ? (
            <>
              <div className={styles.stats}>
                <div className={styles.total}>
                  <strong>{numberFormat.format(stats.total)}</strong>
                  <span>
                    {labels.contributions}
                    <small>{labels.period}</small>
                  </span>
                </div>
                <div className={styles.stat}>
                  <strong>{numberFormat.format(stats.activeDays)}</strong>
                  <span>{labels.activeDays}</span>
                </div>
                <div className={styles.stat}>
                  <strong>{stats.longestStreak}</strong>
                  <span>{labels.longestStreak}</span>
                </div>
              </div>
              <Calendar days={contributions.data} language={language} />
            </>
          ) : contributions.status === "error" ? (
            fallback()
          ) : (
            <div className={styles.calendarLoading} role="status">
              <span className={styles.loadingLine} />
              <div className={styles.loadingGrid} aria-hidden="true" />
              <p>{labels.loadingCalendar}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
