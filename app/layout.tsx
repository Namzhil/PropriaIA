import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PropriaAI — Sales & Marketing for Off-Plan Real Estate',
  description: 'Turnkey sales department for off-plan developers. Direct and channel sales. In 8 weeks we build team, playbook, sales stack and AI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var observer = new IntersectionObserver(function(entries) {
              entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                }
              });
            }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
            document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
          })();
        ` }} />
      </body>
    </html>
  );
}