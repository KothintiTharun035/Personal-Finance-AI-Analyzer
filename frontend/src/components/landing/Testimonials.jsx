import "./Testimonials.css";

const testimonials = [
  {
    name: "Akhila",
    role: "Data Analyst",
    review:
      "FinanceAI helped me understand my loan repayment strategy and save thousands in interest.",
  },
  {
    name: "Lohitha Reddy",
    role: "Product Manager",
    review:
      "The AI investment suggestions and goal planner make financial planning much easier.",
  },
  {
    name: "Varun Chandra",
    role: "Software Engineer",
    review:
      "A clean interface with practical financial insights. It feels like having a personal advisor.",
  },
  {
    name: "Tharun",
    role: "Business Analyst",
    review:
      "The expense tracking and AI-powered insights helped me manage my monthly budget more effectively.",
  },
  {
    name: "Bharath Krishna",
    role: "UI/UX Designer",
    review:
      "I love how FinanceAI simplifies complex financial decisions with personalized recommendations.",
  },
  {
    name: "Parichaya Reddy",
    role: "Marketing Executive",
    review:
      "From setting savings goals to monitoring investments, FinanceAI keeps all my finances organized in one place.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Users Say</h2>

        <p className="section-subtitle">
          People using FinanceAI to plan their financial future.
        </p>

        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="stars">★★★★★</div>

              <p className="review">"{item.review}"</p>

              <div className="testimonial-user">
                <div className="testimonial-avatar">
                  {item.name.charAt(0)}
                </div>

                <div className="testimonial-user-info">
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}