import { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "Is FinanceAI free to use?",
    answer:
      "Yes. You can create an account and use the core financial planning features for free.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes. Your information is securely stored and only accessible by your account.",
  },
  {
    question: "Does the AI provide investment advice?",
    answer:
      "FinanceAI provides educational insights based on your data. It should not replace professional financial advice.",
  },
  {
    question: "Can I track multiple financial goals?",
    answer:
      "Yes. You can create and manage multiple savings and investment goals from your dashboard.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <h2 className="faq-title">Frequently Asked Questions</h2>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <div className="faq-item" key={item.question}>
              <button
                className="faq-question"
                onClick={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
              >
                <span>{item.question}</span>
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>

              {openIndex === index && (
                <div className="faq-answer">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}