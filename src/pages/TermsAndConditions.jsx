
import React from "react";
import "./TermsAndConditions.css";

const sections = [
  {
    title: "1. About GoldSuree",
    paragraphs: [
      "GoldSuree is engaged in the purchase of old, used, unwanted and broken gold jewellery and other eligible gold items from customers, subject to applicable laws, verification requirements and our internal evaluation process.",
      "Our website provides information about GoldSuree, our services, gold evaluation process, customer requirements and other related information.",
    ],
  },
  {
    title: "2. Eligibility to Sell Gold",
    paragraphs: [
      "To sell gold to GoldSuree, the customer must:",
      "• Be legally entitled to sell the gold or gold items being presented.\n• Provide valid identification and other documents when required.\n• Provide accurate information during the transaction.\n• Cooperate with the required verification and documentation process.\n• Be legally competent to enter into the transaction.",
      "GoldSuree may refuse or postpone a transaction if the required verification or documentation is not satisfactory.",
    ],
  },
  {
    title: "3. Ownership and Right to Sell",
    paragraphs: [
      "The customer represents that the gold or other items presented for sale belong to the customer, or the customer has the lawful authority to sell them.",
      "GoldSuree does not knowingly purchase stolen, unlawfully obtained, disputed or illegally possessed property.",
      "If there is any doubt regarding ownership, authenticity, legality or the customer's authority to sell an item, GoldSuree may decline the transaction or request additional documentation.",
    ],
  },
  {
    title: "4. Gold Evaluation and Valuation",
    paragraphs: [
      "The value offered for gold is determined based on factors applicable to the particular transaction, which may include:",
      "• Weight of the item\n• Purity of the gold\n• Applicable gold rate\n• Nature and composition of the item\n• Non-gold components or materials\n• Applicable deductions, if any\n• Other transaction-specific factors",
      "The gold rate displayed on the website, if any, is for general information and may change based on market conditions.",
      "The final value offered to a customer is determined at the time of the transaction based on the applicable rate and evaluation of the customer's item.",
    ],
  },
  {
    title: "5. Purity Testing",
    paragraphs: [
      "Gold may be tested using professional testing methods and equipment, including XRF or other appropriate methods, depending on the item and circumstances.",
      "Testing results may vary depending on the composition, location tested, condition and construction of the item.",
      "GoldSuree reserves the right to conduct additional testing where necessary to determine the purity and composition of an item accurately.",
      "The final valuation will be based on GoldSuree's assessment of the item after completing the required evaluation and verification.",
    ],
  },
  {
    title: "6. Weight and Non-Gold Components",
    paragraphs: [
      "The gross weight of jewellery or other gold items may include non-gold components such as stones, beads, enamel, threads, lac, solder, fasteners or other materials.",
      "Where applicable, such non-gold components may be excluded or adjusted while determining the value of the gold content.",
      "The final payable value is based on the assessed eligible gold content and applicable transaction terms.",
    ],
  },
  {
    title: "7. Final Offer and Customer Consent",
    paragraphs: [
      "After evaluation, GoldSuree will communicate the applicable valuation or purchase offer to the customer.",
      "The customer is free to:\n• Accept the offer and proceed with the transaction, or\n• Decline the offer before completing the transaction.",
      "A customer is not required to sell an item merely because it has been evaluated by GoldSuree.",
      "Once the customer accepts the offer and the transaction is completed, the transaction may not be cancelled or reversed except where required by applicable law or where specifically agreed by GoldSuree.",
    ],
  },
  {
    title: "8. Payment",
    paragraphs: [
      "Payment will be made through the payment method offered by GoldSuree and subject to applicable laws, banking requirements and transaction limits.",
      "Customers should verify the payment details and transaction amount before completing the transaction.",
      "GoldSuree will maintain appropriate transaction records for completed purchases.",
    ],
  },
  {
    title: "9. Identification and Documentation",
    paragraphs: [
      "GoldSuree may request identification, address proof, ownership-related information, declarations or other documents depending on the transaction and applicable legal requirements.",
      "Customers must provide genuine and valid documents.",
      "GoldSuree may retain transaction and identification records for the period required under applicable law and internal record-keeping requirements.",
    ],
  },
  {
    title: "10. Refusal of Transactions",
    paragraphs: [
      "GoldSuree reserves the right to refuse or discontinue a transaction where:",
      "• The customer's identity cannot be satisfactorily verified.\n• Ownership or authority to sell is unclear.\n• The item appears suspicious, counterfeit, stolen or unlawfully obtained.\n• Required documentation is unavailable or inadequate.\n• The item cannot be satisfactorily evaluated.\n• The transaction may violate applicable law or regulatory requirements.\n• There is any other legitimate reason requiring the transaction to be declined.",
      "GoldSuree's decision to decline a transaction does not necessarily imply any wrongdoing by the customer.",
    ],
  },
  {
    title: "11. Website Information",
    paragraphs: [
      "GoldSuree makes reasonable efforts to keep the information on this website accurate and useful.",
      "However, information on the website may change from time to time, including gold rates, service information, business hours, offers or promotional information, content and descriptions, and contact information.",
      "Website information should not be treated as a guaranteed quotation or binding offer to purchase gold.",
    ],
  },
  {
    title: "12. Gold Rates and Online Calculations",
    paragraphs: [
      "Any gold rate, indicative price, calculator, estimate or example displayed on the website is provided for general informational purposes unless expressly stated otherwise.",
      "An online calculation or estimate does not constitute a final purchase offer.",
      "The final value of gold will be determined after physical inspection, weight and purity assessment and application of the relevant transaction terms.",
    ],
  },
  {
    title: "13. Third-Party Links",
    paragraphs: [
      "The GoldSuree website may contain links to third-party websites, platforms or services for convenience or informational purposes.",
      "GoldSuree does not control or guarantee the accuracy, availability, security or content of third-party websites.",
      "Customers should review the terms and privacy policies of such third-party websites before using them.",
    ],
  },
  {
    title: "14. Intellectual Property",
    paragraphs: [
      "All content on the GoldSuree website, including but not limited to:",
      "• GoldSuree name and logo\n• Text\n• Graphics\n• Images\n• Website design\n• Icons\n• Branding\n• Original content",
      "is owned by or licensed to GoldSuree unless otherwise stated.",
      "No content may be copied, reproduced, modified, distributed, published or commercially used without prior written permission from GoldSuree.",
    ],
  },
  {
    title: "15. Prohibited Use of the Website",
    paragraphs: [
      "Users must not use the GoldSuree website:",
      "• For any unlawful purpose.\n• To submit false or misleading information.\n• To attempt unauthorized access to the website or its systems.\n• To interfere with website functionality or security.\n• To reproduce or misuse GoldSuree's intellectual property.\n• To engage in fraudulent or abusive activities.",
    ],
  },
  {
    title: "16. Limitation of Liability",
    paragraphs: [
      "GoldSuree will make reasonable efforts to provide accurate information and professional services.",
      "However, to the extent permitted by applicable law, GoldSuree shall not be responsible for losses arising from reliance solely on general website information, indicative gold rates, online estimates, temporary website unavailability, third-party services or information beyond GoldSuree's reasonable control.",
      "Nothing in these Terms & Conditions is intended to exclude or limit any liability that cannot legally be excluded or limited under applicable law.",
    ],
  },
  {
    title: "17. Changes to These Terms",
    paragraphs: [
      "GoldSuree may update these Terms & Conditions from time to time to reflect changes in our services, business practices, technology or applicable legal requirements.",
      "The updated version will be published on this page with a revised Last Updated date.",
      "Continued use of the website or services after changes are published constitutes acceptance of the updated terms, to the extent permitted by law.",
    ],
  },
  {
    title: "18. Privacy",
    paragraphs: [
      "Information collected from customers through the website or during transactions may be handled in accordance with GoldSuree's Privacy Policy and applicable laws.",
      "For information about how personal information is collected, used and protected, please refer to our Privacy Policy.",
    ],
    link: { text: "Read our Privacy Policy", href: "/privacy-policy" },
  },
  {
    title: "19. Governing Law and Jurisdiction",
    paragraphs: [
      "These Terms & Conditions shall be governed by and interpreted in accordance with the laws applicable in India.",
      "Subject to applicable law, disputes arising in connection with GoldSuree's services or these Terms & Conditions shall be subject to the jurisdiction of the competent courts in Bengaluru, Karnataka.",
    ],
  },
  {
    title: "20. Contact GoldSuree",
    paragraphs: [
      "GoldSuree\n1st Floor, SVS Arcade, Ananth Nagar Road,\nElectronic City Phase 2, Bangalore – 560100\n\nPhone / WhatsApp: 8981298596\nEmail: contact@goldsuree.in\nWebsite: www.goldsuree.in",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <main className="legal-page">
      <header className="legal-hero">
        <span className="legal-eyebrow">GOLDSUREE · LEGAL</span>
        <h1>
          Terms & <span>Conditions.</span>
        </h1>
        <p>
          Please read these terms carefully before using
          our website or gold evaluation services.
        </p>
        <span className="legal-updated">
          Last Updated: October 2026
        </span>
      </header>

      <article className="legal-document">
        {sections.map((section, index) => (
          <section
            className="legal-section"
            id={`terms-${index + 1}`}
            key={section.title}
          >
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}
            {section.link && (
              <a className="legal-inline-link" href={section.link.href}>
                {section.link.text} ↗
              </a>
            )}
          </section>
        ))}

        <section className="legal-notice">
          <h2>Important Notice</h2>
          <p>
            The information provided on this website is intended for
            general informational purposes. GoldSuree's actual purchase
            of gold is subject to physical evaluation, purity assessment,
            applicable rates, customer verification, documentation and
            other transaction-specific requirements. These Terms should
            be read together with our Privacy Policy, Disclaimer and
            other applicable policies or transaction documents.
          </p>
        </section>
      </article>
    </main>
  );
}