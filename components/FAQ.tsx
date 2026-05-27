'use client';

import { useState } from 'react';

export default function FAQ({ dict }: { dict: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
    { q: dict.faq.q6, a: dict.faq.a6 },
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="section-header reveal">
        <span className="eyebrow">{dict.faq.eyebrow}</span>
        <h2 className="section-title">{dict.faq.title}</h2>
      </div>
      <div className="faq-container">
        {questions.map((item, i) => (
          <div key={i} className={`faq-item reveal${openIndex === i ? ' active' : ''}`}>
            <div className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              {item.q}
            </div>
            <div className="faq-answer">{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}