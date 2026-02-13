import { MemorialDocumentViewModel } from "@/types/memorial";

type MemorialPreviewProps = {
  vm: MemorialDocumentViewModel | null;
  errorMessage?: string;
  overflowWarning: boolean;
};

export function MemorialPreview({ vm, errorMessage, overflowWarning }: MemorialPreviewProps) {
  return (
    <section className="preview-frame">
      <div className="a4-page">
        {vm ? (
          <article className="lower-block">
            <section className="column person-column vertical-text">
              <p className="death-line">{vm.deathDateWareki}往生</p>
              <p className="kaimyo">{vm.deceased.kaimyo}</p>
              <p className="zokumyo-label">俗名</p>
              <p className="zokumyo">{vm.deceased.zokumyo}</p>
              <p className="age-line">享年 {vm.deceased.ageAtDeath}歳</p>
            </section>

            <section className="column memorial-columns">
              {vm.rows.map((row) => (
                <div className="memorial-pair" key={row.rank}>
                  <p className="rank vertical-text">{row.label}</p>
                  <p className="year vertical-text">{row.yearAD}年</p>
                </div>
              ))}
            </section>

            <section className="column temple-column vertical-text">
              <p>{vm.deceased.templeName}</p>
            </section>
          </article>
        ) : (
          <div className="placeholder">
            <p>{errorMessage ?? "入力を開始すると、ここにA4縦プレビューが表示されます。"}</p>
          </div>
        )}
      </div>

      {overflowWarning ? (
        <p className="warning screen-only">
          文字数が多いためA4内に収まらない可能性があります。文字数を減らして再調整してください。
        </p>
      ) : null}
    </section>
  );
}
