import Script from "next/script";

export default function PlausibleScript() {
  const domain = process.env.PLAUSIBLE_DOMAIN;
  if (!domain) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  );
}
