'use client';

import { useState } from 'react';

export default function CTA({ dict, locale }: { dict: any; locale: string }) {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string).trim();
    const email = (formData.get('email') as string).trim();
    const message = (formData.get('message') as string).trim();

    if (!name) {
      setErrorMsg(dict.cta.errorName || 'Please enter your name');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMsg(dict.cta.errorEmail || 'Please enter a valid email address');
      return;
    }

    setFormState('sending');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, locale }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        setFormState('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || dict.cta.error);
        setFormState('error');
      }
    } catch {
      clearTimeout(timeoutId);
      setErrorMsg(dict.cta.error);
      setFormState('error');
    }
  }

  if (formState === 'success') {
    return (
      <section className="cta-section" id="cta">
        <div className="form-success">
          <div className="form-success-icon">✓</div>
          <h3>{dict.cta.success}</h3>
          <p>{dict.cta.successSub || 'We will contact you shortly.'}</p>
        </div>
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
        <textarea name="message" placeholder={dict.cta.messagePlaceholder} rows={3} />
        <button type="submit" disabled={formState === 'sending'}>
          {formState === 'sending' ? dict.cta.sending : dict.cta.button}
        </button>
        {errorMsg && <div className="form-error">{errorMsg}</div>}
      </form>
    </section>
  );
}
