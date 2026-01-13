export type AnalyticsEvent = {
  name: string;
  props?: Record<string, string | number | boolean>;
};

export function logEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") {
    return;
  }

  const plausible = (window as { plausible?: (...args: unknown[]) => void }).plausible;
  if (plausible) {
    plausible(event.name, { props: event.props ?? {} });
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[Analytics]", event.name, event.props ?? {});
  }
}
