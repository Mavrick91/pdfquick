"use client";

type EventPayload = Record<string, unknown>;

export const useAnalytics = () => {
  const track = (event: string, payload?: EventPayload) => {
    if (typeof window !== "undefined") {
      // For now, just console log. Replace with your analytics provider
      console.log(`[Analytics] ${event}`, payload);

      // Example integrations:
      // Google Analytics
      // if (window.gtag) {
      //   window.gtag('event', event, payload);
      // }

      // Segment
      // if (window.analytics) {
      //   window.analytics.track(event, payload);
      // }

      // PostHog
      // if (window.posthog) {
      //   window.posthog.capture(event, payload);
      // }
    }
  };

  return { track };
};
