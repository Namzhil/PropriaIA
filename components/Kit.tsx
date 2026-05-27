export default function Kit({ dict }: { dict: any }) {
  return (
    <section className="kit-section">
      <div className="section-header reveal">
        <span className="eyebrow">{dict.kit.eyebrow}</span>
        <h2 className="section-title">{dict.kit.title}</h2>
        <p className="section-desc">{dict.kit.desc}</p>
      </div>
      <div className="kit-grid">
        <div className="kit-card reveal reveal-delay-1">
          <div className="kit-card-num">01</div>
          <h3>{dict.kit.card1Title}</h3>
          <p>{dict.kit.card1Desc}</p>
        </div>
        <div className="kit-card reveal reveal-delay-2">
          <div className="kit-card-num">02</div>
          <h3>{dict.kit.card2Title}</h3>
          <p>{dict.kit.card2Desc}</p>
        </div>
        <div className="kit-card reveal reveal-delay-3">
          <div className="kit-card-num">03</div>
          <h3>{dict.kit.card3Title}</h3>
          <p>{dict.kit.card3Desc}</p>
        </div>
        <div className="kit-card reveal reveal-delay-4">
          <div className="kit-card-num">04</div>
          <h3>{dict.kit.card4Title}</h3>
          <p>{dict.kit.card4Desc}</p>
        </div>
      </div>
    </section>
  );
}