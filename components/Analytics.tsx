import Script from 'next/script';

/**
 * Google Analytics 4.
 *
 * Si `NEXT_PUBLIC_GA_ID` no está definida, el componente no renderiza nada:
 * en desarrollo y en previews no se envía tráfico basura a la propiedad.
 *
 * `afterInteractive` deja que la página pinte antes de cargar gtag, así el
 * script no compite con el LCP.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
