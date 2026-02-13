import { DeceasedInput, MemorialDocumentViewModel, MemorialRank, MemorialRow } from "@/types/memorial";

type ParsedDate = {
  year: number;
  month: number;
  day: number;
};

const MEMORIAL_RANKS: MemorialRank[] = [1, 3, 7, 13, 17, 25, 33, 50];

const ERA_STARTS = [
  { name: "令和", start: { year: 2019, month: 5, day: 1 } },
  { name: "平成", start: { year: 1989, month: 1, day: 8 } },
  { name: "昭和", start: { year: 1926, month: 12, day: 25 } },
  { name: "大正", start: { year: 1912, month: 7, day: 30 } },
  { name: "明治", start: { year: 1868, month: 1, day: 25 } }
] as const;

const KANJI_DIGITS: Record<number, string> = {
  0: "",
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "七",
  8: "八",
  9: "九"
};

function toKanjiNumber(value: number): string {
  if (!Number.isInteger(value) || value <= 0) {
    return String(value);
  }
  if (value < 10) {
    return KANJI_DIGITS[value];
  }
  if (value === 10) {
    return "十";
  }
  if (value < 20) {
    return `十${KANJI_DIGITS[value - 10]}`;
  }
  if (value < 100) {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    const tensText = `${KANJI_DIGITS[tens]}十`;
    return `${tensText}${KANJI_DIGITS[ones]}`;
  }
  return String(value);
}

function compareDate(a: ParsedDate, b: ParsedDate): number {
  if (a.year !== b.year) {
    return a.year - b.year;
  }
  if (a.month !== b.month) {
    return a.month - b.month;
  }
  return a.day - b.day;
}

function parseISODate(dateISO: string): ParsedDate {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateISO);
  if (!match) {
    throw new Error("命日は YYYY-MM-DD 形式で入力してください。");
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (year < 1868 || month < 1 || month > 12) {
    throw new Error("命日の年月が不正です。");
  }

  const maxDay = new Date(year, month, 0).getDate();
  if (day < 1 || day > maxDay) {
    throw new Error("命日の日付が不正です。");
  }

  return { year, month, day };
}

function toMemorialLabel(rank: MemorialRank): string {
  if (rank === 1) {
    return "一周忌";
  }
  return `${toKanjiNumber(rank)}回忌`;
}

function toOffsetYear(rank: MemorialRank): number {
  // 1周忌は没後1年、3回忌は没後2年という扱い。
  return rank === 1 ? 1 : rank - 1;
}

export function buildMemorialRows(deathDateISO: string): MemorialRow[] {
  const { year } = parseISODate(deathDateISO);

  return MEMORIAL_RANKS.map((rank) => ({
    rank,
    label: toMemorialLabel(rank),
    yearAD: year + toOffsetYear(rank)
  }));
}

export function toWarekiDate(deathDateISO: string): string {
  const parsed = parseISODate(deathDateISO);
  const era = ERA_STARTS.find((candidate) => compareDate(parsed, candidate.start) >= 0);

  if (!era) {
    return `${parsed.year}年${parsed.month}月${parsed.day}日`;
  }

  const yearInEra = parsed.year - era.start.year + 1;
  const eraYearText = yearInEra === 1 ? "元" : String(yearInEra);
  return `${era.name}${eraYearText}年${parsed.month}月${parsed.day}日`;
}

export function buildDocumentVM(input: DeceasedInput): MemorialDocumentViewModel {
  const normalized: DeceasedInput = {
    kaimyo: input.kaimyo.trim(),
    zokumyo: input.zokumyo.trim(),
    deathDateISO: input.deathDateISO.trim(),
    ageAtDeath: input.ageAtDeath,
    templeName: input.templeName.trim()
  };

  if (!normalized.kaimyo || !normalized.zokumyo || !normalized.templeName) {
    throw new Error("戒名・俗名・寺院名は必須です。");
  }
  if (!Number.isInteger(normalized.ageAtDeath) || normalized.ageAtDeath <= 0) {
    throw new Error("享年は1以上の整数で入力してください。");
  }

  return {
    deceased: normalized,
    deathDateWareki: toWarekiDate(normalized.deathDateISO),
    rows: buildMemorialRows(normalized.deathDateISO)
  };
}
