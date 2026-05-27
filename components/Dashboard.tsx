export default function Dashboard({ dict }: { dict: any }) {
  return (
    <section className="dash-section">
      <div className="section-header reveal">
        <span className="eyebrow">{dict.dashboard.eyebrow}</span>
        <h2 className="section-title">{dict.dashboard.title}</h2>
      </div>
      <div className="dash-container">
        <div className="dash-frame reveal">
          <div className="dash-topbar">
            <span className="dash-dot"></span>
            <span className="dash-dot"></span>
            <span className="dash-dot"></span>
          </div>
          <div className="dash-header">
            <div className="dash-title">{dict.dashboard.dashTitle}</div>
            <div className="dash-stats">
              <div className="dash-stat"><span className="dash-stat-dot"></span><div className="dash-stat-value">3</div><div className="dash-stat-label">{dict.dashboard.labelRisk}</div></div>
              <div className="dash-stat"><span className="dash-stat-dot"></span><div className="dash-stat-value">2</div><div className="dash-stat-label">{dict.dashboard.labelStalled}</div></div>
              <div className="dash-stat"><span className="dash-stat-dot"></span><div className="dash-stat-value">5</div><div className="dash-stat-label">{dict.dashboard.labelHot}</div></div>
            </div>
          </div>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>{dict.dashboard.colLead}</th>
                  <th>{dict.dashboard.colStage}</th>
                  <th>{dict.dashboard.colTouch}</th>
                  <th>{dict.dashboard.colScore}</th>
                  <th>{dict.dashboard.colInspector}</th>
                </tr>
              </thead>
              <tbody>
                {dict.dashboard.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td>
                      <span className="dash-lead-name">{row.name}</span>
                      <span className="dash-lead-meta">{row.meta}</span>
                    </td>
                    <td><span className="dash-stage">{row.stage}</span></td>
                    <td>{row.touch}</td>
                    <td><span className="dash-score">{row.score}</span></td>
                    <td><span className={`dash-badge badge-${row.badgeType}`}>{row.badge}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}