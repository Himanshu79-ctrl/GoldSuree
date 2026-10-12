
import React from "react";
import "./PrivacyPolicy.css";

const sections = [
  {
    title: "1. Information We May Collect",
    paragraphs: [
      "Depending on how you interact with GoldSuree, we may collect different types of information.",
      "A. Information You Provide Directly",
      "This may include:\n• Name\n• Mobile number\n• Email address\n• Address or location details\n• Information provided through enquiry or contact forms\n• Information provided through WhatsApp, phone calls or other communication channels\n• Details relating to a gold-selling enquiry\n• Feedback, questions or other communications you send to us",
      "B. Information Collected During Gold Transactions",
      "When you visit GoldSuree to sell gold, we may collect information required to evaluate and complete the transaction. Depending on the nature and requirements of the transaction, this may include:\n• Customer identification information\n• Address or identity verification information\n• Transaction details\n• Details of the gold or other item presented for evaluation\n• Weight and purity assessment information\n• Valuation and purchase details\n• Payment-related transaction information\n• Declarations, acknowledgements or other documents associated with the transaction",
      "We collect such information only to the extent reasonably necessary for carrying out the transaction, maintaining records, meeting legal or regulatory requirements, preventing fraud and protecting our business and customers.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    paragraphs: [
      "GoldSuree may use collected information for purposes including:",
      "• Responding to enquiries\n• Contacting you regarding your enquiry or requested service\n• Providing information about our services\n• Evaluating and purchasing eligible gold items\n• Processing and documenting transactions\n• Verifying customer identity where required\n• Maintaining transaction records\n• Complying with applicable legal and regulatory requirements\n• Preventing fraud, misuse or unlawful transactions\n• Improving our website, services and customer experience\n• Managing customer communications\n• Addressing complaints, disputes or service-related issues\n• Sending service-related communications",
      "Where permitted by applicable law, we may also use contact information for relevant business communications or promotional purposes. You may request that we stop such promotional communications.",
    ],
  },
  {
    title: "3. Information Collected Automatically",
    paragraphs: [
      "When you visit the GoldSuree website, certain technical information may be collected automatically depending on the website's configuration and technologies used.",
      "This may include:\n• IP address\n• Browser type\n• Device type\n• Operating system\n• Pages visited\n• Approximate usage information\n• Date and time of visits\n• Referring website or source\n• Technical information relating to website performance",
      "This information may be used to understand website usage, improve website performance, maintain security and provide a better user experience.",
    ],
  },
  {
    title: "4. Cookies and Similar Technologies",
    paragraphs: [
      "The GoldSuree website may use cookies and similar technologies. Cookies are small files that may be stored on your device when you visit a website. They can help websites remember preferences, understand how visitors use the website and improve functionality.",
      "Cookies may be used for purposes such as:\n• Website functionality\n• Security\n• Analytics\n• Performance monitoring\n• Understanding website traffic\n• Improving user experience\n• Marketing or advertising, where applicable",
      "You may be able to control or disable cookies through your browser settings. Disabling certain cookies may affect some website functionality.",
    ],
  },
  {
    title: "5. Analytics and Third-Party Services",
    paragraphs: [
      "GoldSuree may use third-party services such as website analytics, hosting, communication, mapping, advertising or other technology services.",
      "These service providers may process certain information according to their own privacy policies and the services they provide to us.",
      "Where third-party tools are used, GoldSuree will take reasonable steps to use them appropriately and for legitimate business purposes.",
    ],
  },
  {
    title: "6. WhatsApp, Phone and Other Communication Channels",
    paragraphs: [
      "If you contact GoldSuree through WhatsApp, telephone, email, social media or another communication platform, information shared through that platform may be processed by both GoldSuree and the relevant service provider.",
      "The use of these third-party platforms is also subject to their respective terms and privacy policies.",
      "GoldSuree will use information received through these channels primarily to respond to enquiries, provide services, communicate with customers and manage transactions.",
    ],
  },
  {
    title: "7. Sharing of Information",
    paragraphs: [
      "GoldSuree does not intend to sell your personal information to third parties.",
      "We may share information where reasonably necessary with:\n• Service providers supporting our website or business operations\n• Technology, hosting or payment service providers\n• Professional advisers where necessary\n• Government authorities, law-enforcement agencies or regulators where required by law\n• Courts or other competent authorities where legally required\n• Other parties where disclosure is necessary to prevent fraud, unlawful activity or protect legal rights",
      "We will seek to limit information shared to what is reasonably necessary for the relevant purpose.",
    ],
  },
  {
    title: "8. Protection of Your Information",
    paragraphs: [
      "GoldSuree takes reasonable administrative, technical and organisational measures to protect personal information against unauthorized access, misuse, alteration, disclosure or loss.",
      "However, no website, electronic communication system or method of data storage can be guaranteed to be completely secure.",
      "Customers should also take reasonable precautions when sharing personal or sensitive information online.",
    ],
  },
  {
    title: "9. Retention of Information",
    paragraphs: [
      "GoldSuree may retain personal and transaction-related information for as long as reasonably necessary for the purposes described in this Privacy Policy.",
      "Certain records may need to be retained for longer periods to comply with applicable laws, regulatory requirements, accounting requirements, dispute resolution, fraud prevention or legitimate business purposes.",
      "When information is no longer reasonably required, it may be deleted, anonymised or securely disposed of, subject to applicable legal requirements.",
    ],
  },
  {
    title: "10. Your Choices and Rights",
    paragraphs: [
      "Depending on applicable law, you may have rights relating to your personal information, which may include:",
      "• Requesting access to certain personal information we hold about you\n• Requesting correction of inaccurate information\n• Requesting deletion of information where legally permissible\n• Withdrawing consent where processing is based on consent\n• Requesting information about how your personal information is being used\n• Opting out of certain promotional communications",
      "Some requests may be subject to legal, regulatory or legitimate business requirements.",
      "To make a privacy-related request, please contact us using the details provided below.",
    ],
  },
  {
    title: "11. Children's Privacy",
    paragraphs: [
      "The GoldSuree website and services are not intended to knowingly collect personal information from children in circumstances where such collection is prohibited by applicable law.",
      "If we become aware that personal information has been collected inappropriately from a child, we will take reasonable steps to address the situation.",
    ],
  },
  {
    title: "12. Links to Other Websites",
    paragraphs: [
      "The GoldSuree website may contain links to third-party websites or platforms.",
      "GoldSuree is not responsible for the privacy practices, content or security of those third-party websites.",
      "We recommend reviewing the privacy policy of any external website before providing personal information.",
    ],
  },
  {
    title: "13. Changes to This Privacy Policy",
    paragraphs: [
      "GoldSuree may update this Privacy Policy from time to time to reflect changes in our services, technology, business practices or applicable legal requirements.",
      "Any updated version will be published on this page with a revised Last Updated date.",
      "We encourage visitors and customers to review this page periodically.",
    ],
  },
  {
    title: "14. Contact Us",
    paragraphs: [
      "If you have questions, concerns or requests regarding this Privacy Policy or the handling of your personal information, please contact:",
      "GoldSuree\n1st Floor, SVS Arcade, Ananth Nagar Road,\nElectronic City Phase 2, Bangalore – 560100\n\nPhone / WhatsApp: 8981298596\nEmail: contact@goldsuree.in\nWebsite: www.goldsuree.in",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="legal-page">
      <header className="legal-hero">
        <span className="legal-eyebrow">GOLDSUREE · LEGAL</span>
        <h1>
          Privacy <span>Policy.</span>
        </h1>
        <p>
          Your privacy matters. Learn how GoldSuree collects,
          uses and protects your information.
        </p>
        <span className="legal-updated">
          Last Updated: October 2026
        </span>
      </header>

      <article className="legal-document">
        {sections.map((section, index) => (
          <section
            className="legal-section"
            id={`privacy-${index + 1}`}
            key={section.title}
          >
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className="legal-notice">
          <h2>Important Note</h2>
          <p>
            This Privacy Policy describes GoldSuree's general approach
            to handling personal information. The exact information
            collected and processed may vary depending on the services
            you use, the information you provide and applicable legal
            or regulatory requirements.
          </p>
          <p>
            GoldSuree may update its privacy practices as its website,
            technology, services and business operations develop.
          </p>
        </section>
      </article>
    </main>
  );
}