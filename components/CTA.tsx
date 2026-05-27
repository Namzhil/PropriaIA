'use client';

import { useState } from 'react';

export default function CTA({ dict, locale }: { dict: any; locale: string }) {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('sending');
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
          locale,
        }),
      });
      if (res.ok) {
        setFormState('success');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  }

  if (formState === 'success') {
    return (
      <section className="cta-section" id="cta">
        <div className="form-success">✓ {dict.cta.success}</div>
      </section>
    );
  }

  return (
    <section className="cta-section" id="cta">
      <h2>{dict.cta.title}</h2>
      <p>{dict.cta.subtitle}</p>
      <form className="cta-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder={dict.cta.namePlaceholder} required />
        <input type="email" name="email" placeholder={dict.cta.emailPlaceholder} required />
        <input type="tel" name="phone" placeholder={dict.cta.phonePlaceholder} />
        <textarea name="message" placeholder={dict.cta.messagePlaceholder} rows={3} />
        <button type="submit" disabled={formState === 'sending'}>
          {formState === 'sending' ? dict.cta.sending : dict.cta.button}
        </button>
        {formState === 'error' && <div className="form-error">{dict.cta.error}</div>}
      </form>
    </section>
  );
}