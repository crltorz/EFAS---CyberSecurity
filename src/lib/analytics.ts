export type AnalyticsEvent =
  | 'page_view'
  | 'athena_message'
  | 'athena_fallback'
  | 'athena_emergency'
  | 'factcheck_analyze'
  | 'quiz_complete';

export type AnalyticsPayload = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void;
    umami?: { track: (event: string, data?: AnalyticsPayload) => void };
  }
}

export function trackEvent(
  name: AnalyticsEvent,
  payload?: AnalyticsPayload
): void {
  if (import.meta.env.DEV && import.meta.env.VITE_ANALYTICS_DEBUG === 'true') {
    console.debug('[analytics]', name, payload);
  }

  window.dispatchEvent(
    new CustomEvent('efas-analytics', { detail: { name, payload } })
  );

  if (typeof window.plausible === 'function') {
    window.plausible(name, payload ? { props: payload } : undefined);
  }

  if (typeof window.umami?.track === 'function') {
    window.umami.track(name, payload);
  }
}
