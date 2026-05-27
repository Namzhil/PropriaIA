export default function Hero({ dict }: { dict: any }) {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <div className="hero-tags">
            <span className="hero-tag">{dict.hero.tag1}</span>
            <span className="hero-tag">{dict.hero.tag2}</span>
            <span className="hero-tag">{dict.hero.tag3}</span>
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: dict.hero.title }} />
          <p className="hero-subtitle">{dict.hero.subtitle}</p>
          <div className="hero-buttons">
            <a href="#cta" className="btn btn-primary">{dict.hero.btnDiscovery}</a>
            <a href="#funnel" className="btn btn-secondary">{dict.hero.btnArchitecture}</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="metric-stack">
            <div className="metric-pill">
              <div className="metric-icon">🚀</div>
              <div>
                <div className="metric-label">{dict.metrics.transform}</div>
                <div className="metric-value">{dict.metrics.transformTime}</div>
              </div>
            </div>
            <div className="metric-pill">
              <div className="metric-icon">🤖</div>
              <div>
                <div className="metric-label">{dict.metrics.agents}</div>
                <div className="metric-value">{dict.metrics.agentsCount}</div>
              </div>
            </div>
            <div className="metric-pill">
              <div className="metric-icon">⚡</div>
              <div>
                <div className="metric-label">{dict.metrics.outcome}</div>
                <div className="metric-value">{dict.metrics.outcomeResult}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}