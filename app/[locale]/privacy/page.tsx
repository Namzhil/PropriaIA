import Link from 'next/link';
import { getDictionary, Locale } from '@/lib/i18n';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const isEn = locale === 'en';

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link href={`/${locale}`} className="legal-back">← {isEn ? 'Back to home' : 'Volver al inicio'}</Link>
        <h1>{isEn ? 'Privacy Policy' : 'Política de Privacidad'}</h1>
        <p className="legal-updated">{isEn ? 'Last updated: June 2, 2026' : 'Última actualización: 20 de junio de 2026'}</p>

        {isEn ? (
          <>
            <h2>1. Introduction</h2>
            <p>PropriaAI (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and AI-powered sales services.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect information that you provide directly, including:</p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Company name and job title</li>
              <li>Communication preferences and inquiry details</li>
              <li>Payment and billing information</li>
            </ul>
            <p>We also collect certain information automatically when you visit our website:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website or source</li>
              <li>Device and operating system information</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our Services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative notifications and service updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Detect and prevent fraud or unauthorized access</li>
            </ul>

            <h2>4. AI and Automated Processing</h2>
            <p>Our Services use artificial intelligence to process data for sales optimization. AI processing includes:</p>
            <ul>
              <li>Analyzing lead behavior and engagement patterns</li>
              <li>Automating customer communication via messaging platforms</li>
              <li>Optimizing advertising campaigns based on conversion data</li>
              <li>Generating content and creative assets</li>
            </ul>
            <p>AI-processed data is subject to the same protections as other personal data under this policy.</p>

            <h2>5. Data Sharing</h2>
            <p>We do not sell your personal information. We may share your data with:</p>
            <ul>
              <li>Service providers who assist in operating our Services (hosting, analytics, email delivery)</li>
              <li>Advertising platforms (Google, Meta) for campaign optimization, in anonymized or aggregated form</li>
              <li>Legal authorities when required by law or to protect our rights</li>
              <li>Successor entities in the event of a merger or acquisition</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>We retain your personal data for as long as necessary to provide the Services and fulfill the purposes described in this policy. Client data is retained for the duration of the service agreement and for a reasonable period afterward for legal and analytical purposes.</p>

            <h2>7. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Data portability — receive your data in a structured format</li>
              <li>Withdraw consent for marketing communications at any time</li>
            </ul>

            <h2>8. Security</h2>
            <p>We implement industry-standard security measures to protect your data, including encryption, access controls, and regular security audits. However, no method of transmission over the Internet is 100% secure.</p>

            <h2>9. Cookies and Tracking</h2>
            <p>Our website uses cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings. Essential cookies required for the website to function cannot be disabled.</p>

            <h2>10. International Data Transfers</h2>
            <p>Your data may be processed in countries outside your jurisdiction. We ensure appropriate safeguards are in place for international transfers, including standard contractual clauses where required.</p>

            <h2>11. Children&apos;s Privacy</h2>
            <p>Our Services are not directed to individuals under 18. We do not knowingly collect personal data from children. If you believe we have collected data from a child, please contact us immediately.</p>

            <h2>12. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Material changes will be notified via email or through a prominent notice on our website. We encourage you to review this policy periodically.</p>

            <h2>13. Contact Us</h2>
            <p>For questions about this Privacy Policy or to exercise your data rights, contact us at <a href="mailto:privacy@propria.ai">privacy@propria.ai</a>.</p>
          </>
        ) : (
          <>
            <h2>1. Introducción</h2>
            <p>PropriaAI (&quot;nosotros&quot; o &quot;nuestro&quot;) está comprometido con la protección de su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando utiliza nuestro sitio web y servicios de ventas con IA.</p>

            <h2>2. Información que Recopilamos</h2>
            <p>Podemos recopilar información que usted nos proporciona directamente, incluyendo:</p>
            <ul>
              <li>Nombre, dirección de correo electrónico y número de teléfono</li>
              <li>Nombre de la empresa y cargo</li>
              <li>Preferencias de comunicación y detalles de consultas</li>
              <li>Información de pago y facturación</li>
            </ul>
            <p>También recopilamos cierta información automáticamente cuando visita nuestro sitio web:</p>
            <ul>
              <li>Dirección IP y tipo de navegador</li>
              <li>Páginas visitadas y tiempo invertido en nuestro sitio</li>
              <li>Sitio web de referencia o fuente</li>
              <li>Información del dispositivo y sistema operativo</li>
            </ul>

            <h2>3. Cómo Usamos Su Información</h2>
            <p>Usamos la información recopilada para:</p>
            <ul>
              <li>Proporcionar, mantener y mejorar nuestros Servicios</li>
              <li>Procesar transacciones y enviar información relacionada</li>
              <li>Enviar notificaciones administrativas y actualizaciones de servicio</li>
              <li>Responder a sus consultas y brindar soporte al cliente</li>
              <li>Enviar comunicaciones de marketing (con su consentimiento)</li>
              <li>Analizar patrones de uso para mejorar la experiencia del usuario</li>
              <li>Detectar y prevenir fraude o acceso no autorizado</li>
            </ul>

            <h2>4. IA y Procesamiento Automatizado</h2>
            <p>Nuestros Servicios utilizan inteligencia artificial para procesar datos para la optimización de ventas. El procesamiento de IA incluye:</p>
            <ul>
              <li>Análisis de comportamiento de leads y patrones de engagement</li>
              <li>Automatización de comunicación con clientes a través de plataformas de mensajería</li>
              <li>Optimización de campañas publicitarias basada en datos de conversión</li>
              <li>Generación de contenido y activos creativos</li>
            </ul>
            <p>Los datos procesados por IA están sujetos a las mismas protecciones que otros datos personales bajo esta política.</p>

            <h2>5. Compartición de Datos</h2>
            <p>No vendemos su información personal. Podemos compartir sus datos con:</p>
            <ul>
              <li>Proveedores de servicios que nos asisten en la operación de nuestros Servicios (hosting, análisis, entrega de emails)</li>
              <li>Plataformas publicitarias (Google, Meta) para optimización de campañas, en forma anonimizada o agregada</li>
              <li>Autoridades legales cuando lo requiera la ley o para proteger nuestros derechos</li>
              <li>Entidades sucesoras en caso de fusión o adquisición</li>
            </ul>

            <h2>6. Retención de Datos</h2>
            <p>Retenemos sus datos personales durante el tiempo necesario para proporcionar los Servicios y cumplir con los fines descritos en esta política. Los datos de clientes se retienen durante la duración del contrato de servicio y por un período razonable después con fines legales y analíticos.</p>

            <h2>7. Sus Derechos</h2>
            <p>Dependiendo de su jurisdicción, usted puede tener derecho a:</p>
            <ul>
              <li>Acceder a los datos personales que tenemos sobre usted</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de sus datos personales</li>
              <li>Oponerse o restringir ciertas actividades de procesamiento</li>
              <li>Portabilidad de datos — recibir sus datos en un formato estructurado</li>
              <li>Retirar el consentimiento para comunicaciones de marketing en cualquier momento</li>
            </ul>

            <h2>8. Seguridad</h2>
            <p>Implementamos medidas de seguridad estándar de la industria para proteger sus datos, incluyendo cifrado, controles de acceso y auditorías de seguridad regulares. Sin embargo, ningún método de transmisión por Internet es 100% seguro.</p>

            <h2>9. Cookies y Rastreo</h2>
            <p>Nuestro sitio web utiliza cookies y tecnologías de rastreo similares para mejorar su experiencia. Puede controlar las preferencias de cookies a través de la configuración de su navegador. Las cookies esenciales que el sitio web necesita para funcionar no se pueden desactivar.</p>

            <h2>10. Transferencias Internacionales de Datos</h2>
            <p>Sus datos pueden ser procesados en países fuera de su jurisdicción. Nos aseguramos de que existan garantías adecuadas para las transferencias internacionales, incluyendo cláusulas contractuales estándar cuando sea necesario.</p>

            <h2>11. Privacidad de Menores</h2>
            <p>Nuestros Servicios no están dirigidos a personas menores de 18 años. No recopilamos intencionalmente datos personales de menores. Si cree que hemos recopilado datos de un menor, contáctenos inmediatamente.</p>

            <h2>12. Cambios en Esta Política</h2>
            <p>Podemos actualizar esta Política de Privacidad periódicamente. Los cambios materiales se notificarán por correo electrónico o mediante un aviso destacado en nuestro sitio web. Le recomendamos revisar esta política periódicamente.</p>

            <h2>13. Contáctenos</h2>
            <p>Para preguntas sobre esta Política de Privacidad o para ejercer sus derechos de datos, contáctenos en <a href="mailto:privacy@propria.ai">privacy@propria.ai</a>.</p>
          </>
        )}
      </div>
    </div>
  );
}
