import "./HowItWorks.css";

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    desc: "Sign up securely and access your personal finance dashboard.",
  },
  {
    step: "02",
    title: "Add Your Financial Data",
    desc: "Enter your loans, investments, savings, and financial goals.",
  },
  {
    step: "03",
    title: "AI Analyzes Everything",
    desc: "Our AI evaluates your finances and generates meaningful insights.",
  },
  {
    step: "04",
    title: "Make Better Decisions",
    desc: "Receive recommendations to improve savings, investments, and debt management.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how" id="how-it-works">
      <div className="container">
        <h2 className="how__heading">How It Works</h2>
        <p className="how__subheading">
          Four simple steps to manage your finances smarter.
        </p>

        <div className="how__grid">
          {steps.map((step) => (
            <div className="how__card" key={step.step}>
              <span className="how__number">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}