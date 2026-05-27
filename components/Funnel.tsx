export default function Funnel({ dict }: { dict: any }) {
  const cards = [
    { num: dict.funnel.card1Num, title: dict.funnel.card1Title, desc: dict.funnel.card1Desc },
    { num: dict.funnel.card2Num, title: dict.funnel.card2Title, desc: dict.funnel.card2Desc },
    { num: dict.funnel.card3Num, title: dict.funnel.card3Title, desc: dict.funnel.card3Desc },
  ];

  return (
    <section className="funnel-section" id="funnel">
      <div className="section-header reveal">
        <span className="eyebrow">{dict.funnel.eyebrow}</span>
        <h2 className="section-title">{dict.funnel.title}</h2>
        <p className="section-desc">{dict.funnel.desc}</p>
      </div>
      <div className="funnel-grid">
        {cards.map((card, i) => (
          <div key={i} className={`funnel-card reveal reveal-delay-${i + 1}`}>
            <div className="funnel-card-num">{card.num}</div>
            <h3>{card.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: card.desc }} />
          </div>
        ))}
      </div>
    </section>
  );
}