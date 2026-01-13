export const metadata = {
  title: "Privacy Policy",
  description: "How Pine Hills Lawn Services handles your information.",
  openGraph: {
    title: "Privacy Policy",
    description: "How Pine Hills Lawn Services handles your information."
  }
};

export default function PrivacyPage() {
  return (
    <div className="section-shell space-y-6 py-16">
      <h1 className="font-display text-4xl text-soil-900">Privacy Policy</h1>
      <p className="text-base text-soil-700">
        Pine Hills Lawn Services collects only the information you provide when
        requesting an estimate or contacting our team. We use this information to
        respond to inquiries, schedule service, and deliver estimates.
      </p>
      <p className="text-base text-soil-700">
        We do not sell or share your information with third parties for marketing
        purposes. Information may be shared with service partners only as needed
        to fulfill your request.
      </p>
      <p className="text-base text-soil-700">
        If you would like to update or delete your information, contact us
        directly and we will assist you.
      </p>
    </div>
  );
}
