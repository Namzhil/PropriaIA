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
          <div
            key={i}
            className={`faq-item${openIndex === i ? ' active' : ''}`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              type="button"
            >
              {item.q}
            </button>
            <div
              className="faq-answer"
              style={{
                maxHeight: openIndex === i ? '500px' : '0px',
                opacity: openIndex === i ? 1 : 0,
              }}
            >
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}