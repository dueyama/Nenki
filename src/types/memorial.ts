export type MemorialRank = 1 | 3 | 7 | 13 | 17 | 25 | 33 | 50;

export interface DeceasedInput {
  homyo: string;
  zokumyo: string;
  deathDateISO: string;
  ageAtDeath: number;
}

export interface MemorialRow {
  rank: MemorialRank;
  label: string;
  yearAD: number;
}

export interface KijitsuRow {
  label: string;
  monthDay: string;
  weekday: string;
}

export interface MemorialDocumentViewModel {
  deceased: DeceasedInput;
  deathDateWareki: string;
  kijitsuRows: KijitsuRow[];
  rows: MemorialRow[];
}
