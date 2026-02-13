export type MemorialRank = 1 | 3 | 7 | 13 | 17 | 25 | 33 | 50;

export interface DeceasedInput {
  kaimyo: string;
  zokumyo: string;
  deathDateISO: string;
  ageAtDeath: number;
  templeName: string;
}

export interface MemorialRow {
  rank: MemorialRank;
  label: string;
  yearAD: number;
}

export interface MemorialDocumentViewModel {
  deceased: DeceasedInput;
  deathDateWareki: string;
  rows: MemorialRow[];
}
