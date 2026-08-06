import { motion } from "framer-motion";

const points = [
  { x: 20, y: 120 },
  { x: 90, y: 105 },
  { x: 160, y: 112 },
  { x: 230, y: 75 },
  { x: 300, y: 88 },
  { x: 370, y: 45 },
];

const path = points
  .map((point, index) =>
    `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
  )
  .join(" ");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const LineChart = () => {
  return (
    <div className="line-chart">

      <div className="chart-header">
        <div>
          <h4>Portfolio Growth</h4>
          <span>Last 6 Months</span>
        </div>

        <div className="growth-chip">
          +18.6%
        </div>
      </div>

      <svg
        className="chart-svg"
        viewBox="0 0 390 150"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="lineGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          <linearGradient
            id="fillGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#2563eb"
              stopOpacity="0.25"
            />
            <stop
              offset="100%"
              stopColor="#2563eb"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <motion.path
          d={`${path} L 370 140 L 20 140 Z`}
          fill="url(#fillGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.path
          d={path}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6 }}
        />

        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#2563eb"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: index * 0.15,
            }}
          />
        ))}
      </svg>

      <div className="chart-labels">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
};

export default LineChart;