'use client';

import { useState, useEffect } from 'react';

interface NavDict {
  direct: string;
  agents: string;
  team: string;
  faq: string;
  discovery: string;
  langSwitch: string;
}

interface Dict {
  brand: string;
  nav: NavDict;
}

export default function Navbar({ dict, locale }: { dict: Dict; locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const otherLocale = locale === 'en' ? 'es' : 'en';

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="logo">Pro<span>pria{locale === 'en' ? 'AI' : 'IA'}</span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        <a href="#funnel" onClick={() => setMenuOpen(false)}>{dict.nav.direct}</a>
        <a href="#agents" onClick={() => setMenuOpen(false)}>{dict.nav.agents}</a>
        <a href="#team" onClick={() => setMenuOpen(false)}>{dict.nav.team}</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>{dict.nav.faq}</a>
        <div className="lang-switcher">
          <a href={`/${otherLocale}`}>{dict.nav.langSwitch}</a>
          <span>/</span>
          <a href={`/${locale}`} className="active">{locale === 'en' ? 'EN' : 'ES'}</a>
        </div>
        <a href="#cta" className="nav-cta" onClick={() => setMenuOpen(false)}>{dict.nav.discovery}</a>
      </div>
    </nav>
  );
}