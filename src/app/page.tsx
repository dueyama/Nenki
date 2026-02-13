"use client";

import { useMemo, useState } from "react";

import { MemorialForm } from "@/components/MemorialForm";
import { MemorialPreview } from "@/components/MemorialPreview";
import { buildDocumentVM } from "@/lib/memorial-calc";
import { DeceasedInput, MemorialDocumentViewModel } from "@/types/memorial";

const INITIAL_INPUT: DeceasedInput = {
  homyo: "浄泉院釋太郎",
  zokumyo: "上山太郎",
  deathDateISO: "1999-11-29",
  ageAtDeath: 99
};

function hasOverflowRisk(input: DeceasedInput): boolean {
  return (
    input.homyo.trim().length > 16 ||
    input.zokumyo.trim().length > 14 ||
    input.homyo.trim().length + input.zokumyo.trim().length > 24
  );
}

function hasRequiredInput(input: DeceasedInput): boolean {
  return Boolean(
    input.zokumyo.trim() &&
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
        <h2 className="screen-only">A4縦 プレビュー（上下ブロック）</h2>
        <MemorialPreview vm={vm} errorMessage={errorMessage} overflowWarning={overflowWarning} />
      </section>
    </main>
  );
}
