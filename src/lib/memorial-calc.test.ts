import { describe, expect, it } from "vitest";

import { buildKijitsuRows, buildMemorialRows, toWarekiDate } from "./memorial-calc";

describe("buildMemorialRows", () => {
  it("calculates the expected AD years from death date", () => {
    const rows = buildMemorialRows("1994-02-12");
    expect(rows.map((row) => row.label)).toEqual([
      "一周忌",
      "三回忌",
      "七回忌",
      "十三回忌",
      "十七回忌",
      "二十五回忌",
      "三十三回忌",
      "五十回忌"
    ]);
    expect(rows.map((row) => row.yearAD)).toEqual([1995, 1996, 2000, 2006, 2010, 2018, 2026, 2043]);
  });

  it("handles leap day input without breaking year offsets", () => {
    const rows = buildMemorialRows("2000-02-29");
    expect(rows.map((row) => row.yearAD)).toEqual([2001, 2002, 2006, 2012, 2016, 2024, 2032, 2049]);
  });

  it("throws on invalid date strings", () => {
    expect(() => buildMemorialRows("2025-02-31")).toThrowError();
  });
});

describe("toWarekiDate", () => {
  it("supports Reiwa and Heisei boundary dates", () => {
    expect(toWarekiDate("2019-05-01")).toBe("令和元年五月一日");
    expect(toWarekiDate("1989-01-08")).toBe("平成元年一月八日");
    expect(toWarekiDate("1989-01-07")).toBe("昭和六十四年一月七日");
  });
});

describe("buildKijitsuRows", () => {
  it("calculates the expected weekly memorial schedule from death date", () => {
    const rows = buildKijitsuRows("1994-02-12");
    expect(rows).toEqual([
      { label: "初七日", monthDay: "二月十八日", weekday: "金" },
      { label: "二七日", monthDay: "二月二十五日", weekday: "金" },
      { label: "三七日", monthDay: "三月四日", weekday: "金" },
      { label: "四七日", monthDay: "三月十一日", weekday: "金" },
      { label: "五七日", monthDay: "三月十八日", weekday: "金" },
      { label: "六七日", monthDay: "三月二十五日", weekday: "金" },
      { label: "満中陰（四十九日）", monthDay: "四月一日", weekday: "金" },
      { label: "百ヶ日", monthDay: "五月二十二日", weekday: "日" }
    ]);
  });
});
