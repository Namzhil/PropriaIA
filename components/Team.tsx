const CheckSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default function Team({ dict }: { dict: any }) {
  return (
    <section className="team-section" id="team">
      <div className="section-header reveal">
        <span className="eyebrow">{dict.team.eyebrow}</span>
        <h2 className="section-title">{dict.team.title}</h2>
      </div>
      <div className="team-grid">
        {[1, 2].map((n) => (
          <div key={n} className={`team-card reveal reveal-delay-${n}`}>
            <div className="team-header">
              <div className="team-icon">
                {n === 1 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                )}
              </div>
              <div className="team-header-text">
                <div className="team-role">{dict.team[`team${n}Role` as keyof typeof dict.team] as string}</div>
                <h3>{dict.team[`team${n}Name` as keyof typeof dict.team] as string}</h3>
              </div>
            </div>
            <ul>
              {(dict.team[`team${n}Items` as keyof typeof dict.team] as string[]).map((item: string, i: number) => (
                <li key={i}><CheckSvg /> {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}