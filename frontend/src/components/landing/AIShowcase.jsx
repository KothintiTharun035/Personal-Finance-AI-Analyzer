import "./AIShowcase.css";

export default function AIShowcase() {
  return (
    <section className="ai-showcase">
      <div className="container ai-showcase__container">
        <div className="ai-showcase__left">
          <span className="ai-badge">🤖 AI Powered</span>

          <h2>Your Personal AI Financial Advisor</h2>

          <p>
            Ask questions about your loans, investments, expenses, and savings.
            Get intelligent recommendations based on your financial data.
          </p>

          <ul className="ai-features">
            <li>✔ Loan payoff recommendations</li>
            <li>✔ Investment growth analysis</li>
            <li>✔ Budget optimization</li>
            <li>✔ Financial goal planning</li>
          </ul>
        </div>

        <div className="ai-chat">
          <div className="chat-header">
            FinanceAI Assistant
          </div>

          <div className="message user">
            How can I repay my loan faster?
          </div>

          <div className="message ai">
            Based on your current EMI, increasing your monthly payment by
            10% can reduce your loan tenure by approximately 14 months.
          </div>

          <div className="message user">
            Should I invest in SIP or FD?
          </div>

          <div className="message ai">
            Considering your long-term goal, SIP offers better potential
            returns while FD provides stable low-risk savings.
          </div>
        </div>
      </div>
    </section>
  );
}