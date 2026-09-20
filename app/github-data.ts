export const githubUsername = "beamerboi";
export const githubUrl = `https://github.com/${githubUsername}`;

export type Contribution = { date: string; count: number; level: number };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseContributions(value: unknown): Contribution[] {
  if (!isRecord(value) || !Array.isArray(value.contributions)) {
    throw new Error("Contribution data is unavailable");
  }
  const days = value.contributions.map((day: unknown) => {
    if (
      !isRecord(day) ||
      typeof day.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
      !Number.isFinite(Date.parse(day.date)) ||
      typeof day.count !== "number" ||
      !Number.isSafeInteger(day.count) ||
      day.count < 0 ||
      typeof day.level !== "number" ||
      !Number.isInteger(day.level) ||
      day.level < 0 ||
      day.level > 4
    ) {
      throw new Error("Invalid contribution data");
    }
    return { date: day.date, count: day.count, level: day.level };
  });
  days.sort((a, b) => a.date.localeCompare(b.date));
  if (!days.length || days.length > 366) {
    throw new Error("Invalid contribution date range");
  }
  for (let i = 1; i < days.length; i++) {
    if (
      Date.parse(days[i].date) - Date.parse(days[i - 1].date) !==
      86_400_000
    ) {
      throw new Error("Incomplete contribution calendar");
    }
  }
  return days;
}

export function calendarStats(days: Contribution[]) {
  let streak = 0;
  let longestStreak = 0;
  let total = 0;
  let activeDays = 0;
  for (const day of days) {
    total += day.count;
    streak = day.count > 0 ? streak + 1 : 0;
    if (day.count > 0) activeDays++;
    longestStreak = Math.max(longestStreak, streak);
  }
  return { total, activeDays, longestStreak };
}

export function calendarWeeks(days: Contribution[]) {
  if (!days.length) return [];
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Contribution | null)[] = [
    ...Array<null>(offset).fill(null),
    ...days,
  ];
  while (cells.length % 7) cells.push(null);
  return Array.from({ length: cells.length / 7 }, (_, i) =>
    cells.slice(i * 7, i * 7 + 7),
  );
}

export async function fetchContributions(
  signal: AbortSignal,
): Promise<Contribution[]> {
  const key = `github:${githubUsername}:contributions:v1`;
  try {
    const cached = JSON.parse(sessionStorage.getItem(key) ?? "null");
    if (cached && Date.now() - cached.timestamp < 3_600_000) {
      return parseContributions(cached.data);
    }
  } catch {
    // Storage may be disabled or contain an outdated response.
  }
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`,
    { signal },
  );
  if (!response.ok)
    throw new Error(`GitHub request failed: ${response.status}`);
  const data: unknown = await response.json();
  const result = parseContributions(data);
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({ timestamp: Date.now(), data }),
    );
  } catch {
    // The calendar works without browser storage.
  }
  return result;
}
