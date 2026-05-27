export default function AITransform({ dict }: { dict: any }) {
  return (
    <section className="ai-transform-section">
      <div className="section-header reveal">
        <span className="eyebrow">{dict.transform.eyebrow}</span>
        <h2 className="section-title">{dict.transform.title}</h2>
        <p className="section-desc">{dict.transform.desc}</p>
      </div>
      <div className="ai-transform-grid">
        <div className="ai-transform-card reveal reveal-delay-1">
          <div className="ai-transform-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div className="ai-transform-num">01</div>
          <h3>{dict.transform.card1Title}</h3>
          <p>{dict.transform.card1Desc}</p>
          <div className="ai-transform-tag">{dict.transform.card1Tag}</div>
        </div>
        <div className="ai-transform-card reveal reveal-delay-2">
          <div className="ai-transform-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <div className="ai-transform-num">02</div>
          <h3>{dict.transform.card2Title}</h3>
          <p>{dict.transform.card2Desc}</p>
          <div className="ai-transform-tag">{dict.transform.card2Tag}</div>
        </div>
        <div className="ai-transform-card reveal reveal-delay-3">
          <div className="ai-transform-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div className="ai-transform-num">03</div>
          <h3>{dict.transform.card3Title}</h3>
          <p>{dict.transform.card3Desc}</p>
          <div className="ai-transform-tag">{dict.transform.card3Tag}</div>
        </div>
      </div>
    </section>
  );
}