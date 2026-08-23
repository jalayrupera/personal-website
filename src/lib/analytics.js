/* Google Analytics 4.

   The measurement ID is public by design — it ships in the client bundle —
   but it lives here rather than inline in index.html so loading can be
   gated. Nothing is sent from a dev server, and the site behaves normally
   when no ID is configured, so analytics can never break the page. */

/* Paste the GA4 measurement ID here, e.g. 'G-ABC123XYZ'. Empty = disabled. */
export const MEASUREMENT_ID = 'G-3H29WHED7W';

const configured = /^G-[A-Z0-9]{4,}$/i.test(MEASUREMENT_ID);

/* Vite statically replaces import.meta.env.DEV, so the whole dev branch is
   dropped from the production bundle. */
const enabled = configured && !import.meta.env.DEV;

export function initAnalytics() {
  if (!enabled) return;
  if (window.gtag) return; // StrictMode runs effects twice in dev

  window.dataLayer = window.dataLayer || [];
  /* gtag forwards its raw `arguments`, so this cannot be an arrow function. */
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function track(event, params) {
  if (!enabled) return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}

/* One delegated listener rather than a handler on every anchor: components
   stay free of analytics wiring, and links added later are covered without
   anyone remembering to instrument them. */
export function trackLinkClicks() {
  if (!enabled) return () => {};

  const onClick = (event) => {
    const target = event.target;
    if (!target || typeof target.closest !== 'function') return;

    const link = target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href') || '';

    if (link.hasAttribute('download')) {
      track('resume_download', { file_name: href });
      return;
    }
    if (href.startsWith('mailto:')) {
      track('contact_click', { method: 'email' });
      return;
    }
    if (href.startsWith('tel:')) {
      track('contact_click', { method: 'phone' });
      return;
    }
    if (/^https?:/i.test(href)) {
      let domain = href;
      try {
        domain = new URL(href, window.location.href).hostname;
      } catch {
        /* keep the raw href if it will not parse */
      }
      track('outbound_click', { link_domain: domain, link_url: href });
    }
  };

  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
