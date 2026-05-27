import React from 'react';

export default function Flow({ dict }: { dict: any }) {
  const steps = [
    { num: '01', title: dict.flow.step1Title, text: dict.flow.step1Desc },
    { num: '02', title: dict.flow.step2Title, text: dict.flow.step2Desc },
    { num: '03', title: dict.flow.step3Title, text: dict.flow.step3Desc },
    { num: '04', title: dict.flow.step4Title, text: dict.flow.step4Desc },
    { num: '05', title: dict.flow.step5Title, text: dict.flow.step5Desc },
  ];

  return (
    <section className="flow-section">
      <div className="flow-inner">
        <div className="flow-header reveal">
          <span className="flow-eyebrow">{dict.flow.eyebrow}</span>
          <h3 className="flow-title">{dict.flow.title}</h3>
          <p className="flow-subtitle">{dict.flow.subtitle}</p>
        </div>
        <div className="flow-track reveal">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="flow-step">
                <div className="flow-num">{step.num}</div>
                <div className="flow-step-title">{step.title}</div>
                <div className="flow-step-text">{step.text}</div>
              </div>
              {i < steps.length - 1 && <div className="flow-divider" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}