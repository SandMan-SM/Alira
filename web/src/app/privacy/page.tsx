import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ALIRA",
  description: "Privacy Policy for ALIRA.",
  alternates: { canonical: "https://alira.live/privacy" },
  robots: { index: true, follow: true },
};

const UPDATED = "July 7, 2026";
const SECTIONS: [string, string[]][] = [["Overview", ["ALIRA (“we,” “us,” or “our”) respects your privacy. This Privacy Policy explains what information we collect through our website, how we use it, and the choices you have. By using this site you agree to the practices described here."]], ["Not Professional Advice", ["Content and programs offered through this site are for general educational and informational purposes and are not a substitute for professional, medical, psychological, or financial advice. Please consult a qualified professional about your specific needs."]], ["Information We Collect", ["Information you provide: when you contact us, enroll, create an account, subscribe, or submit a form, we may collect your name, email address, phone number, and any details you choose to include.", "Information collected automatically: standard log and usage data such as device type, browser, pages viewed, and general location, gathered through cookies and similar technologies."]], ["How We Use Your Information", ["We use it to respond to inquiries, provide and improve our programs and services, process enrollments, communicate with you, keep the site secure, and comply with legal obligations."]], ["How Information Is Shared", ["We do not sell your personal information. We share it only with trusted service providers who help us operate, including analytics providers and our email delivery provider (Resend), and our payment processors (Stripe and/or PayPal). These providers process data on our behalf and are bound to protect it. We may also disclose information where required by law."]], ["Cookies", ["We use cookies and similar technologies to run the site, remember preferences, and understand usage. You can control cookies through your browser settings; disabling them may affect how the site works."]], ["Data Retention", ["We keep personal information only as long as needed for the purposes described here or as required by law, then delete or anonymize it."]], ["Your Choices and Rights", ["You may request access to, correction of, or deletion of your personal information, and you may opt out of marketing messages at any time. Depending on where you live, you may have additional rights under laws such as the GDPR or CCPA. To exercise any right, contact us below."]], ["Children’s Privacy", ["This site is not directed to children under 13, and we do not knowingly collect information from them."]], ["Security", ["We use reasonable safeguards to protect your information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security."]], ["Third-Party Links", ["Our site may link to third-party websites. We are not responsible for their privacy practices and encourage you to review their policies."]], ["Changes to This Policy", ["We may update this Privacy Policy from time to time. The date above reflects the latest version, and material changes will be posted on this page."]], ["Contact Us", ["If you have questions about this Privacy Policy or your information, contact ALIRA at hello@omnileadsagi.com, Utah, USA."]]];

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "72px 20px", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", lineHeight: 1.7, color: "inherit" }}>
      <h1 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 8px" }}>Privacy Policy</h1>
      <p style={{ opacity: 0.65, margin: "0 0 40px" }}>Last updated {UPDATED}</p>
      {SECTIONS.map(([heading, paras], i) => (
        <section key={i} style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 10px" }}>{heading}</h2>
          {paras.map((t, j) => (<p key={j} style={{ margin: "0 0 12px" }}>{t}</p>))}
        </section>
      ))}
    </main>
  );
}
