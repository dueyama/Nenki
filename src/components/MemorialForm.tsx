"use client";

import { DeceasedInput } from "@/types/memorial";

type MemorialFormProps = {
  value: DeceasedInput;
  onChange: (next: DeceasedInput) => void;
  onPrint: () => void;
  canPrint: boolean;
};

export function MemorialForm({ value, onChange, onPrint, canPrint }: MemorialFormProps) {
  const updateField = <K extends keyof DeceasedInput>(key: K, nextValue: DeceasedInput[K]) => {
    onChange({ ...value, [key]: nextValue });
  };

  return (
    <aside className="control-panel">
      <h1>年回忌 PDF 生成</h1>
      <p className="helper">入力内容は右側プレビューへ即時反映されます。</p>

      <div className="field">
        <label htmlFor="kaimyo">戒名</label>
        <input
          id="kaimyo"
          type="text"
          value={value.kaimyo}
          onChange={(event) => updateField("kaimyo", event.target.value)}
          placeholder="例: 広智院釋俊幸"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="zokumyo">俗名</label>
        <input
          id="zokumyo"
          type="text"
          value={value.zokumyo}
          onChange={(event) => updateField("zokumyo", event.target.value)}
          placeholder="例: 明智 俊夫"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="deathDateISO">命日</label>
        <input
          id="deathDateISO"
          type="date"
          value={value.deathDateISO}
          onChange={(event) => updateField("deathDateISO", event.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="ageAtDeath">享年</label>
        <input
          id="ageAtDeath"
          type="number"
          min={1}
          step={1}
          value={value.ageAtDeath}
          onChange={(event) => updateField("ageAtDeath", Number(event.target.value))}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="templeName">寺院名</label>
        <input
          id="templeName"
          type="text"
          value={value.templeName}
          onChange={(event) => updateField("templeName", event.target.value)}
          placeholder="例: 浄泉寺"
          required
        />
      </div>

      <button className="print-button screen-only" type="button" onClick={onPrint} disabled={!canPrint}>
        プレビューを印刷（PDF保存）
      </button>
    </aside>
  );
}
