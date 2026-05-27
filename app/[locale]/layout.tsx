import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'PropriaAI — Sales & Marketing for Off-Plan Real Estate' : 'PropriaIA — Ventas y Marketing para Inmobiliaria Off-Plan',
    description: isEn
      ? 'Turnkey sales department for off-plan developers. Direct and channel sales. In 8 weeks we build team, playbook, sales stack and AI.'
      : 'Departamento de ventas llave en mano para promotores off-plan. Ventas directas y de canal. En 8 semanas construimos equipo, playbook, stack de ventas e IA.',
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <>{children}</>;
}