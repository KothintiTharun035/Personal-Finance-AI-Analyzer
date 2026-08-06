import "./TrustedCompanies.css";

const companies = [
  "Google",
  "Microsoft",
  "OpenAI",
  "Visa",
  "Stripe",
  "PayPal",
];

export default function TrustedCompanies() {
  return (
    <section className="trusted">
      <div className="container">
        <p className="trusted__title">
          Trusted technologies powering modern finance
        </p>

        <div className="trusted__logos">
          {companies.map((company) => (
            <div key={company} className="trusted__logo">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}