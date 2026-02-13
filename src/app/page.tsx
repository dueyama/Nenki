"use client";

import { useMemo, useState } from "react";

import { MemorialForm } from "@/components/MemorialForm";
import { MemorialPreview } from "@/components/MemorialPreview";
import { buildDocumentVM } from "@/lib/memorial-calc";
import { DeceasedInput, MemorialDocumentViewModel } from "@/types/memorial";

const INITIAL_INPUT: DeceasedInput = {
  kaimyo: "広智院釋俊幸",
  zokumyo: "明智 俊夫",
  deathDateISO: "1994-02-12",
  ageAtDeath: 69,
  templeName: "浄泉寺"
};

function hasOverflowRisk(input: DeceasedInput): boolean {
  return (
    input.kaimyo.trim().length > 20 ||
    input.zokumyo.trim().length > 14 ||
    input.templeName.trim().length > 12 ||
    input.kaimyo.trim().length + input.zokumyo.trim().length + input.templeName.trim().length > 38
  );
}

function hasRequiredInput(input: DeceasedInput): boolean {
  return Boolean(
    input.kaimyo.trim() &&
      input.zokumyo.trim() &&
      input.templeName.trim() &&
      input.deathDateISO.trim() &&
      Number.isFinite(input.ageAtDeath) &&
      input.ageAtDeath > 0
  );
}

export default function HomePage() {
  const [input, setInput] = useState<DeceasedInput>(INITIAL_INPUT);

  const { vm, errorMessage } = useMemo<{ vm: MemorialDocumentViewModel | null; errorMessage?: string }>(() => {
    if (!hasRequiredInput(input)) {
      return { vm: null, errorMessage: "必須項目をすべて入力してください。" };
    }

    try {
      return { vm: buildDocumentVM(input) };
    } catch (error) {
      const message = error instanceof Error ? error.message : "入力値を確認してください。";
      return { vm: null, errorMessage: message };
    }
  }, [input]);

  const overflowWarning = useMemo(() => hasOverflowRisk(input), [input]);
  const canPrint = Boolean(vm) && !overflowWarning;

  const handlePrint = () => {
    if (canPrint) {
      window.print();
    }
  };

  return (
    <main className="app-shell">
      <MemorialForm value={input} onChange={setInput} onPrint={handlePrint} canPrint={canPrint} />

      <section className="preview-panel">
        <h2 className="screen-only">A4縦 プレビュー（下段ブロック）</h2>
        <MemorialPreview vm={vm} errorMessage={errorMessage} overflowWarning={overflowWarning} />
      </section>
    </main>
  );
}
