import Link from 'next/link';
import { getDictionary, Locale } from '@/lib/i18n';

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const isEn = locale === 'en';

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link href={`/${locale}`} className="legal-back">← {isEn ? 'Back to home' : 'Volver al inicio'}</Link>
        <h1>{isEn ? 'Terms of Service' : 'Términos de Servicio'}</h1>
        <p className="legal-updated">{isEn ? 'Last updated: June 2, 2026' : 'Última actualización: 20 de junio de 2026'}</p>

        {isEn ? (
          <>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using the services provided by PropriaAI (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), including our website, AI-powered sales tools, and related services (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Services.</p>

            <h2>2. Description of Services</h2>
            <p>PropriaAI provides AI-powered sales and marketing solutions for real estate developers, including but not limited to:</p>
            <ul>
              <li>AI agents for lead qualification and customer communication</li>
              <li>CRM integration and pipeline management</li>
              <li>Advertising campaign optimization</li>
              <li>Landing page and creative asset generation</li>
              <li>Sales analytics and reporting dashboards</li>
            </ul>

            <h2>3. Eligibility</h2>
            <p>The Services are intended for use by businesses and their authorized representatives. By using the Services, you represent that you have the legal authority to bind the entity you represent to these Terms.</p>

            <h2>4. Account Registration</h2>
            <p>You may be required to create an account to access certain features of the Services. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

            <h2>5. Use of AI Services</h2>
            <p>Our Services incorporate artificial intelligence technologies. You acknowledge that:</p>
            <ul>
              <li>AI-generated outputs may not always be accurate or complete</li>
              <li>Human oversight is recommended for critical business decisions</li>
              <li>AI agents operate within defined parameters and may escalate complex situations to human operators</li>
              <li>You are responsible for reviewing and approving AI-generated content before publication</li>
            </ul>

            <h2>6. Fees and Payment</h2>
            <p>Fees for the Services are as agreed upon in your service agreement. Late payments may incur interest charges. All fees are non-refundable unless otherwise specified in your service agreement.</p>

            <h2>7. Intellectual Property</h2>
            <p>All content, code, algorithms, and technology underlying the Services are the exclusive property of PropriaAI. Your use of the Services does not grant you any ownership rights in our intellectual property. Materials created for you during the engagement (landing pages, creatives, playbooks) become your property upon full payment.</p>

            <h2>8. Data Processing</h2>
            <p>We process personal data in accordance with our Privacy Policy and applicable data protection laws. As a data processor, we process personal data on your behalf and under your instructions.</p>

            <h2>9. Confidentiality</h2>
            <p>Both parties agree to maintain the confidentiality of proprietary information shared during the course of the engagement. This includes business strategies, customer data, pricing, and technical implementations.</p>

            <h2>10. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, PropriaAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of the Services.</p>

            <h2>11. Indemnification</h2>
            <p>You agree to indemnify and hold harmless PropriaAI from any claims, losses, or damages arising from your use of the Services or violation of these Terms.</p>

            <h2>12. Termination</h2>
            <p>Either party may terminate the service agreement in accordance with its terms. Upon termination, your right to use the Services ceases immediately. Provisions that by their nature should survive termination will remain in effect.</p>

            <h2>13. Governing Law</h2>
            <p>These Terms are governed by the laws of the jurisdiction in which PropriaAI operates. Any disputes shall be resolved through binding arbitration or in the courts of competent jurisdiction.</p>

            <h2>14. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Material changes will be communicated via email or through the Services. Continued use of the Services after changes constitutes acceptance of the modified Terms.</p>

            <h2>15. Contact</h2>
            <p>For questions about these Terms, contact us at <a href="mailto:legal@propria.ai">legal@propria.ai</a>.</p>
          </>
        ) : (
          <>
            <h2>1. Aceptación de los Términos</h2>
            <p>Al acceder o utilizar los servicios proporcionados por PropriaAI (&quot;Empresa&quot;, &quot;nosotros&quot; o &quot;nuestro&quot;), incluyendo nuestro sitio web, herramientas de ventas con IA y servicios relacionados (colectivamente, los &quot;Servicios&quot;), usted acepta estar vinculado por estos Términos de Servicio (&quot;Términos&quot;). Si no está de acuerdo con estos Términos, no utilice los Servicios.</p>

            <h2>2. Descripción de los Servicios</h2>
            <p>PropriaAI proporciona soluciones de ventas y marketing con IA para desarrolladores inmobiliarios, incluyendo pero no limitado a:</p>
            <ul>
              <li>Agentes de IA para calificación de leads y comunicación con clientes</li>
              <li>Integración de CRM y gestión de pipeline</li>
              <li>Optimización de campañas publicitarias</li>
              <li>Generación de landing pages y activos creativos</li>
              <li>Paneles de análisis de ventas e informes</li>
            </ul>

            <h2>3. Elegibilidad</h2>
            <p>Los Servicios están destinados a empresas y sus representantes autorizados. Al usar los Servicios, usted declara que tiene la autoridad legal para vincular a la entidad que representa con estos Términos.</p>

            <h2>4. Registro de Cuenta</h2>
            <p>Se le puede requerir crear una cuenta para acceder a ciertas funciones de los Servicios. Usted es responsable de mantener la confidencialidad de sus credenciales de cuenta y de todas las actividades que ocurran bajo su cuenta.</p>

            <h2>5. Uso de Servicios de IA</h2>
            <p>Nuestros Servicios incorporan tecnologías de inteligencia artificial. Usted reconoce que:</p>
            <ul>
              <li>Los resultados generados por IA pueden no ser siempre precisos o completos</li>
              <li>Se recomienda supervisión humana para decisiones comerciales críticas</li>
              <li>Los agentes de IA operan dentro de parámetros definidos y pueden escalar situaciones complejas a operadores humanos</li>
              <li>Usted es responsable de revisar y aprobar el contenido generado por IA antes de su publicación</li>
            </ul>

            <h2>6. Tarifas y Pago</h2>
            <p>Las tarifas por los Servicios son las acordadas en su contrato de servicio. Los pagos tardíos pueden generar cargos por intereses. Todas las tarifas no son reembolsables a menos que se especifique lo contrario en su contrato de servicio.</p>

            <h2>7. Propiedad Intelectual</h2>
            <p>Todo el contenido, código, algoritmos y tecnología subyacente a los Servicios son propiedad exclusiva de PropriaAI. Su uso de los Servicios no le otorga derechos de propiedad sobre nuestra propiedad intelectual. Los materiales creados para usted durante la relación comercial (landing pages, creativos, playbooks) pasan a ser su propiedad tras el pago completo.</p>

            <h2>8. Procesamiento de Datos</h2>
            <p>Procesamos datos personales de conformidad con nuestra Política de Privacidad y las leyes de protección de datos aplicables. Como procesador de datos, procesamos datos personales en su nombre y bajo sus instrucciones.</p>

            <h2>9. Confidencialidad</h2>
            <p>Ambas partes acuerdan mantener la confidencialidad de la información propietaria compartida durante el curso de la relación comercial. Esto incluye estrategias de negocio, datos de clientes, precios e implementaciones técnicas.</p>

            <h2>10. Limitación de Responsabilidad</h2>
            <p>En la máxima medida permitida por la ley, PropriaAI no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pero no limitado a pérdida de ganancias, datos u oportunidades de negocio, que surjan del uso de los Servicios.</p>

            <h2>11. Indemnización</h2>
            <p>Usted acepta indemnizar y mantener indemne a PropriaAI de cualquier reclamación, pérdida o daño que surja de su uso de los Servicios o violación de estos Términos.</p>

            <h2>12. Terminación</h2>
            <p>Cualquiera de las partes puede terminar el contrato de servicio de acuerdo con sus términos. Tras la terminación, su derecho a usar los Servicios cesa inmediatamente. Las disposiciones que por su naturaleza deban sobrevivir a la terminación permanecerán en vigor.</p>

            <h2>13. Ley Aplicable</h2>
            <p>Estos Términos se rigen por las leyes de la jurisdicción en la que opera PropriaAI. Cualquier disputa se resolverá mediante arbitraje vinculante o en los tribunales de jurisdicción competente.</p>

            <h2>14. Cambios en los Términos</h2>
            <p>Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios materiales se comunicarán por correo electrónico o a través de los Servicios. El uso continuado de los Servicios después de los cambios constituye la aceptación de los Términos modificados.</p>

            <h2>15. Contacto</h2>
            <p>Para preguntas sobre estos Términos, contáctenos en <a href="mailto:legal@propria.ai">legal@propria.ai</a>.</p>
          </>
        )}
      </div>
    </div>
  );
}
