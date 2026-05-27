import { getDictionary, Locale } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AITransform from '@/components/AITransform';
import Agents from '@/components/Agents';
import Funnel from '@/components/Funnel';
import Flow from '@/components/Flow';
import Dashboard from '@/components/Dashboard';
import Kit from '@/components/Kit';
import Team from '@/components/Team';
import Timeline from '@/components/Timeline';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <Navbar dict={dict} locale={locale} />
      <Hero dict={dict} />
      <AITransform dict={dict} />
      <Agents dict={dict} />
      <Funnel dict={dict} />
      <Flow dict={dict} />
      <Dashboard dict={dict} />
      <Kit dict={dict} />
      <Team dict={dict} />
      <Timeline dict={dict} />
      <FAQ dict={dict} />
      <CTA dict={dict} locale={locale} />
      <Footer dict={dict} />
    </>
  );
}