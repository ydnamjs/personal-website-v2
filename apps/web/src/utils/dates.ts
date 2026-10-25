// Date helpers for the Credentials page.
//
// Dates are stored as "YYYY-MM" strings (e.g. "2021-06"). Plain strings keep
// the data files readable and avoid timezone surprises from Date objects.

export type YearMonth = string; // "YYYY-MM"

function parse(ym: YearMonth): { year: number; month: number } {
  const [year, month] = ym.split("-").map(Number);
  return { year, month };
}

function currentYearMonth(): YearMonth {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

/**
 * Whole months between two year-months, counting BOTH months. Jan 2020 to
 * Jan 2020 is 1 month; Jan 2020 to Dec 2020 is 12. If `end` is null or
 * undefined, "now" is used, so ongoing roles and skills keep growing on
 * their own.
 */
export function monthsBetween(start: YearMonth, end?: YearMonth | null): number {
  const s = parse(start);
  const e = parse(end ?? currentYearMonth());
  const months = (e.year - s.year) * 12 + (e.month - s.month) + 1;
  return Math.max(0, months);
}

/** 28 -> "2 yrs 4 mos", 12 -> "1 yr", 5 -> "5 mos" */
export function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  return parts.join(" ") || "0 mos";
}

/** "2021-06" -> "Jun 2021" */
export function formatMonthYear(ym: YearMonth): string {
  const { year, month } = parse(ym);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}
