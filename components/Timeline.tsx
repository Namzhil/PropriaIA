export default function Timeline({ dict }: { dict: any }) {
  const items = [
    { title: dict.timeline.item1Title, desc: dict.timeline.item1Desc },
    { title: dict.timeline.item2Title, desc: dict.timeline.item2Desc },
    { title: dict.timeline.item3Title, desc: dict.timeline.item3Desc },
    { title: dict.timeline.item4Title, desc: dict.timeline.item4Desc },
  ];

  return (
    <section className="timeline-section">
      <div className="section-header reveal">
        <span className="eyebrow">{dict.timeline.eyebrow}</span>
        <h2 className="section-title">{dict.timeline.title}</h2>
      </div>
      <div className="timeline">
        {items.map((item, i) => (
          <div key={i} className="timeline-item reveal">
            <div className="timeline-orb"></div>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}