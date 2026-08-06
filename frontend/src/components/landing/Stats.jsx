import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "./Stats.css";

const stats = [
  {
    end: 12,
    suffix: "+",
    prefix: "",
    label: "Active Users",
    format: "K",
  },
  {
    end: 250,
    suffix: "M+",
    prefix: "$",
    label: "Financial Plans Created",
  },
  {
    end: 98,
    suffix: "%",
    prefix: "",
    label: "Prediction Accuracy",
  },
  {
    end: 24,
    suffix: "/7",
    prefix: "",
    label: "AI Assistance",
  },
];

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="stats" ref={ref}>
      <div className="container stats-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <h2>
              {item.prefix}

              {item.end}

              {item.format === "K" ? "K" : ""}
              {item.suffix}
            </h2>

            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}