export default function Agents({ dict }: { dict: any }) {
  const agentIcons = [
    <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>,
    <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><line x1="1" y1="1" x2="23" y2="23" strokeDasharray="2 2"/></svg>,
    <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/><circle cx="12" cy="7" r="2"/><circle cx="18" cy="2" r="1.5"/><circle cx="6" cy="14" r="1.5"/></svg>,
    <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/><circle cx="17" cy="5" r="2.5" strokeDasharray="0" fill="currentColor" opacity="0.3"/></svg>,
  ];

  const agentKeys = ['agent1', 'agent2', 'agent3', 'agent4'];

  return (
    <section className="agents-section" id="agents">
      <div className="section-header reveal">
        <span className="eyebrow">{dict.agents.eyebrow}</span>
        <h2 className="section-title">{dict.agents.title}</h2>
      </div>
      <div className="agents-grid">
        {agentKeys.map((key, i) => (
          <div key={key} className={`agent-card reveal reveal-delay-${i + 1}`}>
            <div className="agent-header">
              <div className="agent-icon">{agentIcons[i]}</div>
              <div>
                <div className="agent-name">{dict.agents[`${key}Name`]}</div>
                <div className="agent-role">{dict.agents[`${key}Role`]}</div>
              </div>
            </div>
            <p className="agent-description">{dict.agents[`${key}Desc`]}</p>
            <div className="agent-tags">
              {(dict.agents[`${key}Tags`] as string).split(', ').map((tag: string) => (
                <span key={tag} className="agent-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}