import { toKanjiNumber, toZenkakuDigits } from "@/lib/memorial-calc";
import { MemorialDocumentViewModel } from "@/types/memorial";

type MemorialPreviewProps = {
  vm: MemorialDocumentViewModel | null;
  errorMessage?: string;
  overflowWarning: boolean;
};

export function MemorialPreview({ vm, errorMessage, overflowWarning }: MemorialPreviewProps) {
  const renderKijitsuLabel = (label: string) => {
    if (label === "満中陰（四十九日）") {
      return (
        <>
          満中陰
          <br />
          <span className="kijitsu-sub">（四十九日）</span>
        </>
      );
    }
    return label;
  };

  const renderPersonColumn = (viewModel: MemorialDocumentViewModel) => (
    <section className="column person-column">
      {(() => {
        const homyo = viewModel.deceased.homyo.trim();
        const showZokumyoLine = homyo.length > 0;
        const displayName = showZokumyoLine ? homyo : viewModel.deceased.zokumyo;

        return (
          <>
            <p className="death-line vertical-text">{viewModel.deathDateWareki}往生</p>
            <p className="homyo vertical-text">{displayName}</p>
            <div className="zokumyo-block">
              {showZokumyoLine ? (
                <p className="zokumyo vertical-text">俗名　{viewModel.deceased.zokumyo}</p>
              ) : (
                <p className="zokumyo zokumyo-empty vertical-text">　</p>
              )}
              <p className="age-line vertical-text">享年{toKanjiNumber(viewModel.deceased.ageAtDeath)}歳</p>
            </div>
          </>
        );
      })()}
    </section>
  );

  return (
    <section className="preview-frame">
      <div className="a4-page">
        {vm ? (
          <article className="document-blocks">
            <section className="upper-block">
              {renderPersonColumn(vm)}
              <section className="column kijitsu-columns">
                {vm.kijitsuRows.map((row) => (
                  <div className="kijitsu-col" key={row.label}>
                    <p className="kijitsu-label vertical-text">{renderKijitsuLabel(row.label)}</p>
                    <p className="kijitsu-date vertical-text">
                      {row.monthDay}（{row.weekday}）
                    </p>
                  </div>
                ))}
              </section>
            </section>

            <section className="lower-block">
              {renderPersonColumn(vm)}
              <section className="column memorial-columns">
                {vm.rows.map((row) => (
                  <div className="memorial-col" key={row.rank}>
                    <p className="rank vertical-text">{row.label}</p>
                    <p className="year vertical-text">{toZenkakuDigits(row.yearAD)}年</p>
                  </div>
                ))}
              </section>
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
